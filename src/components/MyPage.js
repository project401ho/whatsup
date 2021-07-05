import React, {useState} from "react";
import {Auth} from 'aws-amplify';
import {Button } from "@material-ui/core";
import {useHistory} from 'react-router-dom'

const MyPage = ({onSignOut,user}) => {
  const history = useHistory()
  
  const [newName,setNewname] = useState("")
  const [changeNickName,setChangeNickName] = useState(false)

  const [oldPassword,setoldPassword] = useState("")
  const [newPassword,setnewPassword] = useState("")
  const [confirmnewPassword,setconfirmnewPassword] = useState("")
  const [ischangePassword,setIsChangePassword] = useState(false)


  const signout = ()=>{
    onSignOut()
    history.push('/')
  }
  
function changePassword (oldPassword,newPassword,confirmnewPassword) {
  if(newPassword !== confirmnewPassword) {
    alert("새로운 비밀번호를 확인하세요")
    return
  }
  Auth.currentAuthenticatedUser()
    .then(user => {
        return Auth.changePassword(user, oldPassword, newPassword);
    })
    .then(() => {
      alert("비밀번호가 변경되었습니다 :)")
      setoldPassword("")
      setnewPassword("")
      setconfirmnewPassword("")
      setIsChangePassword(false)
    })
    .catch(err => console.log(err));
}

function updateUsername (newname) {
  Auth.updateUserAttributes(user, {
    "nickname":newname          
  })
  user.attributes.nickname=newname 
  setChangeNickName(false)
  alert("닉네임이 변경되었습니다 :)")

}
  return (
    <div className="mypage">
      <div className="mypage_info">
        <div className="mypage_id">
          아이디: {user.username}
        </div>
        <div className="mypage_nickname">
          닉네임: 
          {user.attributes ? " " + user.attributes.nickname : null}
          <Button id="changeNickName" color="primary" onClick={()=>setChangeNickName(!changeNickName)}>
            {changeNickName ? "닉네임 변경 취소" : "닉네임 변경"}
          </Button>
          {changeNickName
          ?
          <div>
            <input type="text" placeholder="newname" name="newname" onChange={e=>setNewname(e.target.value)}></input>
            <Button id="changePassword" color="primary" onClick={()=>updateUsername(newName)}>
             닉네임 변경
            </Button>
          </div>
          
          :
            <noscript></noscript>
          }         
        </div>
        <div className="mypage_password">
          비밀번호: ****
          <Button id="ischangePassword" color="primary" onClick={()=>setIsChangePassword(!ischangePassword)}>
            {ischangePassword ? "비밀번호 변경 취소" : "비밀번호 변경"}
          </Button>
          
        </div>
        {
          ischangePassword
          ?
          <form className="mypage_password_change_activated">
            <input type="password" placeholder="현재 비밀번호" name="oldpassword" onChange={e=>setoldPassword(e.target.value)}></input>
            <input type="password" placeholder="새로운 비밀번호" name="newpassword" onChange={e=>setnewPassword(e.target.value)}></input>
            <input type="password" placeholder="새로운 비밀번호 확인" name="confirmnewpassword" onChange={e=>setconfirmnewPassword(e.target.value)}></input>
            <Button id="changePassword" color="primary" onClick={()=>changePassword(oldPassword,newPassword,confirmnewPassword)}>
              비밀번호 변경
            </Button>
          </form>
        :
          null
        }
      </div>    
      <div className="mypage_signout_button">
        <Button id="signoutbutton" color="primary" onClick={signout}>
          로그아웃
        </Button>
      </div>
    </div>
  )
}

export default MyPage