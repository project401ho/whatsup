import {Component} from 'react';
import { faUserCircle, faEdit, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render(){
    return (
      <div className="navigation">
          <Link to="/" className="navigation_title" onClick={()=>{
            this.props.changemode("list")
          }}>
            <img src="/logo_transparent.png" alt="whats up logo" ></img>       
            <p className="navigation_slogan">세상의 모든 유우머</p>                
          </Link>
          
          <ul className="navigation_buttons_holder">
              {this.props.user.username === "project401ho" ? 
              <Link to="/" onClick={()=>{
                this.props.changemode("create")
              }}>
                <li className="navigation_button_li">
                  <button type = "button" className="navigation_button"> 
                    <FontAwesomeIcon icon={faWrench} size="lg" color="rgb(231, 218, 26)"></FontAwesomeIcon>
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
                  <FontAwesomeIcon icon={faUserCircle} size="lg" color="rgb(231, 218, 26)"></FontAwesomeIcon>
                </button>
                </Link>
              </li> 
              :
              <li className="navigation_button_li">
                <Link to="/signin">
                <button type = "button" className="navigation_button"> 
                  <FontAwesomeIcon icon={faUserCircle} size="lg" color="rgb(231, 218, 26)"></FontAwesomeIcon>
                </button>
                </Link>
              </li>
              }
              
              <li type = "button" className="navigation_button_li">
                <button className="navigation_button"> 
                  <FontAwesomeIcon icon={faEdit} size="lg" color="rgb(231, 218, 26)"></FontAwesomeIcon>
                </button>
              </li>
          </ul>
      </div>
    );
  }
}

export default Navigation;