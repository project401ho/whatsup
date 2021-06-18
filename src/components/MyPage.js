import React from "react";
// import {Auth} from 'aws-amplify';
import {Button } from "@material-ui/core";
import {useHistory} from 'react-router-dom'

const MyPage = ({onSignOut}) => {
  const history = useHistory()
  
  const signout = ()=>{
    onSignOut()
    history.push('/')
  }

  return (
    <div className="signin">
      <Button id="signoutbutton" color="primary" onClick={signout}>
        Sign Out
      </Button>
    </div>
  )
}

export default MyPage