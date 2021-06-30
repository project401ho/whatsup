import {Component} from 'react';
import {Link} from 'react-router-dom';
import { faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class ContentsList extends Component {
  render(){
    // console.log(this.props.current_page); 
    let lists = []
    
    this.props.postlist.forEach((item, i)=>{
        //          total count of posts    
        let postnumber = this.props.total_post_count - (this.props.next_page_count*10) - i        
        let date = new Date(item.createdAt)
        let hours = date.getHours()
        let minutes = date.getMinutes()
        if(hours < 10) hours = "0"+hours.toString()
        if(minutes < 10) minutes = "0"+minutes.toString()
        // console.log(item);
        if(item.type === "post"){
            lists.push(
            <li className = "contentList_li" key = {item.id}>
                <div className = "contentList_info">                
                    <div className="contentList_subject">                        
                        <p>
                          <Link 
                                to={"/post/"+item.id}
                                onClick={(e)=>{
                                    this.props.moveToPost(item)
                                }}
                            >
                                <span className="contentList_subject_title">{item.title}</span>                                  
                                <span className="contentList_subject_comments">[{item.comments.items.length}]</span>
                                <span className="contentList_subject_likes">
                                    <FontAwesomeIcon className="contentList_subject_icon" icon={faThumbsUp} size="sm"></FontAwesomeIcon>                                     
                                    {item.likes}
                                </span>
                            </Link>  
                        </p>
                        
                    </div>
                    <div className="contentList_detail">
                        <p>
                            <span className="contentList_detail_uploader">{item.uploader} |</span>  
                            <span className="contentList_detail_id"> No. {postnumber} |</span>    
                            <span className="contentList_detail_time"> {hours}:{minutes}</span>                             
                        </p>
                   </div>                   
                </div>
                <hr></hr>
            </li>
            )
        }
        else{
            lists.push(
            <li className = {"contentList_li "+item.type} key = {item.id}>
                <div className = "contentList_info">                
                    <div className="contentList_subject">                        
                        <p>
                          <Link 
                                to={"/post/"+item.id}
                                onClick={(e)=>{
                                    this.props.moveToPost(item)
                                }}
                            >
                                <b className="contentList_subject_announcement">
                                    공지
                                </b>
                                <span className="contentList_subject_title">{item.title}</span>                                  
                                <span className="contentList_subject_comments">[{item.comments.items.length}]</span>
                                
                            </Link>  
                        </p>
                        
                    </div>
                    <div className="contentList_detail">
                        <p>
                            <span className="contentList_detail_uploader">{item.uploader} |</span>  
                            <span className="contentList_detail_time"> {hours}:{minutes}</span>                             
                        </p>
                   </div>                   
                </div>
                <hr></hr>
            </li>
            )
        }
        
    })
    return (
        <ul className = "contentList_ul">
            {lists}
        </ul>
    );
  }
}

export default ContentsList;