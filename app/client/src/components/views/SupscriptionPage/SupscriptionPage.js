import moment from 'moment'
import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Auth from '../../../hoc/auth'
// import {Row,Col} from'react-bootstrap'
import {Nav} from 'react-bootstrap'
import{Card,Avatar,Row,Col,Typography}from 'antd'
import './SupscriptionPage.css'
const { Title } = Typography;
const { Meta } = Card;

function SupscriptionPage(props) {
    const user=useSelector(state=>state.user)
    const [Video, setVideo] = useState([])

//   user.userData!== undefined&&user&&user.userData !== null&&user.userData.uid !==undefined
    useEffect(()=>{
    if(user.userData?.uid){
        console.log('시발',user.userData.uid !== null)
        console.log('시발s',user.userData)
        const subscriptionVariable={
        userFrom : user.userData.uid
        }
        console.log('ssdd;',subscriptionVariable)
        axios.post('/api/video/getSubscriptionVideo', subscriptionVariable)
        .then(response=>{
        console.log(response.data)
        if(response.data.success){
            setVideo(response.data.subresponse)
    
        }else{
            alert('구독한 비디오가 없습니다.')
        }
        })
    }
    },[user.userData?.uid])

    const renderCards = Video.map((video, index) => {

    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return <Col className='col-card' key={index} sm ={12} lg={6} md={8}  xs={24} >
            <a href={`/watch/${video.videoid}`} >
            <div  style={{ position: 'relative' }}>
            <img style={{ width: '100%', height : '190px' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnailPath}`} />
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
            title={video.title}
        />
        <Nav.Link href={`/Channel/${video.writer}`} style={{color : "black",marginLeft: '2rem',paddingBottom : "0",fontSize : "0.8rem"}}>{video.nickname}</Nav.Link>
        <span style={{ marginLeft: '3rem',fontSize:"0.8rem" }}> {video.views}</span>
        <span style={{ fontSize:"0.8rem" }}> {moment(video.createdAt).format("YY년 MM월 DD일 hh:mm:ss")} </span>
    </Col>

})
console.log('구독한 비디오',user.userData)

if(user.userData&&user.userData!==null){
    console.log('구독한비디오 랜딩')
    return (
    <div className='subvideo_page' style={{ width: '95%', marginTop: '6rem ' }}>
        <Title level={2} > 구독한 영상 </Title>
        <hr />
        <Row gutter={[16, 16]} style={{ width: '95%'}}>
            {renderCards}
        </Row>
    </div>
)
}else{
    return null;
}



}

export default Auth(SupscriptionPage, true)