import React from 'react'
import Auth from '../../../hoc/auth'
import {Row,Col,Container} from 'react-bootstrap'
import LeftVideo from './Sections/LeftVideo'
import RigthList from './Sections/RigthList'
import './LikedVideoPage.css'
import { useParams } from 'react-router-dom'
function LikedVideoPage() {
    const uid=useParams()
    
    return (
    <div style={{width : "97%", marginTop : "5rem"}}>
        <Row>
            <Col xs={6} lg={3} className='left_page' style={{ background : 'white'}}>
                <LeftVideo uid={uid}/>
            </Col>
            <Col xs={12} lg={9}  className='rigth_page'style={{ height:"100vh", background : '#e9e9e9'}}>
            <RigthList uid={uid}/>
            </Col>
        </Row>
    </div>
    )
}

export default Auth(LikedVideoPage,true)