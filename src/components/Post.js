import {Component} from 'react';
import { Storage } from 'aws-amplify'

class Post extends Component {
  constructor(props){
    super(props)
    this.state = {
      //id가 코멘트 등록후 하나 올라가야됨 실시간 반영 안됌 수정 요망
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

  stateHandler(e){
    this.setState({[e.target.name] : e.target.value})
  }

  commentListGenerate(){
    // console.log("!");
    let commentlist = []
    this.props.post.comments.items.sort((a,b)=>{
      // console.log("a",new Date(a.createdAt));
      // console.log("b",new Date(b.createdAt));
      let ad = new Date(a.createdAt)
      let bd = new Date(b.createdAt)
      // console.log(ad > bd);
      if(ad > bd) return 1
      else if(ad < bd) return -1
      else return 0
    }).forEach((item,i)=>{
      commentlist.push(
        <li key={i}>
          <p>{item.nickname}</p>
          <p>{item.content}</p>
        </li>
      )
    })
    return commentlist 
  }

  async imageLoad(){
    if(this.state.isloaded === true) return
    const image = await Storage.get(this.state.post.image)
    let temp = Object.assign({},this.state.post)
    temp.image = image
    this.setState({post:temp, isloaded:true})
  }
  
  render(){    
    return (
      <div className="post">
          <h1>{this.state.post.title}</h1>          
          {
              this.state.post.image && <img src={this.state.post.image} style={{width:400,height:400}} alt=""/>
          }
          <p>{this.state.post.content}</p>
          <form onSubmit={(e)=>{
            e.preventDefault()
            let temp = {id:this.state.id,postID:this.state.postID,nickname:this.state.nickname,content:this.state.content,}
            this.props.createComment(temp)
            e.target.nickname.value = ""
            e.target.content.value = ""
            
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
          <div>
              {this.commentListGenerate()}
          </div>
      </div>
    );
  }
}

export default Post;