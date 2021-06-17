import {Component} from 'react';

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
                        <input 
                            id = "pages_current" 
                            type="button" 
                            value={i} 
                            onClick={(e)=>this.props.changePage(e.target.value)}>
                        </input>
                    </li>    
                )
            }
            else{
                lists.push(
                    <li key={i} className="pages_button">
                        <input 
                            type="button" 
                            value={i} 
                            onClick={(e)=>this.props.changePage(e.target.value)}>
                        </input>
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
}

export default Pages;