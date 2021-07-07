
import './App.css';
import React,{Component} from 'react';
import Navigation from './components/Navigation'
import CreatePost from './components/CreatePost'
import ContentsList from './components/ContentsList'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import MyPage from './components/MyPage'
import Pages from './components/Pages'
import Post from './components/Post'
import { API, Auth, Storage} from 'aws-amplify'
import {
  getPost, 
  // getComment, 
  postsByDate
} from './graphql/queries'
import {
  createPost as createPostMutation, 
  // createComment as createCommentMutation, 
  createResource as createResourceMutation,
  updatePost as updatePostMutation,
} from './graphql/mutations'
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom';
// import {Button} from "@material-ui/core";



class App extends Component {
  
  constructor(props){
    
    super(props)
    this.state = {
      postList: [],
      sub_postList: [],
      selected_post : null,
      current_page : 1,
      next_page_count : 0,
      content: "",
      loggedin: false,
      user : {},
      nexttoken_ContenList : [],
      required_page_count : 0,
      total_post_count: 0,
    }
    
  }

  //lifecycle hook
  componentDidMount(){
    this.fetchInitialContentsList()    
    this.AssessLoggedInState()
  }
  //log in & out
  AssessLoggedInState(){
    Auth.currentAuthenticatedUser()
      .then((e) => {        
        this.onSignIn(e)        
      })
      .catch(()=>{
        this.setState({loggedin: false})
      })
  }
  onSignIn(user){
    this.setState({loggedin:true, user:user})
  }
  async signOut(){
    try {
      await Auth.signOut()
      this.setState({loggedin: false, user:{}})
    } catch(error){
    }
  }
  //log in & out FINISH!

  async createResource(formData){
    await API.graphql({
      query:createResourceMutation,
      variables:{input:formData},
      authMode: 'AWS_IAM',
    })
  }
    async fetchContentLists(current_page){
    // console.time("fetch")
    const apiData = await API.graphql({
        query: postsByDate, 
        variables:{
          limit: 50, 
          type: "post",
          sortDirection: "DESC",
          nextToken: this.state.nexttoken_ContenList[this.state.nexttoken_ContenList.length-1],
        },       
        authMode: 'AWS_IAM',            
      })
      // console.log(apiData);
      // console.timeEnd("fetch")
      // console.time("fetch")
      if(apiData.data.postsByDate.items.length < 1) return
      const postFromAPI = apiData.data.postsByDate.items;
      let newtokenlist = [...this.state.nexttoken_ContenList].concat(apiData.data.postsByDate.nextToken)
      let pagecount = Math.ceil(postFromAPI.length/10)
      
      this.setState({ 
        postList:postFromAPI, 
        nexttoken_ContenList:newtokenlist, 
        required_page_count:pagecount,
        total_post_count:postFromAPI[0].count,
      })

      this.changePage(current_page)
    
    // console.timeEnd("fetch")
  }
  async fetchInitialContentsList(){
    const apiData_announcement = await API.graphql({
        query:getPost,
        variables:{
          id:"announcement"
        },
        authMode: "AWS_IAM"
      })
      // console.timeEnd("fetch")
      // console.time("fetch")
      const apiData = await API.graphql({
        query: postsByDate, 
        variables:{
          limit: 49, 
          type: "post",
          sortDirection: "DESC",
          nextToken: null,
        },       
        authMode: 'AWS_IAM',            
      })
      // console.timeEnd("fetch")
      // console.time("fetch")
      if(apiData.data.postsByDate.items.length < 1) return
      const postFromAPI = apiData.data.postsByDate.items;
      const announcementFromAPI = apiData_announcement.data.getPost
      postFromAPI.unshift(announcementFromAPI)     
      let newtokenlist = [...this.state.nexttoken_ContenList].concat(apiData.data.postsByDate.nextToken)
      let pagecount = Math.ceil(postFromAPI.length/10)
      
      this.setState({ 
        postList:postFromAPI, 
        nexttoken_ContenList:newtokenlist, 
        required_page_count:pagecount,
        total_post_count:postFromAPI[1].count+1,
        next_page_count:0,
      })

      this.changePage(1)
  }



