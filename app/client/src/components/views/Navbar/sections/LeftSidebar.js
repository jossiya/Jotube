import React, { useEffect, useState } from 'react'
import {Navbar, Nav,NavDropdown } from 'react-bootstrap'
import {AiOutlineHome,AiOutlineCompass,AiOutlinePlaySquare,AiOutlineLike}from 'react-icons/ai'
import {BsCollectionPlay,BsFilePlay}from 'react-icons/bs' 
import { useSelector } from 'react-redux'
import {Avatar,Card} from 'antd'
import './side.css'
// import Auth from '../../../../hoc/auth'
import axios from 'axios'
const { Meta } = Card;

function LeftSidebar(props) {
      const Display=props.Sdisplay
      const user=useSelector(state=>state.user)
      const [Subscribeds, setSubscribeds] = useState([])
      const NavLink1=[
            {
                  path : "/",
                  icon: <div className="d-flex justify-content-center "><AiOutlineHome  size='25px'/></div>,
                  title : <div style={{width : "100%",textAlign : "center" }}>홈</div>,
            },
            {
                  path : "#/search",
                  icon : <div className="d-flex justify-content-center "><AiOutlineCompass size='25px'/></div>,
                  title : <div style={{width : "100%",textAlign : "center" }}>탐색</div>,
            },
            {
                  path : "/Subscription",
                  icon : <div className="d-flex justify-content-center "><BsCollectionPlay size='25px'/></div>,
                  title : <div style={{width : "100%",textAlign : "center" }}>구독</div>,
            },
      ]
      const NavLink2=[
            {
                  path : "#/store",
                  icon: <div className="d-flex justify-content-center "><BsFilePlay  size='25px'/></div>,
                  title : <div style={{width : "100%",textAlign : "center" }}>보관함</div>,
            },
            {
                  path : `/VideoSetPage/${user.userData?.uid}`,
                  icon: <div className="d-flex justify-content-center "><AiOutlinePlaySquare  size='25px'/></div>,
                  title : <div style={{width : "100%",textAlign : "center" }}>내동영상</div>,
            },
            {
                  path : `/LikedVideoPage/${user.userData?.uid}`,
                  icon: <div className="d-flex justify-content-center "><AiOutlineLike  size='25px'/></div>,
                  title : <div style={{width : "100%",textAlign : "center" }}>좋아요 한 동영상</div>,
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
                              console.log('구독자 명단', response.data.response)
                        }else{
                              alert('구독자 정보를 받아오지 못했습니다.')
                        }
                  })
            }
      }, [user.userData?.uid!==undefined])
      // console.log('구독한 것들',Subscribeds)
      
            return (
                  <>
                        <div className={`${Display? "d-none d-lg-block sticky-sidebar":'d-none'}`}  style={{ display : `none`,width :`${props.show?  '4.5rem ' : '15rem ' }`, marginTop : "-1rem"}}>
                              {console.log('레프트',props.show)}
                              <Navbar className=" d-flex flex-column " bg= 'light' >
                              <Nav className="d-flex flex-column " style={{ width:"100%" }}>
                              {NavLink1.map((page,index)=>(
                                    <Nav.Link key={index}  style={{width:"100%", }} className={`${props.show? "d-flex flex-column ml-n1  ": "d-flex ps-4 ml-n2" } hover`} href={page.path}>
                                    {page.icon} <div className={`d-flex justify-content-center ${props.show?  null: "ps-4"}`} style={{ fontSize : `${props.show? "1px" : "1rem"}`}}>{page.title}</div>
                              </Nav.Link>
                                    ))}
                                    <NavDropdown.Divider style={{ backgroundColor:"rgb(220,220,220)",marginLeft : "15px" ,width :"90%" ,display : `${props.show? "none" : "flex"}`}} />
                              {NavLink2.map((page,index)=>(
                              <Nav.Link key={index}  style={{width:"100%", }} className={`${props.show? "d-flex flex-column ml-n1  ": "d-flex ps-4 ml-n2" } hover`} href={page.path}>
                                    {page.icon} <div className={`d-flex justify-content-center ${props.show?  null: "ps-4"}`} style={{ fontSize : `${props.show? "1px" : "1rem"}`}}>{page.title}</div>
                              </Nav.Link>
                                    ))}
                              <NavDropdown.Divider style={{backgroundColor:"rgb(220,220,220)", marginLeft : "15px" ,width :"90%" ,display : `${props.show? "none" : "flex"}`}} />
                              <div style={{display : `${props.show?'none':''}`,marginLeft:'2rem'}}>
                              <Navbar.Text  >구독</Navbar.Text>
                              {user.userData?.uid&&Subscribeds.map((item,index)=>(
                                    <a key={index} href={`/channel/${item.uid}`}>
                                    <Meta style={{marginTop : "0.5rem"}}
                                    avatar={
                                    <Avatar src={`http://localhost:5000/${item.image}`} />
                                    }
                                    title={<div style={{display:"inline-block", overflow: "hidden", textOverflow: "ellipsis", width:"100%" ,whiteSpace:"nowrap", height: "2em"}}>{item.nickname}</div>}
                              />                                          
                                    </a>

                              ))}
                              {user.userData?.inAuth===false&&<div><a href='/login'>로그인 해주세요</a></div>}
                              </div>
                              
                              </Nav>
                              </Navbar>
                        </div>
                  </>
            )
}

export default LeftSidebar