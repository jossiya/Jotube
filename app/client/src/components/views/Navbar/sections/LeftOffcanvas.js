import React, { useEffect, useState } from 'react'
import { Offcanvas,Button,Nav,NavDropdown,Navbar } from 'react-bootstrap';
import{AiOutlineMenu,AiOutlineHome,AiOutlineCompass,AiOutlinePlaySquare,AiOutlineLike}from 'react-icons/ai'
import {BsCollectionPlay,BsFilePlay}from 'react-icons/bs'
import { useSelector } from 'react-redux';
import {Avatar,Card} from 'antd'
import './side.css'
import axios from 'axios';
const Logo=require('../../../../assets/images/jotube.png')
const { Meta } = Card;
function LeftOffcanvas(props) {
  const user=useSelector(state=>state.user)
  const [Subscribeds, setSubscribeds] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const mediaQuary={
    basic : "d-lg-none",
    video : null
    };
    const NavLink1=[
      {
            path : "/",
            icon: <div className="d-flex justify-content-center "><AiOutlineHome  size='25px'/></div>,
            title : "홈",
      },
      {
            path : "#/search",
            icon : <div className="d-flex justify-content-center "><AiOutlineCompass size='25px'/></div>,
            title : "탐색",
      },
      {
            path : "/Subscription",
            icon : <div className="d-flex justify-content-center "><BsCollectionPlay size='25px'/></div>,
            title : "구독",
      },
]
const NavLink2=[
  {
        path : "#/store",
        icon: <div className="d-flex justify-content-center "><BsFilePlay  size='25px'/></div>,
        title : "보관함",
  },
  {
        path : `/VideoSetPage/${user.userData?.uid}`,
        icon : <div className="d-flex justify-content-center "><AiOutlinePlaySquare size='25px'/></div>,
        title : "내 동영상",
  },
  {
        path : `/LikedVideoPage/${user.userData?.uid}`,
        icon : <div className="d-flex justify-content-center "><AiOutlineLike size='25px'/></div>,
        title : "좋아요 한 동영상",
  },
]
useEffect(() => {
  const variable={
        userFrom : user.userData?.uid
  }
  console.log('sub',variable)
  if(user.userData?.uid!==undefined){
        axios.post("/api/subscriber",variable)
        .then(response=>{
              if(response.data.success){
                    setSubscribeds(response.data.response)
              }else{
                    alert('구독자 정보를 받아오지 못했습니다.')
              }
        })
  }
}, [user.userData?.uid!==undefined])
  
  if(true){
    return (
      <div className={`${props.Sdisplay?"d-lg-none":'d-flex'}`}>
        <AiOutlineMenu style={{margin :"8px" }} onClick={handleShow} size='2rem'/>
        <Offcanvas  show={show} onHide={handleClose} style={{width : "15rem"}}>
        <Offcanvas.Header >
          <div className='d-flex'>
          <AiOutlineMenu style={{marginLeft :"5px", marginTop:"4px" }}  onClick={handleClose} size='2rem'/>
          <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`} >
          <Nav.Link href="/">
          <img  src={Logo} alt="Logo" style={{ width: '150px',  marginTop: '-13px' }} />
          </Nav.Link>
          </Offcanvas.Title>
          </div>
          
          </Offcanvas.Header>
          <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3 ">
          {NavLink1.map((page,index)=>(
            <Nav.Link key={index} style={{width:"100%", }} className={ "d-flex ps-1 text-secondary hover" }  href={page.path}>
             {page.icon} <div className="d-flex justify-content-center mx-3 " style={{fontSize : "1rem"}}>{page.title}</div>
           </Nav.Link>
            ))}
            <NavDropdown.Divider style={{backgroundColor : "rgb(220,220,220)"}} />
            {NavLink2.map((page,index)=>(
            <Nav.Link key={index} style={{width:"100%", }} className={ "d-flex ps-1 text-secondary hover" }  href={page.path}>
             {page.icon} <div className="d-flex justify-content-center mx-3 " style={{fontSize : "1rem"}}>{page.title}</div>
           </Nav.Link>
            ))}
            <NavDropdown.Divider style={{backgroundColor : "rgb(220,220,220)"}}/>
            <Navbar.Text className='fcg'>구독</Navbar.Text>
            {user.userData?.uid&&Subscribeds.map((item,index)=>(
                                    <a key={index} href='#'>
                                      <Meta  style={{marginTop : "0.5rem"}}
                                    avatar={
                                    <Avatar src={`http://localhost:5000/${item.image}`} />
                                    }
                                    title={<div style={{display:"inline-block", overflow: "hidden", textOverflow: "ellipsis", width:"100%" ,whiteSpace:"nowrap", height: "2em"}}>{item.nickname}</div>}
                                    />
                                    </a>
                              ))}
                              {user.userData?.inAuth===false&&<div><a href='/login'>로그인 해주세요</a></div>}
          </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    )
  }else{

  }
  
}

export default LeftOffcanvas