import React, { useState } from 'react'
import Auth from '../../../hoc/auth'
import { useLocation } from "react-router";
import {Tabs,Tab} from 'react-bootstrap'
import VideoSet from './sections/VideoSet'
import './sections/videoset.css'
function UploadPage(props) {
  // const {state}=useLocation()
  return (
    <div id="video-set" style={{marginTop : "5rem", width : "98%"}}>
        <h1 style={{fontSize : '2rem',paddingBottom:'20px'}}>
        채널 콘텐츠
        </h1>
        <Tabs defaultActiveKey="video"
              transition={false}
              id="noanim-tab-example"
              className="mb-3">
          <Tab eventKey="video" title="동영상">
            <VideoSet style={{}}/>
          </Tab>
          <Tab eventKey="live streaming" title="실시간 스트리밍">
            <div>실시스트리밍</div>
          </Tab>
        </Tabs>
    </div>
  )
}

export default Auth(UploadPage,true)