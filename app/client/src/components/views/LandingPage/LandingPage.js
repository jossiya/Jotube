import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import Auth from '../../../hoc/auth'
import {Row,Col,Nav} from 'react-bootstrap'
import {Avatar,Card} from 'antd'
import 'antd/dist/antd.css'
import './LandingPage.css'
const { Meta } = Card;

  function LandingPage(props) {
    const Sdisplay=props.Sdisplay
    const [Video, setVideo] = useState([])
  
    useEffect(()=>{
      Sdisplay(true)
      axios.get('/api/video/getVideos')
      .then(response=>{
        console.log('비디오 정보들',response.data)
        if(response.data.success){
          setVideo(response.data.videos)
    
        }else{
          alert('비디오를 가져올 수 없습니다.')
        }
      })
    },[])
    
    const renderCards = Video.map((video, index) => {
      var minutes = Math.floor(video.duration / 60);
      var seconds = Math.floor(video.duration - minutes * 60);
        return(
            <Col className='col-card' key={index} sm ={6} lg={3} md={4}  xs={24} style={{ display : `${video.privacy===1?'':"none"}`,marginBottom : '1rem'}}>
            <a href={`/watch/${video.videoid}`} >
            <div  style={{ position: 'relative' }}>
            <img style={{ width: '100%', height: "190px"}} alt="thumbnail" src={`http://localhost:5000/${video.thumbnailPath}`} />
            <div className=" duration"
                style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                fontWeight:'500', lineHeight:'12px' }}>
                <span>{minutes} : {seconds}</span>
            </div>
            </div>
            </a>
        <br />
        <Meta 
            avatar={
                <Avatar src={`http://localhost:5000/${video.image}`} />
            }
            title={<div className='l_title' >{video.title}</div>}
        />
        <Nav.Link href={`/Channel/${video.writer}`} style={{color : "black",marginLeft: '2rem',paddingBottom : "0",fontSize : "0.8rem"}}>{video.nickname}</Nav.Link>
        <span style={{ marginLeft: '3rem',fontSize : "0.8rem"  }}> 조회수 {video.views}회 </span>
        <span style={{ fontSize : "0.8rem"  }}> {moment(video.in_date).format("YY년 MM월 DD일 hh:mm:ss")} </span>
          </Col>
          )
          })
  return (
    <div className='landig_page' style={{ width: '95% ', marginTop: '6rem ',} }>
        <div>
        <div className='d-flex justify-content-between'>
          <div>
            <h1 style={{marginLeft : '1rem'}}>JOTUBE</h1>
          </div>
        </div>
        <hr />
        <Row>
        {renderCards}
        </Row>
        </div>
    </div>
  )
}

export default Auth(LandingPage,null)
