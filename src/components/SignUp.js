import React, {useState} from "react";
import {Auth} from 'aws-amplify';
import {Button, TextField } from "@material-ui/core";
import {useHistory} from 'react-router-dom'

const SignUp = ({onSignIn}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
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
      await Auth.signUp({
        username: username, 
        password: password, 
        attributes:{
          email: email, 
          nickname: nickname
        }
      })
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
        <TextField
        id="email"
        label = "이메일 주소"
        type="email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
      />
      
      </div>
      <div>
        <TextField
        id="nickname"
        label = "닉네임"
        type="nickname"
        value={nickname}
        onChange={e=>setNickname(e.target.value)}
      />
      </div>
      <div>
      <Button id="signUpButton" color="primary" onClick ={()=>history.push("/signin")}>
        뒤로가기
      </Button>
      <Button id="signUpButton" color="primary" onClick ={signUp}>
        가입하기
      </Button>
      </div>
    </div>
  )
}

export default SignUp