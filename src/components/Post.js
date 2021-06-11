import {Component} from 'react';

class Post extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: 12,
      postID: this.props.post.id,
      nickname : "",
      content : "",
    }
  }
  stateHandler(e){
    this.setState({[e.target.name] : e.target.value})
  }
  render(){
    return (
      <div className="post">
          <h1>{this.props.post.title}</h1>
          
          {
              this.props.post.image && <img src={this.props.post.image} style={{width:400,height:400}} alt=""/>
          }
          <p>{this.props.post.content}</p>
          <form onSubmit={(e)=>{
            e.preventDefault()
            let temp = this.state
            this.props.createComment(temp)
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
              
          </div>
      </div>
    );
  }
}

export default Post;