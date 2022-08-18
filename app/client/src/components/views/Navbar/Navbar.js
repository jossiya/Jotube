import React, {useState} from 'react';
import {Nav,Container,Navbar,Col,Row}from 'react-bootstrap';
import LeftOffcanvas from './sections/LeftOffcanvas';
import LeftSidebar from './sections/LeftSidebar';
import RightSidebar from './sections/RightSidebar';
import SearchBar from './sections/SearchBar';
import{AiOutlineMenu}from 'react-icons/ai';
import {useSelector}from 'react-redux';
import "./sections/side.css";
import { useNavigate } from 'react-router-dom';
const Logo = require('../../../assets/images/jotube.png');

function NavBar(props) {
  const user=useSelector(state=>state.user);

  // const handleSideClose = ()=>setsideShow(true);
  const navigate=useNavigate();
  
  // console.log("나브")
  const [sideShow, setsideShow] = useState(false);

  const loginUnReroad=(e)=>{
    e.preventDefault();
    navigate('/login')
    props.show(true)
  };
  const registerUnReroad=(e)=>{
    e.preventDefault();
    navigate('/register')
    props.show(true)
  }
  const ShowSide=(show)=>{
    console.log(show)
    setsideShow(show)
  }
  const SideBarCtrl=(e)=>{
    e.preventDefault()
    props.show(!sideShow)
    setsideShow(!sideShow)
  }
  console.log('나브바 싸이드 논',props.Sdisplay)
  if(user.userData){
    console.log(user.userData)
    console.log("나브0.5",user.userData&&!user.userData.isAuth)
    if(user.userData&&!user.userData.isAuth){
      console.log("나브1",user.userData&&!user.userData.isAuth)
      return (
        <>
        {/*expand="lg"*/}
        <Navbar key="lg" bg="light"  className="mb-3" fixed='top'>
          <Container fluid>
            <div className='d-flex' style={{marginLeft :"-15px"}}>
            {props.Sdisplay&&<AiOutlineMenu  className='d-none d-lg-block' style={{margin :"8px"}}  onClick={SideBarCtrl} size='2rem'/>}
              {/* 사이드 오프켄버스 */}
              <LeftOffcanvas Sdisplay={props.Sdisplay}/>
              <Navbar.Brand href="/"><img src={Logo} alt="Logo" style={{ width: '150px',marginLeft : "10px", marginTop: '-5px' }} /></Navbar.Brand>
            </div>
            {/* 검색 기능 */}
            <Nav>
            <SearchBar/>
            </Nav>
            <div className='d-flex'>
              <Nav>
                <Nav.Link eventKey={1} href='#/register' onClick={registerUnReroad}>회원가입</Nav.Link>
                <Nav.Link eventKey={2} href="#/login" onClick={loginUnReroad}> 
                  로그인
                </Nav.Link>
              </Nav>
            </div>
          </Container>
        </Navbar>
        </>
      ) 
    }else{
      console.log("나브2",props.Sdisplay)
      return (
        <>
        <Navbar key="lg" bg="light"  className="mb-3" fixed='top'  >
          <Container fluid style={{display:'flex',width : '100%'}}>
            <Nav className='d-flex' style={{marginLeft :"-15px"}}>
            {props.Sdisplay&&<AiOutlineMenu  className='d-none d-lg-block' style={{margin :"8px"}}  onClick={SideBarCtrl} size='2rem'/>}
            
              {/* 사이드 오프켄버스 */}
              <LeftOffcanvas Sdisplay={props.Sdisplay} />
              <Navbar.Brand href="/"><img src={Logo} alt="Logo" style={{ width: '150px',marginLeft : "10px", marginTop: '-5px' }} /></Navbar.Brand>
            </Nav>
            {/* 검색 기능 */}
            <Nav style={{width : '70%'}}>
            <SearchBar/>
            </Nav>
            {/* 오른쪽 사이드바 */}
            <Nav>
              <RightSidebar LeftShow={ShowSide}/>
            </Nav>
          </Container>
        </Navbar>
        </>
      ) 
    }
  }else{
    return null;
  }
}
export default React.memo(NavBar)
