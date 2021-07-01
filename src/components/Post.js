import { Component } from 'react';
import ContentsList from '../components/ContentsList'
import { API } from 'aws-amplify'
import { getPost, getComment } from '../graphql/queries'
import {
  createComment as createCommentMutation, 
  updateComment as updateCommentMutation,

} from '../graphql/mutations'
import { Storage } from 'aws-amplify'
import { faThumbsUp,faThumbsDown, } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV,faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Post extends Component {  
  
  constructor(props){    
    super(props)
   
    this.state ={  
      id: "",
      postID: "",
      nickname : "",
      content : "",
      post: {},
      isloaded: false,
      like: 0,
      hate: 0,
      reported:0,
      imagelists:[],
      commentlist: [],
      best_commentlist: [],
      state_init : false,
      user_engaged: false,
      user_engaged_type: "none",
      
    }
  }

  //lifecycle hook
  componentDidMount(){    
    this.stateInit(this.props)
    // this.setState({})
  }
  
  shouldComponentUpdate(props, state){
    if(this.props.post !== props.post){      
      this.stateInit(props)
    }
    
    return true
  }
  // generic
  async stateInit(props){
    if(props.post === null){
      await this.getPost()
      this.imageListGenerate() 
      this.commentListGenerate()      
    }
    else{
      await this.setState({
        id: (props.post.id)+"_"+(props.post.comments.items.length+1),
        postID: props.post.id,
        nickname : "",
        content : "",
        post: props.post,
        isloaded: false,
        imagelists: [],
        commentlist: [],
        state_init : false,
      })
      this.imageListGenerate() 
      this.commentListGenerate()
    }

  }

  async getPost(){
    let _id = window.location.href.split("/")
    _id = _id[_id.length-1].toString()
    let temp = await API.graphql({
      query: getPost, 
      variables:{id:_id},
      authMode: 'AWS_IAM',
    })
    temp = temp.data.getPost    
    this.setState({
      post:temp,
      postID:temp.id,
      id:(temp.id)+"_"+(temp.comments.items.length+1),
      state_init : true,
    })
      
  }

  stateHandler(e){
    this.setState({[e.target.name] : e.target.value})
  }
  async imageListGenerate(){
    if(this.state.isloaded === true || this.state.post.resources.length < 1) return
    let templist = []
    let resourcelist = this.state.post.resources.items.sort((a,b)=>a.order - b.order)
    for(let i = 0; i < resourcelist.length; i++){
      let item = resourcelist[i]
      let _url = await Storage.get(item.id)
      templist.push(<img key={_url} className="post_img" src={_url} alt=""/>)
    }
    let engaged = this.ueserEngageHandler()
    this.setState({imagelists: templist, user_engaged:engaged[0],user_engaged_type:engaged[1]})
  }
  ueserEngageHandler(){
    let temp = []
    if(this.state.post.liked_users.some((name)=>this.props.user.username === name)){
      temp.push(true)
      temp.push("liked")
    }
    else if(this.state.post.hated_users.some((name)=>this.props.user.username === name)){
      temp.push(true)
      temp.push("hated")
    }
    else{
      temp.push(false)
      temp.push("none")
    }
    return temp
  }
  commentListGenerate(){
    let _commentlist = []
    let best_list = []
    this.state.post.comments.items.sort((a,b)=>{
      let ad = new Date(a.createdAt)
      let bd = new Date(b.createdAt)
      if(ad > bd) return 1
      else if(ad < bd) return -1
      else return 0
    }).forEach((item,i)=>{
      let hours = Number(item.createdAt.split("T")[1].substring(0,2))+9
      hours = hours > 24 ? hours - 24 : hours
      let minutes = item.createdAt.split("T")[1].substring(3,5)
      _commentlist.push(
        <li className = "post_comment_li" key={"comment"+i}>
          <div className="post_comment_subject">
            <span className = "post_comment_nickname" >{item.nickname}</span>
            <span className = "post_comment_time" > {hours + ":" + minutes}</span>
            <button type="button" className = "post_comment_morefunction" >
              <FontAwesomeIcon icon={faEllipsisV} size="sm"></FontAwesomeIcon>                
            </button>
          </div>
          <div className="post_comment_detail">
            <p className = "post_comment_content" >{item.content}</p>
          </div>
          <div className="post_comment_functions">
            <span className = "post_comment_recomment">대댓 달기</span>      
            <div className="post_comment_functions_buttons">  
              <button type="button" className = "post_comment_upanddown" onClick={(e)=>{
                e.preventDefault()
                if(this.checkDuplicateLikeComment(item,"like")) return
                let templist = this.likeCommentHandler(item,"like")
                let temp = Object.assign({},item,{likes:item.likes+1,liked_users:templist})
                delete temp.post
                delete temp.createdAt
                delete temp.updatedAt
                this.updateCommentLikes(temp)                   
              }}>                    
                <FontAwesomeIcon icon={faThumbsUp} size="sm"></FontAwesomeIcon>
                <p className = "post_comment_upanddown_count like">{item.likes}</p>                
              </button>
              <button type="button" className = "post_comment_upanddown" onClick={(e)=>{
                e.preventDefault()
                if(this.checkDuplicateLikeComment(item,"hate")) return
                let templist = this.likeCommentHandler(item,"hate")
                let temp = Object.assign({},item,{hates:item.hates+1,hated_users:templist})
                delete temp.post
                delete temp.createdAt
                delete temp.updatedAt
                this.updateCommentLikes(temp)
              }}>
                <FontAwesomeIcon icon={faThumbsDown} size="sm"></FontAwesomeIcon>
                <p className = "post_comment_upanddown_count hate">{item.hates}</p>                
              </button>              
            </div>  
          </div>
        </li>
      )
    })
    let temp = this.state.post.comments.items.sort((a,b)=>{
      return b.likes - a.likes
    }).slice(0,3).filter((item)=>item.likes > 4)
    temp.forEach((item,i) => {
      let hours = Number(item.createdAt.split("T")[1].substring(0,2))+9
      hours = hours > 24 ? hours - 24 : hours
      let minutes = item.createdAt.split("T")[1].substring(3,5)
      best_list.push(
        <li className = "post_comment_li" key={"best_comment"+i}>
          <div className={"post_comment_subject best" + i}>
            <FontAwesomeIcon className = "post_best_comment_rocket" icon={faRocket} aria-hidden="true"></FontAwesomeIcon>
            <span className = "post_comment_nickname best_comment" >{item.nickname}</span>
            <span className = "post_comment_time" > {hours + ":" + minutes}</span>
            <button type="button" className = "post_comment_morefunction best_comment" >
              <FontAwesomeIcon icon={faEllipsisV} size="sm"></FontAwesomeIcon>                
            </button>
          </div>
          <div className="post_comment_detail">
            <p className = "post_comment_content" >{item.content}</p>
          </div>
          <div className="post_comment_functions">
            <span className = "post_comment_recomment">대댓 달기</span>      
            <div className="post_comment_functions_buttons">  
              <button type="button" className = "post_comment_upanddown best_comment" onClick={(e)=>{
                e.preventDefault()
                if(this.checkDuplicateLikeComment(item,"like")) return
                let templist = this.likeCommentHandler(item,"like")
                let temp = Object.assign({},item,{likes:item.likes+1,liked_users:templist})
                delete temp.post
                delete temp.createdAt
                delete temp.updatedAt
                this.updateCommentLikes(temp)                   
              }}>                    
                <FontAwesomeIcon icon={faThumbsUp} size="sm"></FontAwesomeIcon>
                <p className = "post_comment_upanddown_count like">{item.likes}</p>                
              </button>
              <button type="button" className = "post_comment_upanddown best_comment" onClick={(e)=>{
                e.preventDefault()
                if(this.checkDuplicateLikeComment(item,"hate")) return
                let templist = this.likeCommentHandler(item,"hate")
                let temp = Object.assign({},item,{hates:item.hates+1,hated_users:templist})
                delete temp.post
                delete temp.createdAt
                delete temp.updatedAt
                this.updateCommentLikes(temp)
              }}>
                <FontAwesomeIcon icon={faThumbsDown} size="sm"></FontAwesomeIcon>
                <p className = "post_comment_upanddown_count hate">{item.hates}</p>                
              </button>              
            </div>  
          </div>
        </li>
      )
    });
    

    this.setState({commentlist:_commentlist,best_commentlist:best_list})
  }
  
  async createComment(formData){

    //폼 체크
    if(!formData.nickname || !formData.content ) return
    if(!this.props.loggedin){
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
    let _id = formData.postID
    let temp = await API.graphql({
      query: getPost, 
      variables:{id:_id},
      authMode: 'AWS_IAM',
    })
    this.setState({post:temp.data.getPost})
    this.commentListGenerate()

  }

  async updateCommentLikes(item){
    
    if(!this.props.loggedin) {
      alert("로그인을 해주세요")
      return
    }
    await API.graphql({
      query:updateCommentMutation,
      variables:{input:item},
      authMode: "AWS_IAM"
    })
    let temp2 = await API.graphql({
      query: getPost, 
      variables:{id:this.state.post.id},
      authMode: 'AWS_IAM',
    })
    temp2 = temp2.data.getPost    
    this.setState({post:temp2})
    this.commentListGenerate()
  }

  postLikeButtonHandler(){
    if(this.state.user_engaged) return
    if(!this.props.loggedin){
      alert("로그인을 해주세요")
      return
    }
    let _liked_users = [...this.state.post.liked_users]
    _liked_users.push(this.props.user.username)
    let temp = Object.assign({},this.state.post,{likes:this.state.post.likes+1,liked_users:_liked_users})
    delete temp.comments
    delete temp.resources
    delete temp.post
    delete temp.createdAt
    delete temp.updatedAt
    this.props.updatePostLikes(temp)
    let temp2 = Object.assign({},this.state.post,{likes:this.state.post.likes+1})
    this.setState({post:temp2,user_engaged:true,user_engaged_type:"liked"})
  }

  postHatesButtonHandler(){
    if(this.state.user_engaged) return
    if(!this.props.loggedin){
      alert("로그인을 해주세요")
      return
    }    
    let _hated_users = [...this.state.post.hated_users]
    _hated_users.push(this.props.user.username)
    let temp = Object.assign({},this.state.post,{hates:this.state.post.hates+1,hated_users:_hated_users})
    delete temp.comments
    delete temp.resources
    delete temp.post
    delete temp.createdAt
    delete temp.updatedAt
    this.props.updatePostLikes(temp)
    let temp2 = Object.assign({},this.state.post,{hates:this.state.post.hates+1})
    this.setState({post:temp2,user_engaged:true,user_engaged_type:"hated"})
  }
  checkDuplicateLikeComment(item, type){
    if(type === "like"){
      if (item.liked_users.some((name)=>this.props.user.username === name)) {
        // alert("추천을 취소했습니다")
        this.undoLikeComment(item,type)
        return true
      }
      else if(item.hated_users.some((name)=>this.props.user.username === name)){
        alert("비추천을 취소하시면 추천이 가능해집니다 :)")
        return true
      }
    }
    else if(type === "hate"){
      if (item.hated_users.some((name)=>this.props.user.username === name)) {
        // alert("비추천을 취소했습니다 :)")
        this.undoLikeComment(item,type)
        return true
      }
      else if(item.liked_users.some((name)=>this.props.user.username === name)){
        alert("추천을 취소하시면 비추천이 가능해집니다 :)")
        return true
      }
    }
    
    return false
  }
  undoLikeComment(item, type){
    let templist = []
    let username = this.props.user.username
    let temp = Object.assign({},item)
    if(type === "like"){
      let idx = [...item.liked_users].indexOf(username)
      templist.splice(idx,1)
      temp.likes -= 1
      temp.liked_users = templist      
    }
    else if(type === "hate"){
      let idx = [...item.hated_users].indexOf(username)
      templist.splice(idx,1)
      temp.hates -= 1
      temp.hated_users = templist
    }
    delete temp.post
    delete temp.createdAt
    delete temp.updatedAt
    this.updateCommentLikes(temp)
  }
  likeCommentHandler(item, flag){
    let temp = []
    let username = this.props.user.username
    if(flag === "like"){
      temp = [...item.liked_users].concat(username)
    }
    else{
      temp = [...item.hated_users].concat(username)
    }
    return temp
  }
  render(){    
    
    return (
      <div className="post">
          <h1>{this.state.post.title}</h1>          
            {this.state.imagelists}
          <p>{this.state.post.content}</p>
          <div className = "post_like_button_container ">            
            <button type="button" className = {"post_like_button "+this.state.user_engaged_type} onClick={(e)=>{
              e.preventDefault()
              this.postLikeButtonHandler()
            }}>                    
              <FontAwesomeIcon className = "post_like_icon" icon={faThumbsUp}></FontAwesomeIcon>
              <p className = "post_like_count like">{this.state.post.likes}</p>                
            </button>
            <button type="button" className = {"post_like_button "+this.state.user_engaged_type} onClick={(e)=>{
              e.preventDefault()
              this.postHatesButtonHandler()
            }}>
              <FontAwesomeIcon className = "post_like_icon" icon={faThumbsDown}></FontAwesomeIcon>
              <p className = "post_like_count hate">{this.state.post.hates}</p>                
            </button>
          </div>
          <hr></hr>
          <ul className="post_best_comment_ul">
            {this.state.best_commentlist}
          </ul>
          <ul className="post_comment_ul">
            {this.state.commentlist}
          </ul>
          {this.props.loggedin ? 
          <form className = "post_create_comment_container" onSubmit={(e)=>{
            e.preventDefault()
            let temp = {
              id:this.state.id,
              postID:this.state.postID,
              nickname:this.props.user.username,
              content:this.state.content,
              likes: 0,
              hates: 0,
              reported:0,
              liked_users:[""],
              hated_users:[""],
            }
            this.createComment(temp)
            e.target.content.value = ""
            this.setState({content:""})
          }}>
            <div className = "post_create_comment_div">
            <textarea className = "post_create_comment_textarea" name="content" onChange={(e)=>{
              this.stateHandler(e)
            }}></textarea>
            <input className = "post_create_comment_button" type="submit" value="작성" onChange={(e)=>{
              this.stateHandler(e)
            }}></input>
            </div>
          </form>
          :
          <noscript></noscript>
          }
          <hr></hr>
          <ContentsList
            total_post_count = {this.props.total_post_count}
            next_page_count = {this.props.next_page_count}
            current_page = {this.props.current_page}
            postlist = {this.props.sub_postList}
            moveToPost = {(item)=>{
              this.props.moveToPost(item)
              window.scrollTo(0, 0);
            }}
        ></ContentsList>
      </div>
    );
  }
}

export default Post;