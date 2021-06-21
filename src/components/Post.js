import {Component} from 'react';
import { API } from 'aws-amplify'
import {getPost} from '../graphql/queries'
import { Storage } from 'aws-amplify'


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
      imagelists:[],
      commentlist: [],
      state_init : false,
    }
  }

  //lifecycle hook
  componentDidMount(){    
    this.stateInit(this.props)
  }
  
  shouldComponentUpdate(props){
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
    if(this.state.isloaded === true || this.state.post.resources.length < 1) return
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
          </div>
          <div className="post_comment_detail">
            <p className = "post_comment_content" >{item.content}gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg</p>
          </div>
          <div className="post_comment_functions">
            <span className = "post_comment_recomment" >recomment</span>      
            <div className="post_comment_functions_buttons">  
              <span className = "post_comment_upanddown" >up</span>
              <span className = "post_comment_upanddown" >down</span>
              <span className = "post_comment_morefunction" >menu</span>
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
          <hr></hr>
          <ul className="post_comment_ul">
            {this.state.commentlist}
          </ul>
          {this.props.loggedin ? 
          <form onSubmit={(e)=>{
            e.preventDefault()
            let temp = {id:this.state.id,postID:this.state.postID,nickname:this.state.nickname,content:this.state.content,}
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