import { Component } from 'react';
import { API } from 'aws-amplify'
import { getPost } from '../graphql/queries'
import { Storage } from 'aws-amplify'
import { faThumbsUp,faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
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
      state_init : false,
    }
  }

  //lifecycle hook
  componentDidMount(){    
    this.stateInit(this.props)
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
        imagelists:[],
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
  imageListGenerate(){
    
    if(this.state.isloaded === true || this.state.post.resources.length < 1 || this.state.imagelists.length > 0) return
    this.state.post.resources.items.sort((a,b)=>a.order - b.order)
    .forEach(async (item, i)=>
    {
      let _url = await Storage.get(item.id)
      let temp = [...this.state.imagelists].concat(<img key={_url} className="post_img" src={_url} alt=""/>)
      this.setState({imagelists:temp})
    })
    
  }
  commentListGenerate(){
    let _commentlist = []
    this.state.post.comments.items.sort((a,b)=>{
      let ad = new Date(a.createdAt)
      let bd = new Date(b.createdAt)
      if(ad > bd) return 1
      else if(ad < bd) return -1
      else return 0
    }).forEach((item,i)=>{
      _commentlist.push(
        <li className = "post_comment_li" key={"comment"+i}>
          <div className="post_comment_subject">
            <span className = "post_comment_nickname" >{item.nickname}</span>
            <span className = "post_comment_time" > {item.createdAt}</span>
            <button type="button" className = "post_comment_morefunction" >
              <FontAwesomeIcon icon={faEllipsisV} size="sm"></FontAwesomeIcon>                
            </button>
          </div>
          <div className="post_comment_detail">
            <p className = "post_comment_content" >{item.content}</p>
          </div>
          <div className="post_comment_functions">
            <span className = "post_comment_recomment" >대댓 달기</span>      
            <div className="post_comment_functions_buttons">  
              <button type="button" className = "post_comment_upanddown" onClick={async (e)=>{
                e.preventDefault()
                let temp = Object.assign({},item,{likes:item.likes+1})
                delete temp.post
                delete temp.createdAt
                delete temp.updatedAt
                await this.props.updateCommentLikes(temp)   
                let temp2 = await API.graphql({
                  query: getPost, 
                  variables:{id:this.state.post.id},
                  authMode: 'AWS_IAM',
                })
                temp2 = temp2.data.getPost    
                this.setState({post:temp2})
                this.commentListGenerate()
              }}>                    
                <FontAwesomeIcon icon={faThumbsUp} size="sm"></FontAwesomeIcon>
                <p className = "post_comment_upanddown_count like">{item.likes}</p>                
              </button>
              <button type="button" className = "post_comment_upanddown" onClick={async (e)=>{
                e.preventDefault()
                console.log("click");
                let temp = Object.assign({},item,{hates:item.hates+1})
                delete temp.post
                delete temp.createdAt
                delete temp.updatedAt
                this.props.updateCommentLikes(temp)
                let temp2 = await API.graphql({
                  query: getPost, 
                  variables:{id:this.state.post.id},
                  authMode: 'AWS_IAM',
                })
                temp2 = temp2.data.getPost    
                this.setState({post:temp2})
                this.commentListGenerate()

              }}>
                <FontAwesomeIcon icon={faThumbsDown} size="sm"></FontAwesomeIcon>
                <p className = "post_comment_upanddown_count hate">{item.hates}</p>                
              </button>
              
            </div>  
          </div>
        </li>
      )
    })
    this.setState({commentlist:_commentlist})
  }

 
  render(){    
    
    return (
      <div className="post">
          <h1>{this.state.post.title}</h1>          
            {this.state.imagelists}
          <p>{this.state.post.content}</p>
          <div className = "post_like_button_container">
            <button type="button" className = "post_like_button" onClick={(e)=>{
              e.preventDefault()
              let temp = Object.assign({},this.state.post,{likes:this.state.post.likes+1})
              delete temp.comments
              delete temp.resources
              delete temp.post
              delete temp.createdAt
              delete temp.updatedAt
              this.props.updatePostLikes(temp)
              let temp2 = Object.assign({},this.state.post,{likes:this.state.post.likes+1})
              this.setState({post:temp2})
            }}>                    
              <FontAwesomeIcon className = "post_like_icon" icon={faThumbsUp}></FontAwesomeIcon>
              <p className = "post_like_count like">{this.state.post.likes}</p>                
            </button>
            <button type="button" className = "post_like_button" onClick={(e)=>{
              e.preventDefault()
              let temp = Object.assign({},this.state.post,{hates:this.state.post.hates+1})
              delete temp.post
              delete temp.comments
              delete temp.resources
              delete temp.createdAt
              delete temp.updatedAt
              this.props.updatePostLikes(temp)              
              let temp2 = Object.assign({},this.state.post,{hates:this.state.post.hates+1})
              this.setState({post:temp2})
            }}>
              <FontAwesomeIcon className = "post_like_icon" icon={faThumbsDown}></FontAwesomeIcon>
              <p className = "post_like_count hate">{this.state.post.hates}</p>                
            </button>
          </div>
          <hr></hr>
          <ul className="post_comment_ul">
            {this.state.commentlist}
          </ul>
          {this.props.loggedin ? 
          <form onSubmit={(e)=>{
            e.preventDefault()
            let temp = {
              id:this.state.id,
              postID:this.state.postID,
              nickname:this.state.nickname,
              content:this.state.content,
              likes: 0,
              hates: 0,
              reported:0,
            }
            this.props.createComment(temp)
            e.target.nickname.value = ""
            e.target.content.value = ""
            this.setState({nickname:"",content:""})
          }}>
            <p><input name="nickname" type="text" placeholder="닉네임" onChange={(e)=>{
              this.stateHandler(e)
            }}></input></p>
            <p><textarea name="content" placeholder="댓글 내용" onChange={(e)=>{
              this.stateHandler(e)
            }}></textarea></p>
            <p><input type="submit" onChange={(e)=>{
              this.stateHandler(e)
            }}></input></p>
          </form>
          :
          <noscript></noscript>
          }
          
      </div>
    );
  }
}

export default Post;