import {Component} from 'react';

class Pages extends Component {
    constructor(props){
        super(props)
        this.state={
            min: 1,
            max: 6
        }
    }
    next_pages(){
        let temp = this.state.max
        let temp2 = this.state.min
        this.setState({max:temp+5,min:temp2+5})        
    }
    previous_pages(){
        let temp = this.state.max
        let temp2 = this.state.min
        this.setState({max:temp-5,min:temp2-5})        
    }
    load_pages(){
        let lists = []    
        for(let i = this.state.min; i < this.state.max; i++){
            lists.push(
                <li key={i} className="pages_button"><input type="button" value={i}></input></li>    
            )
        }
        return lists
    }
    render(){        
        if(this.state.min === 1){
            return (        
                <ul className="pages_list">            
                    {this.load_pages()}
                    <li className="pages_button_next"><input type="button" value="다음" onClick={(e)=>this.next_pages()}></input></li>
                </ul>
            );
        }
        else{
            return (        
                <ul className="pages_list">            
                    <li className="pages_button_next"><input type="button" value="이전" onClick={(e)=>this.previous_pages()}></input></li>
                    {this.load_pages()}
                    <li className="pages_button_next"><input type="button" value="다음" onClick={(e)=>this.next_pages()}></input></li>
                </ul>
            );
        }
        
    }
}

export default Pages;