import {Component} from 'react';
import {Link} from 'react-router-dom';

class Pages extends Component {

    load_pages(){
        // console.log("load pages");
        
        let lists = []    
        for(let i = 1+(this.props.next_page_count*5); i < this.props.required_page_count+1; i++){
            // console.log("i",i);
            // console.log(this.props.current_page);
            if(i === this.props.current_page){
                lists.push(
                    <li key={i} className="pages_button">
                      <Link
                        to={"/page/"+ i}
                        onClick={(e)=>this.props.changePage(e.target.value)}
                      >
                        <input 
                            id = "pages_current" 
                            type="button" 
                            value={i} 
                            // onClick={(e)=>this.props.changePage(e.target.value)}
                        >
                        </input>
                      </Link>
                    </li>    
                )
            }
            else{
                lists.push(
                    <li key={i} className="pages_button">
                        <Link
                        to={"/page/"+ i}
                        onClick={(e)=>this.props.changePage(e.target.value)}
                      >
                        <input 
                            type="button" 
                            value={i} 
                            // onClick={(e)=>this.props.changePage(e.target.value)}
                        >
                        </input>
                      </Link>
                    </li>    
                )
            }
            
        }
        return lists
    }
    render(){    
        return(
            <ul className="pages_list">
            {this.props.next_page_count > 0 
                ?
                <li className="pages_button"><input type="button" value="이전" onClick={(e)=>{
                    this.props.nextPageCountHandler()
                    this.props.changePage((this.props.next_page_count*5)-1)
                }}></input></li>
                :
                <noscript></noscript>
            }
            {this.load_pages()}
            {this.props.nexttoken_ContenList[this.props.next_page_count] !== null 
                ?
                <li className="pages_button"><input type="button" value="다음" onClick={(e)=>{
                    this.props.nextPageCountHandler()
                    this.props.changePage((this.props.next_page_count+1*5)+1)
                }}></input></li>
                :
                <noscript></noscript>
            }
            </ul>        
        )
    }
<<<<<<< HEAD
  return lists
}
loadPreviousButton(){
    let page = ((this.props.next_page_count)*5)
    return(
      <li className="pages_button">
        <Link 
          to={"/page/"+page}
          onClick={()=>{
            this.props.nextPageCountHandler(-1)
            this.props.fetchContentLists(page)
          }}
        >
          <input type="button" value="이전" onClick={(e)=>{
             
            }}>                        
          </input>
        </Link>
      </li>
    )
}

loadNextButton(){
  let page = ((this.props.next_page_count+1)*5)+1
  return(
    <li className="pages_button">
      <Link 
        to={"/page/"+page}
        onClick={()=>{
          this.props.fetchContentLists(page)
          this.props.nextPageCountHandler(1)    
        }}
      >
        <input type="button" value="다음">
        </input>
      </Link>
    </li>
  )
}

render(){    
    return(
        <ul className="pages_list">
        {this.props.next_page_count > 0 
            ?
            this.loadPreviousButton()
            :
            <noscript></noscript>
        }
        {this.load_pages()}
        {this.props.nexttoken_ContenList[this.props.next_page_count] !== null 
            ?
            this.loadNextButton()
            :
            <noscript></noscript>
        }
        </ul>        
    )
  }
=======
>>>>>>> parent of 9bb4a32 (7.06)
}

export default Pages;