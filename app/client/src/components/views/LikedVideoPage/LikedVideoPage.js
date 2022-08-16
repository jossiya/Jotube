import React, { useEffect, useState } from 'react'
import Auth from '../../../hoc/auth'
import {Row,Col,Container} from 'react-bootstrap'
import LeftVideo from './Sections/LeftVideo'
import RigthList from './Sections/RigthList'
import './LikedVideoPage.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
function LikedVideoPage() {
    const uid=useParams()
    const user=useSelector(state=>state.user.userData)
    const [LikedVideo, setLikedVideo] = useState([])
    const variable={
        uid:uid
    }
    useEffect(() => {
        axios.post('/api/LikedVideo',variable)
        .then(response=>{
        if(response.data.success){
            console.log('vidoe들',response.data.VideoInfos)
            setLikedVideo(response.data.VideoInfos)
        }else{
            alert('좋아요한 비디오를 불러오지 못했습니다.')
            }
        })
    }, [])
    return (
    <div className='l_page' style={{width : "97%", marginTop : "5rem"}}>
        <Row>
            <Col xs={6} lg={3} className='left_page' style={{ background : 'white'}}>
                <LeftVideo user={user} videos={LikedVideo}/>
            </Col>
            <Col xs={12} lg={9}  className='rigth_page'style={{ height:"100vh", background : '#e9e9e9' }}>
            <RigthList user={user} videos={LikedVideo}/>
            </Col>
        </Row>
    </div>
    )
}

export default Auth(LikedVideoPage,true)