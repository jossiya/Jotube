import React, { useEffect, useState } from 'react'
import {Card,Row,Col} from 'react-bootstrap'
import axios from 'axios';
import '../Channel.css'
function ChannelHome(props) {
    const [Video, setVideo] = useState([])

    useEffect(() => {
    const variable={
        uid : props.userUid
    }
    axios.post('/api/channel/video',variable)
    .then(response=>{
        if(response.data.success){
        console.log(response.data)
        console.log(response.data.response)
        setVideo(response.data.response)
        }else{
        alert('내 채널에 동영상을 받아오지 못했습니다.')
        }
    })
    }, [])

    const renderCards = Video.map((video, index) => {

    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);
        return <Col key={index} sm ={6}lg={2} md={{ span: 4}} xs={6}>
            <a href={`/watch/${video.videoid}`} style={{textDecoration:'none', color :"black",  }} >
            <Card border="light" style={{margin : "-10px"}} >
                <div style={{position : "relative"}}>
                    <Card.Img variant="top" src={`http://localhost:5000/${video.thumbnailPath}`}/>
                    <div className=" duration"
                        style={{ bottom: '0', right:0, position: 'absolute', margin: '0px', 
                        color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                        padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                        fontWeight:'500', lineHeight:'12px' }}>
                        <span>{minutes} : {seconds}</span>
                    </div>
                </div>
            <Card.Body>
                <Card.Title className='c_title' style={{fontSize : "1rem"}}>{video.title} </Card.Title>
                </Card.Body>
            </Card>
            </a>
        </Col>
        })
    console.log(Video)
    return (
    <div>
        <div className='d-flex justify-content-between'>
            <div>
                업로드한 비디오
            </div>
        </div>
        <br/>
        <br/>
        <Row>
        {renderCards}
        </Row>
    </div>
    )
}

export default ChannelHome