import {Component} from 'react';

class ContentsList extends Component {
  render(){
    let lists = []
    this.props.postlist.forEach((item)=>{
        lists.push(
            <li key = {item.id}>
                <a 
                    href={"/content/"+item.id}
                    onClick={(e)=>{
                        e.preventDefault()
                        this.props.moveToPost(item)
                    }}
                >
                    <div className="content_list_item_container">
                        <h3>{item.title}</h3>
                        {/* <p>{item.comment_count}</p> */}
                    </div>
                    <div className="content_list_item_container">
                        <p>{item.content}</p>
                        {/* <p>{item.number}</p>
                        <p>{item.time}</p> */}
                   </div>
                </a>
            </li>
        )
    })
    return (
      <div>
          <ul>
              {lists}
          </ul>
      </div>
    );
  }
}

export default ContentsList;