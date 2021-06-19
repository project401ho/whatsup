import {Component} from 'react';
import { API } from 'aws-amplify'
import {getPost} from '../graphql/queries'
import { Storage } from 'aws-amplify'


class Post extends Component {  
  constructor(props){
    super(props)    
    console.log(props);
    this.state = {      
      id: (this.props.post.id)+"_"+(this.props.post.comments.items.length+1),
      postID: this.props.post.id,
      nickname : "",
      content : "",
      post: this.props.post,
      isloaded: false,
    }
    
  }

  //lifecycle hook
  componentDidMount(){    
    
    this.imageLoad()        
  }
  
  shouldComponentUpdate(props){
    if(this.props.post.comments.items.length === props.post.comments.items.length) return true
    else{
      console.log("caught")
      this.setState({id: (props.post.id)+"_"+(props.post.comments.items.length+1)})    
      return true
    }
    
  }
  // generic
  async getPost(){
    let _id = window.location.href.split("/")
    _id = _id[_id.length-1]
    let temp = await API.graphql({
      query: getPost, 
      variables:{id:_id},
      authMode: 'AWS_IAM',
    }).data.getPost
    this.setState({post:temp,postID:temp.id,id:(temp.post.id)+"_"+(temp.post.comments.items.length+1)})
  }

  stateHandler(e){
    this.setState({[e.target.name] : e.target.value})
  }
  imageListGenerate(){
    if(this.state.isloaded === true || this.props.post.resources.length < 1) return
    let imagelist = []
    this.props.post.resources.items.sort((a,b)=>a.order - b.order)
    .forEach(async (item, i)=>
    {
      let _url = await Storage.get(item.id)
      console.log(_url);
      imagelist.push(
        <img key={i} className="post_img" src={_url} alt=""/>
      )
    })
    console.log(imagelist);
    console.log("done");
    return imagelist
  }
  commentListGenerate(){
    let commentlist = []
    this.props.post.comments.items.sort((a,b)=>{
      let ad = new Date(a.createdAt)
      let bd = new Date(b.createdAt)
      if(ad > bd) return 1
      else if(ad < bd) return -1
      else return 0
    }).forEach((item,i)=>{
      commentlist.push(
        <li className = "comment_li" key={i}>
          <p>{item.nickname}</p>
          <p>{item.content}</p>
        </li>
      )
    })
    return commentlist 
  }

  async imageLoad(){
    // if(this.state.isloaded === true || this.props.post.image === "") return
    // const image = await Storage.get(this.state.post.image)
    // let temp = Object.assign({},this.state.post)
    // temp.image = image
    // this.setState({post:temp, isloaded:true})
  }
  
  render(){    
    return (
      <div className="post">
          <h1>{this.state.post.title}</h1>          
          {this.imageListGenerate()}
          <p>{this.state.post.content}</p>
          
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
          <ul>
              {this.commentListGenerate()}
          </ul>
      </div>
    );
  }
}

export default Post;