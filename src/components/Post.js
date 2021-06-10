import {Component} from 'react';

class Post extends Component {
  render(){
    return (
      <div className="post">
          <h1>{this.props.post.title}</h1>
          <p>{this.props.post.content}</p>
          {
              this.props.post.image && <img src={this.props.post.image} style={{width:400,height:400}} alt=""/>
          }
          <div>
              
          </div>
      </div>
    );
  }
}

export default Post;