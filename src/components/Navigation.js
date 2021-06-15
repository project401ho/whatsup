import {Component} from 'react';
import { faUserCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navigation extends Component {
  render(){
    return (
      <div className="navigation">
          <h1 className="navigation_title"><a href="/" onClick={(e)=>{
            e.preventDefault()
            this.props.home()
          }}>Whats UP</a></h1>
          <ul className="navigation_buttons_holder">
              
              <li className="navigation_button_li">
                <button type = "button" className="navigation_button"> 
                  <FontAwesomeIcon icon={faUserCircle} size="lg" color="yellow"></FontAwesomeIcon>
                </button>
              </li>
              <li type = "button" className="navigation_button_li">
                <button className="navigation_button"> 
                  <FontAwesomeIcon icon={faEdit} size="lg" color="yellow"></FontAwesomeIcon>
                </button>
              </li>
          </ul>
      </div>
    );
  }
}

export default Navigation;