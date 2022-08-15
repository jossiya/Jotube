import React, { useState } from 'react'
import {Form}from'react-bootstrap'
import { useSelector } from 'react-redux'
function NickName(props) {
  const user=useSelector(state=>state.user)
  const [Value, setValue] = useState(user.userData.nickname)
  const NickNameChange=props.NickNameChange
  const NickNameHandler=(e)=>{
    setValue(e.currentTarget.value)
    NickNameChange(e.currentTarget.value)
  }
  console.log('닉네임')
  return (
    <div>
     <div style={{display : "flex"}}>
        <Form.Label style={{marginTop : "8px"}}>별명</Form.Label>
        <Form.Control type='name' value={Value} placeholder='별명' style={{width : "15rem" ,marginLeft: "1rem"}} onChange={NickNameHandler}/>
    </div>
    </div>
  )
}

export default NickName