import {Component} from 'react';

class CreatePost extends Component {
  constructor(props){
    super(props)
    this.state = {
      
      id: this.props.id,
      title: "",
      content: "",
      image: "",
      video: "",

    }
  }
  stateHandler(e){
    this.setState({[e.target.name]:e.target.value})
  }
  render(){
    return (
      <div className="CreatePost">
          <h1>Create POST</h1>
          <input
            name = "title"
            placeholder="post title"
            onChange={(e)=>this.stateHandler(e)}
          />
          <input
            name = "content"
            placeholder="post content"
            onChange={(e)=>this.stateHandler(e)}

          />
          <input
            name = "image"
            type="file"
            onChange={(e)=>{
              if(!e.target.files[0]) return
              this.props.photoHandler(e)
              let file = e.target.files[0]
              this.setState({image:file.name})              
            }}
          />
          <button onClick={(e)=>{
            e.preventDefault()
            let temp = this.state
            console.log("temp", temp)
            this.props.createPost(temp)
            
          }}>Create Note</button>
      </div>
    );
  }
}

export default CreatePost;