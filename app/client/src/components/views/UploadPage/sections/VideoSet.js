import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Table,Form,NavDropdown,Nav,Dropdown} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Pagination from './Pagination'
import './videoset.css'
import moment from 'moment'

function VideoSet(){
 const user=useSelector(state=>state.user)
  const navigation=useNavigate()
  const uid=useParams()
  console.log(uid)
const [Video, setVideo] = useState([])
const [IsChecked, setIsChecked] = useState(false)
const [AllChecked, setAllChecked] = useState(false)
const [limit, setLimit] = useState(7);
const [page, setPage] = useState(1);
const [CheckId, setCheckId] = useState([])
const [Deleted, setDeleted] = useState([])
const offset = (page - 1) * limit;

//체크 한 비디오 아이디 추가
const CheckIdHandler=(checked,id)=>{
  if(checked){
    setCheckId([...CheckId,id])
  }else {
    setCheckId(CheckId.filter((el) => el !== id));
  }
};
const VideoIds= Video.map((item)=>(item.videoid))
// console.log('id',CheckId)
const AllCheckHandler=(checked)=>{
  
  if(checked){
    setCheckId(VideoIds)
  }else{
    setCheckId(CheckId.filter((el) => el == "a"));
  }
  setIsChecked(!IsChecked)
  setAllChecked(!AllChecked)
};
const IsCheckHandler=(checked,id,key)=>{
  CheckIdHandler(checked,id)
};
useEffect(() => {
  console.log('test',CheckId)
  if(CheckId.length == 0){
    setAllChecked(false)
  }
}, [CheckIdHandler])

  useEffect(() => {
    const variable={
      uid:uid,
    }
    console.log(uid)
    axios.post('/api/video/videoset',variable)
    .then(response=>{
      if(response.data.success){
        console.log('서버에서 들어온 정보',response.data.response)
        setVideo(response.data.response)
      }else{
        alert('콘텐츠 불러오기를 실패했습니다.')
      }
    })
  }, [Deleted])
  console.log('비디오드을',Video)
  const DeleteHandler=(e)=>{
    axios.post('/api/video/delete',CheckId)
    .then(response=>{
      console.log('삭제 결과',response.data,user.userData.uid)
      if(response.data.response.success){
        // navigation(`/VideoSetPage/`+user.userData.uid)
        // window.location.replace(`/VideoSetPage/`+user.userData.uid)
        setCheckId([])
        setDeleted(response.data.response.VideoDatas)
        console.log('삭제된 비디오 이름들',response.data.response.VideoDatas)
      }else{
        alert('동영상 삭제에 실패했습니다.')
      }
    })
  }
  console.log('비디오들',Video)
  return (
    <>
    <div id='toggle-bar' style={{display : 'flex',visibility: `${CheckId.length===0?"hidden ":"visible"}`,color : "white",background : 'black', height : `${CheckId.length===0?"0 ":"4rem"}`, alignItems : "center"}} >
    <div style={{display : 'flex',alignItems : "center",margin :"1rem" , borderRight: " 1px solid rgb(220, 220, 220)" ,width :"10rem" ,height:"80%"}}>
      <span style={{width : "100%"}}>{CheckId.length}개 선택됨</span>
      </div>
      <span id='drop-to'>
        <Nav>
          <NavDropdown
            title='추가작업'
            drop="end"
            variant="Primary"
            menuVariant="dark"
            style={{color : "white"}}
            >
              <NavDropdown.Item eventKey="1">오프라인 저장</NavDropdown.Item>
              <NavDropdown.Item eventKey="2" onClick={DeleteHandler}>완전삭제</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        </span>
    </div>
    <Table responsive>
      <thead style={{color : "gray"}}>
        <tr style={{fontSize : '1rem' ,whiteSpace:"nowrap"}}>
          <th>
            <Form >
                <Form.Check type='checkbox'checked={AllChecked} onChange={(e)=>AllCheckHandler(e.currentTarget.checked)} />
            </Form>
          </th>
          <th colSpan={1}>동영상</th>
          <th>공개상태</th>
          <th>제한사항</th>
          <th>날짜</th>
          <th>조회수</th>
          <th>댓글</th>
          <th>좋아요(싫어요 대비)</th>
        </tr>
      </thead>
      <tbody>
      {Video.slice(offset, offset + limit).map((item,index)=>(
        <tr key={index}>
          {/* {console.log('idx',index)} */}
              <td>
              <Form>
                    <Form.Check value={index} id={item.videoid} checked={CheckId.includes(item.videoid)?true:false} onChange={(e)=>IsCheckHandler(e.currentTarget.checked,e.currentTarget.id ,e.currentTarget.value)}/>
                </Form>
            </td>
            <td colSpan={1}>
            <div  style={{ position: 'relative' ,width : "100%"}}>
              <div id="image-title-description" style={{display : "flex" ,width : "100%"}}>
              <a href={`/UploadSetPage/${item.videoid}`}>
              <img style={{ width: '10rem', height:"80px"}} alt="thumbnail" src={`http://localhost:5000/${item.thumbnailPath}`} />
              </a>
                <div className='d-flex flex-column' style={{width:"300px",marginLeft : '10px', height: "50px"}}>
                  <div className="set-title" style={{fontSize : '1rem'}}>
                  {item.title}
                  </div>
                  <div className="set-description" style={{color : 'gray', fontSize:'10px'}}>
                    {item.description}
                  </div>
                </div>
              </div>
            </div>
              </td>
              <td>{item.privacy===0 ?"비공개":"공개"}</td>
              <td>{item.restriction==="1"?"가능":"불가능"}</td>
              <td> <div style={{width:"8rem",margin:"0"}}> {moment(item.in_date).format("YY년 MM월 DD일 hh:mm:ss")} </div></td>
              <td>{item.views}회</td>
              <td>없음</td>
              <td>좋아요!</td>
            </tr>
    ))}
      </tbody>
    </Table>
    {/* 페이지네이션 */}
    <div className='d-flex justify-content-end'>
    <div className={"d-flex"}>
    <label style={{display : "flex"}}>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="1">1</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </label>
    
    <Pagination
      total={Video.length}
      limit={limit}
      page={page}
      setPage={setPage}
    />
    </div>
    <hr/>
      </div>
      
    </>
  )
}

export default VideoSet