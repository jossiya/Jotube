import React, { useEffect, useState } from 'react'
import Auth from '../../../hoc/auth'
import{Tabs,Tab,Form} from 'react-bootstrap'
import{List, Avatar} from'antd'
import { useSelector } from "react-redux";
import ChannelHome from './Sections/ChannelHome'
import ChannelVideo from './Sections/ChannelVideo';
import ChannelSet from './Sections/ChannelSet';
import "./Channel.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';
function Channel() {
  const uid= useParams()
  const user=useSelector(state=>state.user)
  const [SubscribedNumber, setSubscribedNumber] = useState("0")
  const [UserInfo, setUserInfo] = useState([])
  useEffect(() => {
    const variable={
      userTo : uid.uid
    }
    axios.post('/api/Channel/userInfo',variable)
    .then(response=>{
      if(response.data.success){
        setUserInfo(response.data.userInfo)
      }else{
        alert('채널 유져 정보를 받아 오지 못했습니다.')
      }
    })
    axios.post('/api/Channel/Subscribers',variable)
    .then(response=>{
      if(response.data.success){
        setSubscribedNumber(response.data.subscribeNumber)
        
      }else{
        alert('구독자 정보를 받아오지 못했습니다.')
      }
    })
  }, [])
  console.log(UserInfo)
if(user&&user.userData){
  console.log(user.userData.uid)
  console.log(uid.uid)
  if(uid.uid){
    return (
      <div style={{width : "100%", marginTop : "3rem"}}>
          <div>
              <List.Item.Meta style={{width : "100%" , padding : '3rem 6rem'}} 
                            avatar={<Avatar style={{marginLeft : '1rem'}}src={`http://localhost:5000/${UserInfo.image}`} size={80}/>}
                            title={<div style={{fontSize: '30px'}}>{UserInfo.nickname}</div>}
                            description={`구독자 ${SubscribedNumber}명`}
                          />
      <div style={{width : "100%" , padding : '1rem 6rem'}} >
      <Tabs margin='auto'
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        className="mb-3 w-8 tab"

          >
        <Tab eventKey="home" title="홈">
        <ChannelHome userUid={uid}/>
        </Tab>
        <Tab eventKey="video" title={"동영상"} >
        <ChannelVideo userUid={uid}/>
        </Tab>
        <Tab eventKey="channel" title="채널">
          <ChannelSet/>
        </Tab> 
        </Tabs>
        </div>
          </div>
        </div>
        )
    }else{
      alert("존재하지 않는 페이지 입니다.")
    }
  }else{
      return null;
  }
}

export default Auth(Channel,null)