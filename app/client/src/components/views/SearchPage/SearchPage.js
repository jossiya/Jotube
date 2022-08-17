import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Auth from '../../../hoc/auth'
import {Row,Col} from 'react-bootstrap'
import './SearchPage.css'
import { useLocation } from 'react-router-dom'

function SearchPage(props) {
    const location=useLocation()
    const [Search, setSearch] = useState([])
    const [Videos, setVideos] = useState([])
    let params = new URLSearchParams(location.search)

    console.log('불러올 비디오',params.get('search'))
    useEffect(() => {
        
        let data =params.get('search');
        axios.post('/api/video/search')
        .then(response=>{
            if(response.data.success){
                console.log('검색 비디오 모든 정보',response.data.videos)
                setVideos(response.data.videos)
                if(data){ 
                    let filterData = Videos.filter((i) =>
                    i.title.toLowerCase().includes(data.toLowerCase()) 
                    );
                    if (data.length === 0) {
                        filterData = [];
                    }
                    setSearch(filterData);
            }
                
            }else{
                alert('비디오 검색 정보 받아오지 못했습니다.')
            }
        })
        
    }, [props])

    console.log('불러올 비디오',Search)
         const  SearchVideo=Search.map((video,index)=>{
            var minutes = Math.floor(video.duration / 60);
            var seconds = Math.floor(video.duration - minutes * 60);
            return <div key={index} style={{width:"100%",display:'flex',marginLeft: "6rem", paddingRight: '2rem'}}>
                <div style={{width:'400px' ,height:"200px", marginBottom:'1rem'}}>
                    <a href={`/watch/${video.videoid}`}>
                        <img style={{width:"100%" ,height : '100%'}} src={`http://localhost:5000/${video.thumbnailPath}`} alt='thumnail'/>
                    </a>
                </div>    
                <div style={{width:'700px', marginLeft:'1rem'}}>
                    <a href={`/watch/${video.videoid}`}style={{display:'flex',fontSize : "0.9rem" ,flexDirection:'column', textDecorationLine:'none', color:'gray'}}>
                        <div className='title' style={{fontSize:'1.6rem', color:'black'}}>{video.title}</div>
                        <span> 조회수 {video.views}</span>
                        
                        <span style={{paddingTop : "1rem"}}>{video.nickname}</span>
                        <div className='description' style={{paddingTop : "1rem"}}>{video.description}</div>
                        <span>{minutes} : {seconds} </span>
                    </a>
                </div>
            </div>
        })

    return (
        <div className='search_page' style={{ width: '95%', marginTop: '6rem ' }}>
            <hr/>
            <Row>
                {SearchVideo}   
            </Row>
        </div>
    )
}

export default Auth(SearchPage,null)