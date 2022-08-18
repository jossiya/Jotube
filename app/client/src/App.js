import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Suspense, useState } from 'react';
import {Col,Row}from 'react-bootstrap'
import Navbar from"./components/views/Navbar/Navbar"
import LandingPage from"./components/views/LandingPage/LandingPage"
import LoginPage from"./components/views/LoginPage/LoginPage"
import RegisterPage from"./components/views/RegisterPage/RegisterPage"
import VideoSetPage from './components/views/UploadPage/VideoSetPage';
import LeftSidebar from './components/views/Navbar/sections/LeftSidebar';
import UploadDetailPage from './components/views/UploadPage/UploadDetailPage/UploadDetailPage';
import VideoDetailPage from './components/views/VideoDetailPage/VideoDetailPage';
import SubscriptionPage from './components/views/SupscriptionPage/SupscriptionPage'
import SearchPage from './components/views/SearchPage/SearchPage';
import User from './components/views/User/User';
import Channel from './components/views/Channel/Channel';
import LikedVideoPage from './components/views/LikedVideoPage/LikedVideoPage';





function App() {
  {console.log("render-")}
  const [SideCtrl, setSideCtrl] = useState(false)
  const [SideNone,setSideNone]=useState(true)
  // 기본 사이드 바 접기 펴기 정하기
  const SideBarCtrl=(show)=>{
    setSideCtrl(show)
  }
  //기본 사이드바 디스플레이 논 하고 오프켄버스 꺼내기
  const SideBarNone=(show)=>{
    setSideNone(show)
  } 
  return (
    <Suspense fallback={(<div>Loding....</div>)}>
      <Router>
      <Navbar show={SideBarCtrl} Sdisplay={SideNone}/>
      <Row>
        {SideNone&&<Col lg={`${SideCtrl? "1" :"2"}`}  style={{padding : 0 }}>
        
          <LeftSidebar show={SideCtrl} Sdisplay={SideNone}/>
        </Col>}
        <Col  lg={`${SideCtrl? "11" :"10"}`} style={{padding : 0}}>
          <Routes>
          <Route path="/" element={<LandingPage Sdisplay={SideBarNone}/>} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/VideoSetPage/:uid" element={<VideoSetPage/>}/>
          <Route path="/UploadSetPage/:videoid" element={<UploadDetailPage/>}/>
          <Route path="/watch/:videoid" element={<VideoDetailPage Sdisplay={SideBarNone}/>}/>
          <Route exact path="/Subscription" element={<SubscriptionPage/>}/>
          <Route exact path="/video/result" element={<SearchPage/>}/>
          <Route exact path="/User/:uid" element={<User/>}/>
          <Route exact path="/Channel/:uid" element={<Channel/>}/>
          <Route exact path="/LikedVideoPage/:uid" element={<LikedVideoPage/>}/>
          </Routes>
        </Col>
      </Row>
    </Router>
  </Suspense>
  );
}

export default App;
