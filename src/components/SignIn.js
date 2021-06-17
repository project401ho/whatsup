import React, {useState} from "react";
import {Auth} from 'aws-amplify';
import {Button, TextField } from "@material-ui/core";
import {useHistory} from 'react-router-dom'

const SignIn = ({onSignIn}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const history = useHistory()
  
  const signIn = async () => {
    try{
      const user = await Auth.signIn(username, password)
      history.push('/')
      onSignIn(user)
    } catch(error){
      if(error.code === "UserNotFoundException"){
        alert("등록되지 않은 유저 입니다.")
      }
      console.log("error in signing in 123", error);
    }
  }
  const signUp = async () => {
    try{
      await Auth.signUp(username, password, email)
        .then(()=>{
          signIn()
        })
        .catch((error)=>{
          if(error['code'] === "UsernameExistsException"){ 
            alert("이미 등록된 유저입니다.")
          }
          else{
            console.log(error);
          }
        })
      
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
        <TextField
        id="email"
        label = "E-mail"
        type="email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
      />
      </div>
      <div>
      <Button id="signInButton" color="primary" onClick ={signIn}>
        로그인
      </Button>
      <Button id="signUpButton" color="primary" onClick ={signUp}>
        가입하기
      </Button>
      </div>
    </div>
  )
}

export default SignIn