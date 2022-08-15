
import React, { useEffect, useState } from 'react'
import Auth from '../../../hoc/auth'
import{Row, Col, List, Avatar} from'antd'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SideVideo from './Section/SideVideo'
import Subscribe from './Section/Subscribe'
import Comment from './Section/Comment'
import LikeDisLikes from './Section/LikeDisLikes'
import { useSelector,shallowEqual } from 'react-redux'
import './VideoDetailPage.css'
function VideoDetailPage(props) {
    const Sdisplay=props.Sdisplay
    const {user} = useSelector(
    (state) => ({
        user: state.user.userData
    }),
    shallowEqual
    );

    const videoid= useParams()
    const variable={
        videoid :videoid
    }
    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])
    
    useEffect(() => {
        //sidebar 없애기
        Sdisplay(false)
      axios.post('/api/video/getVideoDetail',variable)
      .then(response=>{
        if(response.data.success){
            console.log('detail:',response.data)
            
            setVideoDetail(response.data.video)
        }else{

            alert('영상을 받아오지 못했습니다.')
        }
      });

      axios.post('/api/comment/getComment',variable)
      .then(response=>{
        if(response.data.success){
          setComments(response.data.comments)
          // console.log(response.data.comments)
        }else{
          alert('코맨트 정보를 가져오지 못했습니다.')
        }
    })
    
    },[])
    const refreshFunction=(newComment)=>{
      setComments(Comments.concat(newComment))
    }

    if (user) {
      console.log('프롭스 uid:',props.user.uid)
      if(VideoDetail.writer) {

      const subscribeButton= VideoDetail.writer!==props.user.uid&&props.user.uid&& <Subscribe userTo={VideoDetail.writer} userFrom={props.user.uid} />
    
      console.log('디테일 정보:',VideoDetail)
      return(
        <div style={{width : "100%"}}>
          <Row gutter={[16, 16]}>
            <Col lg={17} xs={24}>
              
            <div  id='detail-main' style={{width:'100%',padding : '3rem 0',paddingLeft:"2rem",marginTop :'1rem' }} >
            <video  style={{ width: '98%' ,height:"600px"}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls autoPlay loop={true} muted={false}></video>
            <div className='d_title'>{VideoDetail.title}</div>
                <List.Item 
                    actions={[<LikeDisLikes video userId={props.user.uid} videoId={videoid}/>,subscribeButton]}
                >
                <a></a>
                <List.Item.Meta
                avatar={<Avatar src={`http://localhost:5000/${VideoDetail.image}`}/>}
                title={<a style={{textDecoration : "none"}} href={"#"}>{VideoDetail.name}</a>}
                description={<div className='d_description'>{VideoDetail.description}</div>}
                />
                </List.Item>
                {/* Comments */}
                <Comment refreshFunction={refreshFunction} commentList={Comments} userFrom={props.user.uid} />
            </div>
            </Col>
            <Col lg={7} xs={24}>
                <SideVideo/>
            </Col>
    
        </Row>
        </div>
        
      )
    }
    else {
      return (
          <div>Loading...</div>
      )
  }
    } else {
      return null
  }
    

  
    
}

export default Auth(VideoDetailPage, null)