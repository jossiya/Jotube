import React  from 'react'
import {Card,Avatar} from 'antd'
const {Meta}=Card
function LeftVideo(props) {
  
const Videos=props.videos
  console.log('레프트 프롭스 비디오',Videos[0]?.filePath)

  if(Videos[0]&&props.user){
    return (
      <>
      <div>
      <a href={`/watch/${Videos[0].videoid}`} >
          <video style={{ width: '100%', height: "190px"}} src={`http://localhost:5000/${Videos[0]?.filePath}`}></video>
      </a>
      </div>
      <div style={{fontSize:'32px'}}>좋아요 표시한 동영상</div>
      <div style={{color : 'gray'}}>
        <span>동영상 {Videos.length}개</span>
        <span style={{marginLeft : "1rem"}}>조회수 없음</span>
        <span style={{marginLeft : "1rem"}}>업데이트: 오늘</span>
      </div>
      <hr/>
      <Meta
      avatar={<Avatar size={60}  src={`http://localhost:5000/${props.user.image}`}/>}
      title={<div style={{marginTop : '1rem'}}>{props.user.nickname}</div>}
      >

      </Meta>
      </>
    )
  }else{
    return null;
  }
  
}

export default LeftVideo