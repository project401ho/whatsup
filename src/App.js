import './App.css';
import React,{Component} from 'react';
import Navigation from './components/Navigation'
import ContentsList from './components/ContentsList'
import Pages from './components/Pages'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      contentslist: [
        {id:1,title:"title1",comment_count:10,uploader:"WhatsUp",time:"07:56",number:1},
        {id:2,title:"title2",comment_count:10,uploader:"WhatsUp",time:"08:54",number:2},
        {id:3,title:"title3",comment_count:10,uploader:"WhatsUp",time:"09:25",number:3},
        {id:4,title:"title4",comment_count:10,uploader:"WhatsUp",time:"10:23",number:4},
        {id:5,title:"title5",comment_count:10,uploader:"WhatsUp",time:"11:23",number:5},
      ]
    }
  }
  render(){
    return (
      <div className="App">
        <Navigation></Navigation>
        <ContentsList
          data = {this.state.contentslist}
        ></ContentsList>
        <Pages></Pages>
      </div>
    );
  }
}

export default App;
