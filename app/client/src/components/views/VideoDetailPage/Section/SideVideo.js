import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../VideoDetailPage.css'
function SideVideo() {

    
    const [sideVideos, setsideVideos] = useState([])
    
  useEffect(()=>{
    axios.get('/api/video/getVideo')
    .then(response=>{
      console.log(response.data)
      if(response.data.success){
        setsideVideos(response.data.videos)
  
      }else{
        alert('비디오를 가져올 수 없습니다.')
      }
    })
  },[])
    
  const renderSideVideo=sideVideos.map((video,index)=>{
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);
    return <div key={index} style={{width:"100%",display:'flex', paddingRight: '2rem' ,marginLeft : "2rem"}}>
        <div style={{width:'400px', marginBottom:'1rem'}}>
            <a href={`/watch/${video.videoid}`}>
                <img style={{width:"100%" ,height : '120px'}} src={`http://localhost:5000/${video.thumbnailPath}`} alt='thumnail'/>
            </a>
        </div>    
        <div style={{width:'100%', marginLeft:'1rem'}}>
            <a href={`/watch/${video.videoid}`}style={{display:'flex', flexDirection:'column', textDecorationLine:'none', color:'gray'}}>
                <div className='side_title' style={{width:'90%',fontSize:'1rem', color:'black'}}>{video.title}</div>
                <span>{video.nickname}</span>
                <span>{video.views} views</span>
                <span>{minutes} : {seconds} </span>
            </a>
        </div>
    </div>
  })

  return (
    <React.Fragment>
        <div style={{marginTop:'5rem'}}>
            {renderSideVideo}
        </div>
    </React.Fragment>
    
    
  )
}

export default SideVideo