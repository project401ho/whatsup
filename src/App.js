
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
      mode: "list",
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
      initiated: false
    }
    console.log("constructo done");
  }

  //lifecycle hook
  componentDidMount(){
    this.fetchContentLists()    
    this.AssessLoggedInState()
    console.log("Mount done");
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
<<<<<<< HEAD
  async fetchContentLists(current_page){
    console.time("fetch")
    const apiData = await API.graphql({
=======
    async fetchContentLists(){
    console.time("fetch")
    if(this.state.postList.length !== 0){
      const apiData = await API.graphql({
>>>>>>> parent of 9bb4a32 (7.06)
        query: postsByDate, 
        variables:{
          limit: 50, 
          type: "post",
          sortDirection: "DESC",
          nextToken: this.state.nexttoken_ContenList[this.state.nexttoken_ContenList.length-1],
        },       
        authMode: 'AWS_IAM',            
      })
<<<<<<< HEAD
=======
      console.timeEnd("fetch")
      console.time("fetch")
>>>>>>> parent of 9bb4a32 (7.06)
      if(apiData.data.postsByDate.items.length < 1) return
      const postFromAPI = apiData.data.postsByDate.items;
      let newtokenlist = [...this.state.nexttoken_ContenList].concat(apiData.data.postsByDate.nextToken)
      let pagecount = Math.ceil(postFromAPI.length/10)
      let _subpostlist = postFromAPI.slice(this.state.current_page-1,this.state.current_page*10)
      this.setState({ 
        sub_postList:_subpostlist, 
        postList:postFromAPI, 
        nexttoken_ContenList:newtokenlist, 
        required_page_count:pagecount,
        total_post_count:postFromAPI[0].count,
      })
<<<<<<< HEAD

      this.changePage(current_page)
    console.timeEnd("fetch")
  }
  async fetchInitialContentsList(){
    console.time("fetch")
    const apiData_announcement = await API.graphql({
      query:getPost,
      variables:{
        id:"announcement"
      },
      authMode: "AWS_IAM"
    })
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
      initiated:true,
    })

    this.changePage(this.state.current_page)
=======
    }
    else{
      const apiData_announcement = await API.graphql({
        query:getPost,
        variables:{
          id:"announcement"
        },
        authMode: "AWS_IAM"
      })
      console.timeEnd("fetch")
      console.time("fetch")
      const apiData = await API.graphql({
        query: postsByDate, 
        variables:{
          limit: 49, 
          type: "post",
          sortDirection: "DESC",
          nextToken: this.state.nexttoken_ContenList[this.state.nexttoken_ContenList.length-1],
        },       
        authMode: 'AWS_IAM',            
      })
      console.timeEnd("fetch")
      console.time("fetch")
      if(apiData.data.postsByDate.items.length < 1) return
      const postFromAPI = apiData.data.postsByDate.items;
      const announcementFromAPI = apiData_announcement.data.getPost
      postFromAPI.unshift(announcementFromAPI)     
      let newtokenlist = [...this.state.nexttoken_ContenList].concat(apiData.data.postsByDate.nextToken)
      let pagecount = Math.ceil(postFromAPI.length/10)
      let _subpostlist = postFromAPI.slice(this.state.current_page-1,this.state.current_page*10)
      this.setState({ 
        sub_postList:_subpostlist, 
        postList:postFromAPI, 
        nexttoken_ContenList:newtokenlist, 
        required_page_count:pagecount,
        total_post_count:postFromAPI[1].count+1,
      })
    }
>>>>>>> parent of 9bb4a32 (7.06)
    console.timeEnd("fetch")
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
    // window.location.reload()
  }

  selectContent(){    
    let content
    if(this.state.mode === "list"){
      content = <ContentsList
          total_post_count = {this.state.total_post_count}
          next_page_count = {this.state.next_page_count}
          current_page = {this.state.current_page}
          postlist = {this.state.sub_postList}
          moveToPost = {(item)=>{
            this.setState({selected_post:item})
          }}
        ></ContentsList>
    }
    else if(this.state.mode === "create"){
      content = <CreatePost
        updatePost = {(item)=>this.updatePost(item)}
        createResource = {(formData)=>this.createResource(formData)} 
        imageUpload={(e)=>this.imageUpload(e)} 
        createPost={(formData)=>this.createPost(formData)} 
        total_post_count={this.state.total_post_count}
      ></CreatePost>
    }
    
    return content
  }
<<<<<<< HEAD
  
=======

>>>>>>> parent of 9bb4a32 (7.06)
  changePage(page){
    let pressed_page = Number(page)
    let temp = [...this.state.postList]
    if(temp.length > pressed_page * 10){
      temp = temp.slice((pressed_page-1)*10, pressed_page * 10)
    }
    else{
      temp = temp.slice((pressed_page-1)*10,temp.length)
    }
    this.setState({current_page:pressed_page, sub_postList: temp})
  }
  nextPageCountHandler(num){
    let temp = this.state.next_page_count+num
    this.setState({next_page_count:temp})
  }
<<<<<<< HEAD
  updatePost(item){
    await API.graphql({
      query:updatePostMutation, 
      variables:{id: item.id},
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
=======
  changeMode(_mode){
    this.setState({mode:_mode})
>>>>>>> parent of 9bb4a32 (7.06)
  }
  

  render(){
    
    return (
      <Router>
        <div className="App">
          <Navigation changemode={(_mode)=>this.changeMode(_mode)} user={this.state.user} loggedin={this.state.loggedin} home={()=>this.setState({mode:"list"})}></Navigation>
          <Switch>
            <Route exact path='/'>
              {this.selectContent()}
              <Pages 
                nexttoken_ContenList ={this.state.nexttoken_ContenList}
                next_page_count= {this.state.next_page_count} 
                required_page_count={this.state.required_page_count} 
                current_page={this.state.current_page} 
                changePage={(page)=>this.changePage(page)}
                nextPageCountHandler={(num)=>this.nextPageCountHandler()}
              >            
              </Pages>
            </Route>
            <Route path="/page/*">
              {this.selectContent()}
              <Pages 
                nexttoken_ContenList ={this.state.nexttoken_ContenList}
                next_page_count= {this.state.next_page_count} 
                required_page_count={this.state.required_page_count} 
                current_page={this.state.current_page} 
                changePage={(page)=>this.changePage(page)}
                nextPageCountHandler={(num)=>this.nextPageCountHandler()}
              >            
              </Pages>
            </Route>
            <Route path='/post/*'>
              <Post 
                total_post_count = {this.state.total_post_count}
                next_page_count = {this.state.next_page_count}
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
              <Pages 
                nexttoken_ContenList ={this.state.nexttoken_ContenList}
                next_page_count= {this.state.next_page_count} 
                required_page_count={this.state.required_page_count} 
                current_page={this.state.current_page} 
                changePage={(page)=>this.changePage(page)}
                nextPageCountHandler={(num)=>this.nextPageCountHandler()}
              >            
              </Pages>
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
