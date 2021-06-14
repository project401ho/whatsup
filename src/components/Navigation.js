import {Component} from 'react';

class Navigation extends Component {
  render(){
    return (
      <div className="navigation">
          <h1 className="navigation_title"><a href="/" onClick={(e)=>{
            e.preventDefault()
            this.props.home()
          }}>Whats UP</a></h1>
          <ul className="navigation_buttons_holder">
              <li className="navigation_button_li"><input className="navigation_button" type="button" value="My"></input></li>
              <li className="navigation_button_li"><input className="navigation_button" type="button" value="Write"></input></li>
          </ul>
      </div>
    );
  }
}

export default Navigation;