import React from "react";
// import {Auth} from 'aws-amplify';
import {Button } from "@material-ui/core";
import {useHistory} from 'react-router-dom'

const MyPage = ({onSignOut, user}) => {
  const history = useHistory()
  
  const signout = ()=>{
    onSignOut()
    history.push('/')
  }

  return (
    <div className="signin">
      <p>유저 ID: {user.username}</p>
      {/* <p>유저 닉네임: {user.username}</p> */}
      <Button id="signoutbutton" color="primary" onClick={signout}>
        Sign Out
      </Button>
    </div>
  )
}

export default MyPage