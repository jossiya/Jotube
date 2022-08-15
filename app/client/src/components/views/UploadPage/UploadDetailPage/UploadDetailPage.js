import React, { useState,useRef, useEffect } from 'react'
import Auth from '../../../../hoc/auth'
import {Navbar,Nav,Row,Col, Form, Card, Button,} from 'react-bootstrap'
import {RiImageAddFill} from 'react-icons/ri'
import Dropzone from 'react-dropzone'
import './detail.css'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
function UploadDetailPage(props) {
  const user=useSelector(state=>state.user)
  const VideoId =useParams()
  const MvideoId=props.VideoId
  const HideGet=props.HideGet
  const ModalDisplay=props.ModalDisplay
  const navigate=useNavigate()
  const [Vid, setVid] = useState('')
  const [VideoTitle, setVideoTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [imageSelected, setimageSelected] = useState([])
  const [ThumbnailName, setThumbnailName] = useState("")
  const [Private, setPrivate] = useState(0)
  const [Category, setCategory] = useState("0")
  const [ImagePath, setImagePath] = useState("")
  const [ImageName, setImageName] = useState("")
  const [FilePath, setFilePath] = useState('')
  const [FileName, setFileName] = useState("")
  const [Restriction, setRestriction] = useState(1)
  const focused=useRef(null)
  const Restrictions=[
    {value :"0", label :"예, 아동용입니다." },
    {value :"1", label : "아니요, 아동용이 아닙니다."}
  ]
  const PrivateOptions=[
    {value : 0, labele:"비공개"},
    {value : 1, labele:"공개"}
  ];

  const CategoryOptions=[
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" },
    { value: 4, label: "Sports" },
]

const [Image1, setImage1] = useState('')
const [Image2, setImage2] = useState('')
const [Image3, setImage3] = useState('')
  const onTitleChange=(e)=>{
    setVideoTitle(e.currentTarget.value)
  }
  const onDescriptionChange=(e)=>{
    setDescription(e.currentTarget.value)
  }
  const onPrivateChange=(e)=>{
    setPrivate(e.currentTarget.value)
  }
  const onCategoryChange=(e)=>{
    setCategory(e.currentTarget.value)
  }
  const imageHandle=(e)=>{
    const ImageName=e.currentTarget.value.replace(`uploads/thumbnails/${FileName}/`,'')
    setThumbnailName(ImageName)
    setimageSelected(e.currentTarget.value)
  console.log('이미지 벨류',e.currentTarget.value)
  }
  const RestrictionHandle=(e)=>{
    setRestriction(e.currentTarget.value)
  }
  const SubmitHandler=(e)=>{
    e.preventDefault();
    const variable={
      videoid:Vid,
      title : VideoTitle,
      description : Description,
      thumbnailPath : imageSelected,
      thumbnailName : ThumbnailName,
      category: Category,
      privacy:Private,
      restriction:Restriction,
    }
    
      axios.post('/api/video/videoDtailUpload',variable)
      .then(response=>{
          if(response.data.success){
            if(HideGet){
              HideGet(false)
              ModalDisplay(false)
            }
            navigate('/')
        }else{
          alert('비디오 상세 업로드를 실패했습니다.')
        }
      })
  }
  console.log('videoid',VideoId)
  console.log('모달 아이디',MvideoId)
  console.log('썸네일',imageSelected)
  console.log('카테고리',Category)
  console.log("제한",Restriction)
  //기본 비디오 정보 가져오기
  
  useEffect(() => {
    console.log('모달 아이디',MvideoId)
    if(MvideoId===undefined){
      console.log('그냥ㅇㅇ',VideoId!==null)
      console.log('VideoId',VideoId)
      console.log('모달 아이디',MvideoId)
      const variable={
        videoid : VideoId
      }
      axios.post("/api/video/videoInfo",variable)
    .then(response=>{
      if(response.data.success){
        console.log('랜딩',response.data)
        setVid(response.data.video.videoid)
        setVideoTitle(response.data.video.title)
        setDescription(response.data.video.description)
        setimageSelected(response.data.video.thumbnailPath)
        setRestriction(response.data.video.restriction)
        setFilePath(response.data.video.filePath)
        setFileName(response.data.video.fileName)
        setPrivate(response.data.video.privacy)
        setCategory(response.data.video.category)
        setThumbnailName(response.data.video.thumbnailName)
        
        setImageName(response.data.thumbnails[0])
        setImage1(response.data.thumbnails[1][1])
        setImage2(response.data.thumbnails[1][2])
        setImage3(response.data.thumbnails[1][3])
      }else{
        alert('비디오 정보를 받아오지 못했습니다.')
      }
    })
      
    }else if(MvideoId){
      const variable={
        videoid : MvideoId
      }
      console.log('모달쪼옥')
      axios.post("/api/video/ModalVideoInfo",variable)
    .then(response=>{
      if(response.data.success){
        console.log('랜딩',response.data)
        setVid(response.data.video.videoid)
        setVideoTitle(response.data.video.title)
        setDescription(response.data.video.description)
        setimageSelected(response.data.video.thumbnailPath)
        setRestriction(response.data.video.restriction)
        setFilePath(response.data.video.filePath)
        setFileName(response.data.video.fileName)
        setPrivate(response.data.video.privacy)
        setCategory(response.data.video.category)
        setThumbnailName(response.data.video.thumbnailName)
        
        setImageName(response.data.thumbnails[0])
        setImage1(response.data.thumbnails[1][1])
        setImage2(response.data.thumbnails[1][2])
        setImage3(response.data.thumbnails[1][3])
      }else{
        alert('비디오 정보를 받아오지 못했습니다.')
      }
    })
    }
    
  }, [MvideoId])
  
  //이미지 선택
  const onDrop = async(files)=>{
    let formData = new FormData();
    const config = {
        headers : {'Content-Type' : 'multipart/form-data'},
        // data: formData,
    }
    const variable=[{
      videoname:FileName
    }]
    formData.append("file",files[0],`${FileName}.jpg`)
    console.log(files)
    await axios.post('/api/video/thumbnailuploadfiles',formData,config)
    .then(response=>{
        if(response.data.success){
        console.log('성공 여부',response.data)
        let variable={
            url : response.data.url,
            ImageFileName : response.data.fileName
        }
        setThumbnailName(response.data.fileName)
        setImagePath(response.data.url)
        setImageName(response.data.fileName)
        setimageSelected(response.data.url)
      }else{
        alert('이미지 업로드 및 불러오기 실패하였습니다.')
      }
    })
  }    
  console.log('user',user)
  console.log('dd',ImageName)
  if(user.userData){
    return (
      <>
      <div style={props.style}>
      <Form onSubmit={SubmitHandler}>
        <Navbar bg="light"   style={{ width:`${props.true===!undefined ? props.styleN : "98%"}`  ,position : "fixed",zIndex :"1" ,marginTop : "-4.5rem", display : "flex"}}>
              <Navbar.Brand style={{paddingLeft : "25px"}}>동영상 세부정보</Navbar.Brand>
              <Nav>
                <Button as="input" variant="outline-primary" type='submit' value="저장" onSubmit={SubmitHandler}/>
              </Nav>
        </Navbar>
        <div style={{margin : "9rem 3rem", width : "100%"}}>
          <Row>
            <Col lg="7">
              <div id="col-1" style={{ width : "90%"}}>
                <Form.Label>제목</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="제목" value={VideoTitle} onChange={onTitleChange}/>
                <Form.Label> 설명</Form.Label>
                <Form.Control as="textarea" rows={7} placeholder="설명" value={Description||''} onChange={onDescriptionChange}/>
                {/* 썸네일 이미지 */}
                <div id='thumbnail-image'>
                  <div className="mb-1">미리보기 이미지</div>
                  <div className="mb-2 text-muted" style={{fontSize : "13px"}}>동영상의 내용을 알려주는 사진을 선택하거나 업로드하세요. 시청자의 시선을 사로잡을만한 이미지를 사용해 보세요. 자세히 알아보기</div>
  
                  <div id='image-select1' className='mb-3 d-flex' style={{ width : "100%"}}>
                    {/* 내가 원하는 썸네일 업로드 */}
                    {ImageName.length === 0&&<Dropzone
                          onDrop={onDrop}
                          multiple={false}
                          maxSize={1000000000000}
                          >
                              {({getRootProps,getInputProps})=>(
                              <div className='flex-column' style={{ width: '170px', height: '100px',display : "flex",backgroundColor : '#F7F5F5', alignItems: 'center', justifyContent: 'center'}}
                              {...getRootProps()}>
                              <input {...getInputProps()} />
                              <RiImageAddFill/>
                              <div style={{fontSize : '11px'}}>미리 보기 이미지 업로드</div>
                              </div>
                              )}
                      </Dropzone>}
                    {/* 자동으로 만들어진 썸네일 */}
                  <label style={{marginLeft:'5px'}} >
                    <input id="image-check" type="radio" name="imggrop" style={{display : "none"}} value={`uploads/thumbnails/${FileName}/${Image1}`} defaultChecked onClick={imageHandle}/>
                    {ImageName&&ImageName.length !==0&&<img className='c' src={`http://localhost:5000/uploads/thumbnails/${FileName}/image/${ImageName}`} style={{ width: '170px', height: '100px'}}></img>}
                  </label>
                  <label style={{marginLeft:'5px'}} >
                    <input id="image-check" type="radio" name="imggrop" style={{display : "none"}} value={`uploads/thumbnails/${FileName}/${Image1}`} onClick={imageHandle}/>
                    <img className='c'  src={`http://localhost:5000/uploads/thumbnails/${FileName}/${Image1}`} style={{width:"8rem",height:"6rem" }}/>
                  </label>
                  <label style={{marginLeft:'5px'}}>
                    <input id="image-check" type="radio" name="imggrop" value={`uploads/thumbnails/${FileName}/${Image2}`} style={{display : "none"}} onClick={imageHandle}/>
                    <img className='c' src={`http://localhost:5000/uploads/thumbnails/${FileName}/${Image2}`} style={{width:"8rem",height:"6rem" }}/>
                  </label>
                  <label style={{marginLeft:'5px'}}>
                    <input id="image-check" type="radio" name="imggrop" value={`uploads/thumbnails/${FileName}/${Image3}`} style={{display : "none"}} onClick={imageHandle}/>
                    <img className='c' src={`http://localhost:5000/uploads/thumbnails/${FileName}/${Image3}`} style={{width:"8rem",height:"6rem" }}/>
                  </label>
                  </div>
                </div>
                {/* 연령제한 */}
                <div className="mb-1">시청자층</div>
                {Restriction==="1"&&<> <div className='mb-1' style={{fontSize : "13px"}}>이 동영상이 아동용이 아니라고 설정됨 <span style={{background : 'rgba(0, 0, 0, 0.06)' ,borderRadius:"7%"}}>크리에이터가 설정함</span></div> </>}
                {Restriction==='0'&&<div className='mb-1' style={{fontSize : "13px"}}>이 동영상이 아동용으로 설정됨<span style={{background : 'rgba(0, 0, 0, 0.06)' ,borderRadius:"7%"}}>크리에이터가 설정함</span></div>}
                  <div className="mb-2 text-muted" style={{fontSize : "13px"}}>모든 크리에이터는 위치에 상관없이 아동 온라인 개인정보 보호법(COPPA) 및 기타 법률을 준수해야 할 법적인 의무가 있습니다. 아동용 동영상인지 여부는 크리에이터가 지정해야 합니다</div>                  
                <div id="restricion" className='mb-3' style={{ width : "100%"}}>
                {/* <Form.Check  type="radio"  value={0} name="group1"  checked={Restriction==="0"} onChange={RestrictionHandle}/>
                <Form.Check  type="radio"  value={1} name="group1"  checked={Restriction==="1"} onChange={RestrictionHandle}/> */}
                {console.log('참',Restriction==="1")}
                  {Restrictions.map((item,index)=>(
                    <Form.Check key={index} type="radio"  value={item.value} name="group1" label={item.label}  checked={Restriction===item.value} onChange={RestrictionHandle}/>
                  ))}
                </div>
                {/* 재생 목록 설정 */}
                  <div id="play-list">
                    <div className="mb-1">재생 목록</div>
                    <div className="mb-2 text-muted" style={{fontSize : "13px"}}>동영상을 1개 이상의 재생목록에 추가하세요. 시청자가 내 콘텐츠를 더 빨리 발견하는 데 도움이 될 수 있습니다. 자세히 알아보기</div>
                  </div>
                </div>
              
            </Col>
            <Col lg="5">
            <Card style={{ width: '19rem',marginLeft : `${props.styleV}`, marginBottom : '20px', border :"0"  }}>
            <video className='mb-2' style={{height : '13rem' }}  src={`http://localhost:5000/${FilePath}`} controls />
              <Card.Body>
              <Card.Text className="mb-1 text-muted" style={{fontSize: "12PX"}}>동영상 링크</Card.Text>
                <Card.Link href={`/watch/${Vid}`} className="" style={{fontSize: "15PX", textDecorationLine : 'none',marginBottom : '10px'}}>{`http://localhost:5000/${Vid}`}</Card.Link>
                <Card.Text className="mb-1 text-muted" style={{fontSize: "12PX"}}>파일 이름</Card.Text>
                <Card.Text className="mb-1" style={{fontSize:"15PX"}} >{FileName}</Card.Text>
                <Card.Text className="mb-1 text-muted" style={{fontSize: "12PX"}}>동영상 화질</Card.Text>
                <div>SD</div>
              </Card.Body>
            </Card>
              <div id="private" className='flex-column mb-3' style={{display:'flex', width:'100px' }}>
              <Form.Label>공개 상태</Form.Label>
              <Form.Select size="sm" onChange={onPrivateChange} value={Private||""}>
                {PrivateOptions.map((item, index)=>(
                <option key={index} value={item.value}>{item.labele}</option>
                ))}
              </Form.Select>
              </div>
              <div id="category" className='flex-column' style={{display:'flex', width:'180px' }}>
              <Form.Label>카테고리</Form.Label>
              <Form.Select size="sm" onChange={onCategoryChange} value={Category||""}>
                {CategoryOptions.map((item, index)=>(
                    <option key={index} value={item.value}>{item.label}</option>
                  ))}
              </Form.Select>
              </div>
            </Col>
          </Row>
          </div>
        </Form>
      </div>
      </>
    )
  }else{
    return null;
  }
}

export default Auth(UploadDetailPage,true)