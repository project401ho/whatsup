import {Component} from 'react';
import {Switch} from "@material-ui/core";

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
        likes:0,
        hates:0,
        liked_users:[],
        hated_users:[],
        source: ""
      }, 
      resource: {
        id: "",
        postID: ""+date.getFullYear() + (date.getMonth()+1)+date.getDate()+date.getTime(),
        order: 0,
        file: null,     
        filename: "",
        uploader_comment:"",
      },
      resources:[],
      fileButtonList: [],
      announcement: false,
    }
  }
  togglecheck(){    
    if(!this.state.announcement){
      let temp = Object.assign({},this.state.resource,{postID:"announcement"})
      this.setState({resource:temp})
      this.state.resources.forEach((item)=>{
        item.postID="announcement"
      })
    }
    this.setState({announcement:!this.state.announcement})
  }
  componentDidMount(){
  }
  addResource (filename,file,order) {
    let resource = Object.assign({},this.state.resource,{
      id:this.state.post.id+"_R"+this.state.resources.length,
      file:file,order:order,
      filename:filename,
    })
    let _resources = [...this.state.resources].concat(resource)
    this.setState({resources:_resources})
  }
  addImageFile(){
    this.addResource("fiilename",null,this.state.fileButtonList.length+1)
    let temp = [...this.state.fileButtonList]
    temp.push(
    <div className="create-post-element" key = {this.state.fileButtonList.length+1}>
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
          _resources[Number(e.target.id)].filename = file.name          
          this.setState({resources:_resources})              
        }}
      />
      <input
        name="image-comment"
        id={this.state.fileButtonList.length}
        placeholder="이미지별 코멘트"
        onChange={(e)=>{
          let _resources = [...this.state.resources]
          _resources[Number(e.target.id)].uploader_comment = e.target.value
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
          <div className=" create-post-element ">
            <p>공지 토글</p>
            <Switch onChange= { ()=> {this.togglecheck()}}></Switch>
          </div> 
          <div className="create-post-element">
            <p className="create-post-element-tag">업로더: </p>
            <input
              name = "uploader"
              value="와썹"
              onChange={(e)=>this.stateHandler(e)}
            />
          </div>
          <div className="create-post-element">
            <p className="create-post-element-tag">제목: </p>
            <input
              name = "title"
              placeholder="post title"
              onChange={(e)=>this.stateHandler(e)}
            />
          </div>
          <div className="create-post-content-textarea">
            <p className="create-post-element-tag">내용: </p>
            <textarea
              className="create-post-content-textarea-content"
              name = "content"
              placeholder="post content"
              onChange={(e)=>this.stateHandler(e)}
            />
          </div>
          {this.state.fileButtonList}
          <div className=" create-post-element create-post-element-center">
            <button onClick={(e)=>{
              e.preventDefault()
              this.addImageFile()
              
            }}>미디어 파일 추가</button>
          </div>  
          <div className="create-post-element">
            <p className="create-post-element-tag">출처: </p>
            <input
              name = "source"
              placeholder="출처"
              onChange={(e)=>this.stateHandler(e)}
            />
          </div>
          <div className=" create-post-element create-post-element-center">
          
          <button onClick={(e)=>{
            e.preventDefault()
            this.state.resources.forEach(async (item)=>{
              this.props.imageUpload(item.file)              
              let temp = Object.assign({},item,{file:"done"})
              this.props.createResource(temp)
            })
            if(!this.state.announcement){              
              this.props.createPost(this.state.post)
            }
            else{
              let temp = Object.assign({},this.state.post,{id:"announcement",type:"announcement"})
              this.props.updatePost(temp)              

            }
            
          }}>만들기</button>
          </div>    
              
                  
      </div>
    );
  }
}

export default CreatePost;