  async imageUpload(_file){
    await Storage.put(_file.name, _file)
  }

  async createPost(formData){
    if(!formData.title || !formData.id || !formData.content) return
    await API.graphql({
      query:createPostMutation, 
      variables:{input: formData},
      authMode: 'AWS_IAM'
    })    
    let _total_post_count = this.state.total_post_count+1
    this.setState({total_post_count:_total_post_count})
    // setTimeout(8500)
    window.location.reload()
  }

  
  changePage(page){
    let temp_page = Number(page)%5
    if(temp_page === 0) temp_page = 5
    let temp = [...this.state.postList]
    if(temp.length > temp_page * 10){
      temp = temp.slice((temp_page-1)*10, temp_page * 10)
    }
    else{
      temp = temp.slice((temp_page-1)*10,temp.length)
    }
    this.setState({current_page:Number(page), sub_postList: temp})
  }
  nextPageCountHandler(num){
    let temp = this.state.next_page_count + Number(num)
    this.setState({next_page_count:temp,current_page:(temp*5)+1})
  }
  async updatePost(item){
    await API.graphql({
      query:updatePostMutation, 
      variables:{input: item},
      authMode: 'AWS_IAM'
    })   
    console.log("updated");
  }
  loadPages(){
    return (
      <Pages 
        nexttoken_ContenList ={this.state.nexttoken_ContenList}
        next_page_count= {this.state.next_page_count} 
        required_page_count={this.state.required_page_count} 
        current_page={this.state.current_page} 
        changePage={(page)=>this.changePage(page)}
        nextPageCountHandler={(num)=>this.nextPageCountHandler(num)}
        fetchContentLists = {(page)=>this.fetchContentLists(page)}   
      >            
      </Pages>
    )
  }
  loadContentList(){
    return (
      <ContentsList
        total_post_count = {this.state.total_post_count}
        current_page = {this.state.current_page}
        postlist = {this.state.sub_postList}
        moveToPost = {(item)=>{
          this.setState({selected_post:item})
        }}
      ></ContentsList>
    )
  }
  loadCreatePost(){
    return(
      <CreatePost
        updatePost = {(item)=>this.updatePost(item)}
        createResource = {(formData)=>this.createResource(formData)} 
        imageUpload={(e)=>this.imageUpload(e)} 
        createPost={(formData)=>this.createPost(formData)} 
        total_post_count={this.state.total_post_count}
      ></CreatePost>
    )
  }
  render(){
    
    return (
      <Router>
        <div className="App">
          <Navigation fetchInitialContentsList={(e)=>this.fetchInitialContentsList()} user={this.state.user} loggedin={this.state.loggedin} ></Navigation>
          <Switch>
            <Route exact path='/'>
              {this.loadContentList()}
              {this.loadPages()}
            </Route>
            <Route path="/page">
              {this.loadContentList()}
              {this.loadPages()}

            </Route>
            <Route path="/create_post">
              {this.loadCreatePost()}
            </Route>
            <Route path='/post/*'>              
              <Post 
                total_post_count = {this.state.total_post_count}
                current_page = {this.state.current_page}
                postlist = {this.state.sub_postList}
                moveToPost = {(item)=>{
                  this.setState({selected_post:item})
                  
                }}

                user = {this.state.user}
                sub_postList = {this.state.sub_postList}
                loggedin={this.state.loggedin} 
                post={this.state.selected_post} 
                
              >
              </Post>
              {this.loadContentList()}
              {this.loadPages()}
            </Route>
            <Route path="/signin">
              <SignIn onSignIn={(user)=>this.onSignIn(user)}></SignIn>
            </Route>
            <Route path="/signup">
              <SignUp onSignIn={(user)=>this.onSignIn(user)}></SignUp>
            </Route>
            <Route path="/mypage">
              <MyPage onSignOut={()=>this.signOut()} user = {this.state.user}></MyPage>
            </Route>
          </Switch>
          
        </div>
      </Router>
    );
  }
}

export default App;
