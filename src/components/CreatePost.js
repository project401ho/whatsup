import {Component} from 'react';

class CreatePost extends Component {
  constructor(props){
    super(props)
    let date = new Date()
    this.state = {     
      post:{
        id : ""+date.getFullYear() + (date.getMonth()+1)+date.getDate()+date.getTime(),
        title: "",
        count: this.props.total_post_count + 1,
        content: "",        
        video: "",
        type:"post",
        uploader: "와썹",
      }, 
      resource: {
        id: "filename",
        postID: ""+date.getFullYear() + (date.getMonth()+1)+date.getDate()+date.getTime(),
        order: 0,
        file: null,     
      },
      resources:[],
      fileButtonList: [],
    }
  }
  componentDidMount(){
    this.addImageFile()
  }
  addResource (filename,file,order) {
    let resource = Object.assign({},this.state.resource,{id:filename,file:file,order:order})
    let _resources = [...this.state.resources].concat(resource)
    this.setState({resources:_resources})
  }
  addImageFile(){
    this.addResource("fiilename",null,this.state.fileButtonList.length+1)
    let temp = [...this.state.fileButtonList]
    temp.push(
    <div key = {this.state.fileButtonList.length+1}>
      <input        
        name = "image"
        type="file"
        id={this.state.fileButtonList.length}
        onChange={(e)=>{
          console.log(e);
          if(!e.target.files[0]) return
          let file = e.target.files[0]
          let _resources = [...this.state.resources]
          _resources[Number(e.target.id)].file = file;
          _resources[Number(e.target.id)].id = file.name          
          this.setState({resources:_resources})              
        }}
      />
    </div>,
    )
    this.setState({fileButtonList:temp})
  }
  stateHandler(e){
    let temp = {[e.target.name]:e.target.value}
    let _post = Object.assign({},this.state.post,temp)
    this.setState({post:_post})
  }
  shouldComponentUpdate(props){
    if(props.id !== this.props.id){
      this.setState({id:props.id})
      return true
    }
    return true
  }
  render(){
    return (
      <div className="CreatePost">
          <h1>게시물 만들기</h1>
          <p>
            <input
              name = "uploader"
              value="와썹"
              onChange={(e)=>this.stateHandler(e)}
            />
          </p>
          <p>
          <input
            name = "title"
            placeholder="post title"
            onChange={(e)=>this.stateHandler(e)}
          />
          </p>
          <p>
          <input
            name = "content"
            placeholder="post content"
            onChange={(e)=>this.stateHandler(e)}

          />
          </p>
          {this.state.fileButtonList}
          <div>
          <button onClick={(e)=>{
            e.preventDefault()
            this.addImageFile()
            
          }}>이미지 파일 추가</button>
          </div>  
          <div>
          <button onClick={(e)=>{
            e.preventDefault()
            this.state.resources.forEach(async (item)=>{
              this.props.imageUpload(item.file)              
              let temp = Object.assign({},item,{file:"done"})
              console.log(temp);
              this.props.createResource(temp)
            })
            this.props.createPost(this.state.post)
          }}>만들기</button>
          </div>                  
      </div>
    );
  }
}

export default CreatePost;