import React, {useState} from "react";
import {Auth} from 'aws-amplify';
import {Button, TextField } from "@material-ui/core";
import {useHistory, Link} from 'react-router-dom'

const SignIn = ({onSignIn}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
      if(error.code === "NotAuthorizedException"){
        alert("ID 혹은 비밀번호를 다시 확인해주세요")
      }
      console.log("error in signing in 123", error);
    }
  }

  return (
    <div className="signin">
      <div>
      <TextField
        id="username"
        label = "아이디"
        value={username}
        onChange={e=>setUsername(e.target.value)}
      />
      </div>
      <div>
      <TextField
        id="password"
        label = "비밀번호"
        type="password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
      />      
      </div>
      <div>
      <Button id="signInButton" color="primary" onClick ={signIn}>
        로그인
      </Button>
      <Link to="/signup">
        <Button id="signUpButton" color="primary">
          가입하기
        </Button>
      </Link>
      </div>
    </div>
  )
}

export default SignIn