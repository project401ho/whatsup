import {Component} from 'react';

class ContentsList extends Component {
  render(){
    let lists = []
    this.props.data.forEach((item)=>{
        lists.push(
            <li key = {item.id}>
                <a 
                    href={"/content/"+item.id}
                >
                    <div className="content_list_item_container">
                        <h3>{item.title}</h3>
                        <p>{item.comment_count}</p>
                    </div>
                    <div className="content_list_item_container">
                        <p>{item.uploader}</p>
                        <p>{item.number}</p>
                        <p>{item.time}</p>
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