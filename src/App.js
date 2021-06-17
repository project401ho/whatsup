
import './App.css';
import React,{Component} from 'react';
import Navigation from './components/Navigation'
import Announcement from './components/Announcement'
import CreatePost from './components/CreatePost'
import ContentsList from './components/ContentsList'
import SignIn from './components/SignIn'
import MyPage from './components/MyPage'
import Pages from './components/Pages'
import Post from './components/Post'
import { API, Auth, Storage} from 'aws-amplify'
import {listPosts, listComments, getPost,getComment, postsByDate} from './graphql/queries'
import {createPost as createPostMutation, createComment as createCommentMutation} from './graphql/mutations'
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import {Button} from "@material-ui/core";



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      mode: "list",
      postList: [],
      sub_postList: [],
      selected_post : {},
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
    this.fetchContentLists()    
    this.AssessLoggedInState()
  }

  //log in & out
  AssessLoggedInState(){
    Auth.currentAuthenticatedUser()
      .then((e) => {        
        // console.log("WHATHTHATHATH");
        this.setState({loggedin: true, user:e})
        // console.log(this.state.user);
      })
      .catch(()=>{
        // console.log("WHT");
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
      // console.log("error signing out", error);  
    }
  }
  //log in & out FINISH!


  async createComment(formData){

    //폼 체크
    if(!formData.nickname || !formData.content ) return
    if(!this.state.loggedin){
      alert("로그인을 해주세요")
      return
    }
    
    //중복 체크
    let check = await API.graphql({
      query: getComment, 
      variables:{id:formData.id},
      authMode: 'AWS_IAM',
    })
    if(check.data.getComment){
      let checkComment = null
      do{
        let temp = formData.id.split("_").map((w)=>+w)
        temp[1] += 1
        temp = temp[0].toString()+"_"+temp[1].toString()         
        formData.id = temp
        checkComment = await API.graphql({
          query: getComment, 
          variables:{id:formData.id},
          authMode: 'AWS_IAM',
        })

      }while(checkComment.data.getComment)
    }

    //코멘트 등록
    await API.graphql({
      query: createCommentMutation,
      variables:{input:formData},
      authMode: 'AWS_IAM',
    })
    let _id = this.state.selected_post.id
    let temp = await API.graphql({
      query: getPost, 
      variables:{id:_id},
      authMode: 'AWS_IAM',
    })
    this.setState({selected_post:temp.data.getPost})
  }


  async fetchComments(){

    const apiData = await API.graphql({
      query: listComments,
      authMode: 'AWS_IAM'
    })
    const commentsFromAPI = apiData.data.listComments.items   
  

    this.setState({commentsLists:commentsFromAPI})
  }

  async photoHandler(e){
    const file = e.target.files[0]
    await Storage.put(file.name, file)
  }

  async fetchContentLists(){
    
    console.log("fetch list start")
    // console.log("b4",this.state.nexttoken_ContenList);
    // const apiData = await API.graphql({
    //   query: listPosts, 
    //   variables:{limit: 5, nextToken: this.state.nexttoken_ContenList},
    //   authMode: 'AWS_IAM',
            
    // })
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
    // console.log("fetch done");
    // console.log(apiData);
    const postFromAPI = apiData.data.postsByDate.items;
    let newtokenlist = [...this.state.nexttoken_ContenList].concat(apiData.data.postsByDate.nextToken)
    // console.log(postFromAPI.length);
    let pagecount = Math.ceil(postFromAPI.length/10)
    // let temp = []
    // let _postList = []
    // while(postFromAPI.length > 0){
    //   if(temp.length < 10){
    //     temp.push(postFromAPI.pop())
    //   }
    //   else{
    //     _postList.push(temp)
    //   }
    // }
    let _subpostlist = postFromAPI.slice(this.state.current_page-1,this.state.current_page*10)
    this.setState({ 
      sub_postList:_subpostlist, 
      postList:postFromAPI, 
      nexttoken_ContenList:newtokenlist, 
      required_page_count:pagecount,
      total_post_count:postFromAPI[0].count,
    })  
    // console.log(this.state.nexttoken_ContenList);

  }
  
  async createPost(formData){
    // console.log("start create post");
    if(!formData.title || !formData.id || !formData.content) return
    // console.log("PAssed");
    await API.graphql({
      query:createPostMutation, 
      variables:{input: formData},
      authMode: 'AWS_IAM'
    })
    if(formData.image){
      const image = await Storage.get(formData.image)
      formData.image = image
    }
    // console.log(formData);
    let temp = await API.graphql({
      query:getPost, 
      variables:{id:formData.id},
      authMode: 'AWS_IAM',
    })
    // console.log(temp);
    let list = [...this.state.postList].concat(temp.data.getPost)
    let _total_post_count = this.state.total_post_count+1
    this.setState({postList: list, total_post_count:_total_post_count})
    window.location.reload()
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
            this.setState({selected_post:item, mode:"post"})
          }}
        ></ContentsList>
    }
    else if(this.state.mode === "create"){
      content = <CreatePost 
        photoHandler={(e)=>this.photoHandler(e)} 
        createPost={(formData)=>this.createPost(formData)} 
        total_post_count={this.state.total_post_count}
      ></CreatePost>
    }
    else if(this.state.mode ==="post"){
      if(this.state.selected_post){
        content = <Post loggedin={this.state.loggedin} fetchComments={(_postID)=>this.fetchComments(_postID)} post={this.state.selected_post} createComment={(dataForm)=>this.createComment(dataForm)}></Post>        
      }
      else{
        this.setState({mode:"list"})
      }
    }
    return content
  }

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
  changeMode(_mode){
    this.setState({mode:_mode})
  }
  render(){
    
    return (
      <Router>
        <div className="App">
          <Navigation changemode={(_mode)=>this.changeMode(_mode)} user={this.state.user} loggedin={this.state.loggedin} home={()=>this.setState({mode:"list"})}></Navigation>
          <Announcement></Announcement>
          <Switch>
            <Route exact path='/'>
              {this.selectContent()}
            </Route>
            <Route path="/signin">
              <SignIn onSignIn={(user)=>this.onSignIn(user)}></SignIn>
            </Route>
            <Route path="/mypage">
              <MyPage onSignOut={()=>this.signOut()}></MyPage>
            </Route>
          </Switch>
          <Pages 
            nexttoken_ContenList ={this.state.nexttoken_ContenList}
            next_page_count= {this.state.next_page_count} 
            required_page_count={this.state.required_page_count} 
            current_page={this.state.current_page} 
            changePage={(page)=>this.changePage(page)}
            nextPageCountHandler={(num)=>this.nextPageCountHandler()}
          ></Pages>
          <Button id="text" onClick={()=>this.fetchContentLists()}>next</Button>
        </div>
      </Router>
    );
  }
}

export default App;
