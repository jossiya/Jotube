import React from 'react'

function RigthList(props) {
  const Vieos=props.videos
  const LikedList=Vieos.map((video,index)=>{
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);
    return <div key={index}>
          <div  style={{width:"100%",display:'flex', paddingRight: '2rem' ,marginLeft : "2rem" }}>
        <div style={{width:'400px', marginBottom:'1rem',position:"relative"}} >
            <a href={`/watch/${video.videoid}`}>
                <img style={{width:"100%" ,height : '120px'}} src={`http://localhost:5000/${video.thumbnailPath}`} alt='thumnail'/>
                <div className=" duration"
                style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                fontWeight:'500', lineHeight:'12px' }}>
                <span>{minutes} : {seconds}</span>
                </div>
            </a>
        </div>    
        <div style={{width:'100%', marginLeft:'1rem'}} >
            <a href={`/watch/${video.videoid}`}style={{display:'flex', flexDirection:'column', textDecorationLine:'none', color:'gray'}} >
                <div className='side_title' style={{width:'90%',fontSize:'1rem', color:'black'}} >{video.title}</div>
                <span style={{paddingTop:"1rem"}}>{video.nickname}</span>
            </a>
        </div>
        
      </div><hr/>
    </div>
      
    
  })
  return (
    <div style={{height: '100%' ,marginTop : '1rem'}}>
        {LikedList}
        </div>
  )
}

export default RigthList