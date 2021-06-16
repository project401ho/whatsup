import React, {useState} from "react";
import {Auth} from 'aws-amplify';
import {Button, TextField } from "@material-ui/core";
import {useHistory} from 'react-router-dom'

const SignIn = ({onSignIn, onSignUp}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  
  const signIn = async () => {
    try{
      const user = await Auth.signIn(username, password)
      history.push('/')
      onSignIn(user)
    } catch(error){
      console.log("error in signing in", error);
    }
  }
  const signUp = async () => {
    try{
      const user = await Auth.signUp(username, password)
    }catch (error){
      console.log("error in signing up", error);
    }
  }

  return (
    <div className="signin">
      <div>
      <TextField
        id="username"
        label = "Username"
        value={username}
        onChange={e=>setUsername(e.target.value)}
      />
      </div>
      <div>
      <TextField
        id="password"
        label = "Password"
        type="password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
      />
      </div>
      <div>
      <Button id="signInButton" color="primary" onClick ={signIn}>
        로그인
      </Button>
      <Button id="signUpButton" color="primary" onClick ={signIn}>
        가입하기
      </Button>
      </div>
    </div>
  )
}

export default SignIn