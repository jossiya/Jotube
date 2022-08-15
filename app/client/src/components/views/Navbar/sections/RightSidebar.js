import React, { useEffect, useState } from 'react'
import {Nav,NavDropdown,Figure,Image,Container,Navbar}from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom";
import {logoutUser}from '../../../../_actions/user_actions'
import{AiOutlineUpload,AiOutlineVideoCameraAdd}from 'react-icons/ai'
import{RiVideoLine}from 'react-icons/ri'
import UploadModalDropzon from '../../UploadPage/sections/UploadModal'
import{List, Avatar} from'antd'

function RightSidebar(props) {
  const user= useSelector(state=>state.user)
  const dispatch=useDispatch();
  const navigate=useNavigate(); 
  const LogoutHandle=(e)=>{
    e.preventDefault()
    dispatch(logoutUser())
    .then(response=>{
      console.log('로그아웃 정보:',response)
      if(response.payload.success){
        navigate('/login')
        props.LeftShow(true)
      }else{
        alert('로그아웃에 실패했습니다.')
      }
    })
  };

  // const sidebarHandle=(e)=>{
  //   props.LeftShow(true)
  // };
  
  //업로드 모달 컨트롤러
  const [UpLoadCtrl, setUpLoadCtrl] = useState(false)
  const uploadHandle=(e)=>{
      navigate(`/VideoSetPage/${user.userData.uid}`);
      e.preventDefault()
      setUpLoadCtrl(true)
      // console.log('test')
  };
  console.log('업로드 블론:',UpLoadCtrl)
  console.log('라이트',user.userData.image)
  return (
    <div className='d-flex' >
        {/* 업로드 */}
        <UploadModalDropzon show={UpLoadCtrl} HideGet={setUpLoadCtrl}/>
          <NavDropdown 
                    align="end" 
                    title={<AiOutlineVideoCameraAdd size="2rem" style={{color : 'black'}} />}
                    id="dropdown-basic"
                    >
            <NavDropdown.Item href={`/VideoSetPage/${user.userData.uid}`} onClick={uploadHandle} >
                <RiVideoLine style={{marginBottom : "4px"}} size={'3vh'} /> 동영상 업로드
            </NavDropdown.Item>
          </NavDropdown>
          
        {/* 내 정보 및 설정   */}
          <NavDropdown 
                align="end" 
                title={<Image
                style={{width : "45px" ,height: "45px" , marginTop:"-5px", borderRadius: '10rem'}}
                src={`http://localhost:5000/${user.userData.image}`}
                // roundedCircle
                  />}
                id="dropdown-basic">
              <List.Item.Meta
                      avatar={<Avatar style={{marginLeft : '1rem'}} src={`http://localhost:5000/${user.userData.image}`}/>}
                      title={user.userData.userName}
                      description={<a href={`/User/${user.userData.uid}`}>계정관리</a>}
                    />
              <NavDropdown.Divider style={{backgroundColor:"rgb(220,220,220)",}} />

              <NavDropdown.Item href={`/Channel/${user.userData.uid}`}>
                내채널
              </NavDropdown.Item>
              <NavDropdown.Item href={`/VideoSetPage/${user.userData.uid}`}>
                채널 콘텐츠
              </NavDropdown.Item>
              <NavDropdown.Item href="/logout" onClick={LogoutHandle}>
                로그아웃
              </NavDropdown.Item>
              <NavDropdown.Divider style={{backgroundColor:"rgb(220,220,220)",}} />

              <NavDropdown.Item href="#action/3.4">
                설정
              </NavDropdown.Item>
              <NavDropdown.Divider style={{backgroundColor:"rgb(220,220,220)",}} />
          </NavDropdown>
      
    </div>
  )
}

export default RightSidebar