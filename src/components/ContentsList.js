import {Component} from 'react';

class ContentsList extends Component {
  render(){
    let lists = []
    
    this.props.postlist.forEach((item, i)=>{
        let _id = (this.props.current_page-1) * 15 + i + 1
        
        let date = new Date(item.createdAt)
        let hours = date.getHours()
        let minutes = date.getMinutes()
        if(hours < 10) hours = "0"+hours.toString()
        if(minutes < 10) minutes = "0"+minutes.toString()
        // console.log(item);
        lists.push(
            <li className = "contentList_li" key = {item.id}>
                <div className = "contentList_info">                
                    <div className="contentList_subject">                        
                        <p>
                          <a 
                                href={"/content/"+item.id}
                                onClick={(e)=>{
                                    e.preventDefault()
                                    this.props.moveToPost(item)
                                }}
                            >
                                <span className="contentList_subject_title">{item.title}</span>                                  
                                <span className="contentList_subject_comments">[{item.comments.items.length}]</span>
                            </a>  
                        </p>
                        
                    </div>
                    <div className="contentList_detail">
                        <p>
                            <span className="contentList_detail_uploader">{item.uploader} |</span>  
                            <span className="contentList_detail_id"> No. {_id} |</span>    
                            <span className="contentList_detail_time"> {hours}:{minutes}</span>                             
                        </p>
                        
                        
                        {/* <p>{item.number}</p>
                        <p>{item.time}</p> */}
                   </div>                   
                </div>
                <hr></hr>
            </li>
        )
    })
    return (
        <ul className = "contentList_ul">
            {lists}
        </ul>
    );
  }
}

export default ContentsList;