import {Component} from 'react';
import { faUserCircle, faEdit, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render(){
    return (
      <div className="navigation">
          <Link to="/" onClick={()=>{
            this.props.changemode("list")
          }}>
            <h1 className="navigation_title">Whats UP</h1>
          </Link>
          <ul className="navigation_buttons_holder">
              {this.props.user.username === "project401ho" ? 
              <Link to="/" onClick={()=>{
                this.props.changemode("create")
              }}>
                <li className="navigation_button_li">
                  <button type = "button" className="navigation_button"> 
                    <FontAwesomeIcon icon={faWrench} size="lg" color="yellow"></FontAwesomeIcon>
                  </button>
                </li> 
              </Link>
              :
              <noscript></noscript>
              }
                
              {this.props.loggedin ? 
              <li className="navigation_button_li">
                <Link to='/mypage'>
                <button type = "button" className="navigation_button"> 
                  <FontAwesomeIcon icon={faUserCircle} size="lg" color="yellow"></FontAwesomeIcon>
                </button>
                </Link>
              </li> 
              :
              <li className="navigation_button_li">
                <Link to="/signin">
                <button type = "button" className="navigation_button"> 
                  <FontAwesomeIcon icon={faUserCircle} size="lg" color="yellow"></FontAwesomeIcon>
                </button>
                </Link>
              </li>
              }
              
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