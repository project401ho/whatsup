import './App.css';
import React,{Component} from 'react';
import Navigation from './components/Navigation'
import CreatePost from './components/CreatePost'
import ContentsList from './components/ContentsList'
import Pages from './components/Pages'
import Post from './components/Post'
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { API, Storage } from 'aws-amplify'
import {listPosts, getPost} from './graphql/queries'
import {createPost as createPostMutation, updatePost as updatePostMutation, createComment as createCommentMutation} from './graphql/mutations'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      mode: "list",
      isloaded: false,
      postList: [],
      content_max_id : 0,
      selected_post : {},
      current_page : 1,

    }
    
  }

  async createComment(formData){
    console.log("StartCreateComment");
    console.log("formData",formData);
    await API.graphql({query: createCommentMutation, variables:{input:formData}})
    console.log("AddedComment")
    console.log(await API.graphql({query: getPost, variables:{id:this.state.selected_post.id}} ).data.getPost)
    // this.fetchContentLists()
  }

  async photoHandler(e){
    const file = e.target.files[0]
    await Storage.put(file.name, file)
  }

  async fetchContentLists(){
    const apiData = await API.graphql({query: listPosts, variables:{limit:15}})
    const postFromAPI = apiData.data.listPosts.items.sort((a,b)=>b.id - a.id);
    await Promise.all(postFromAPI.map(async post=>{
      if(post.image){
        const image = await Storage.get(post.image)
        post.image = image
      }
      return post
    }))
    let loaded = true
    this.setState({postList:postFromAPI,isloaded:loaded,content_max_id:postFromAPI.length+1})  
  }
  
  async createPost(formData){
    if((!formData.title || !formData.id || !formData.content) && (formData.image || formData.video)) return
    await API.graphql({query:createPostMutation, variables:{input: formData} })
    if(formData.image){
      const image = await Storage.get(formData.image)
      formData.image = image
    }
    let list = [...this.state.postList].concat(formData)
    let maxid = this.state.content_max_id +1
    this.setState({postList: list, mode:"list", content_max_id: maxid})
  }
  selectContent(){
    let content
    if(this.state.mode === "list"){
      if(this.state.isloaded === false){
        this.fetchContentLists()
      }
      content = <ContentsList
          postlist = {this.state.postList}
          moveToPost = {(item)=>{
            this.setState({selected_post:item, mode:"post"})
          }}
        ></ContentsList>
    }
    else if(this.state.mode === "create"){
      content = <CreatePost id={this.state.content_max_id} photoHandler={(e)=>this.photoHandler(e)} createPost={(formData)=>this.createPost(formData)} ></CreatePost>
    }
    else if(this.state.mode ==="post"){
      if(this.state.selected_post){
        content = <Post post={this.state.selected_post} createComment={(dataForm)=>this.createComment(dataForm)}></Post>        
      }
      else{
        this.setState({mode:"list"})
      }
    }
    return content
  }
  render(){
    
    return (
      <div className="App">
        <Navigation home={()=>this.setState({mode:"list"})}></Navigation>
        {this.selectContent()}
        <Pages></Pages>
        {/* <AmplifySignOut /> */}

      </div>
    );
  }
}

export default App;
