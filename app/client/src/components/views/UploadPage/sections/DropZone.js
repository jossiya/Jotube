import axios from 'axios'
import React, { useEffect, useState } from 'react'
import{Button, Form,Alert } from 'react-bootstrap'
import {BsUpload}from 'react-icons/bs'
import Dropzone from 'react-dropzone'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function DropZone(props) {
    const user = useSelector(state=>state.user)
    const navigate=useNavigate();
    const [FilePath, setFilePath] = useState('')
    const [FileName, setFileName] = useState('')
    const [Duration, setDuration] = useState('')
    const [ThumbnailPath, setThumbnailPath] = useState('')
    const [ThumbnailName, setThumbnailName] = useState("")
    const [VideoId, setVideoId] = useState("")
    //모달 업로드 불룬
    const [UploadSuccess, setUploadSuccess] = useState(false)
    const Mdisplay=props.display
    const MvideoId=props.MvideoId
    // console.log(Mdisplay)
    // console.log('업로드 모달 디스 성공',UploadSuccess)
    //드랍존
    
    const onDrop =(files)=>{
            let formData = new FormData();
            const config = {
                header : {'content-type' : 'multipart/form-data'}
            }
            formData.append("file", files[0])
            console.log(files)
            axios.post('/api/video/videouploadfiles',formData,config)
            .then(response=>{
                if(response.data.success){
                console.log('성공 여부',response.data)
        
                let variable={
                    url : response.data.url,
                    fileName : response.data.fileName
                }
                setFilePath(...FilePath,response.data.url)
                setFileName(...FileName,response.data.fileName)
                axios.post('/api/video/thumbnail', variable)
                .then(response=>{
                    if(response.data.success){
                        setDuration(response.data.fileDuration)
                        setThumbnailPath(response.data.url)
                        setThumbnailName(response.data.thumbsName)
                        setUploadSuccess(response.data.success)
                        Mdisplay(true)
                    console.log('전에꺼')
                    return{success : true }
                    }else{      
                    alert('썸네일 생성에 실패했습니다.')
                    } 
                })
            }else{
                alert('비디오 업로드를 실패했습니다.')
            }
        })
    }
    useEffect(() => {
        if(FileName&&ThumbnailPath){
            console.log('왜 데이터가 업냐??',FilePath)
            const variable2 = {
                writer : user.userData.uid,
                filePath: FilePath,
                fileName : FileName,
                duration: Duration,
                thumbnailName : ThumbnailName,
                thumbnail: ThumbnailPath
                }
                console.log("클라 비디오 정보",variable2)
                axios.post('/api/video/uploadVideo', variable2)
                .then(response=>{
                    console.log('asdasdsa',response.data)
                    if(response.data.success){
                    MvideoId(response.data.videoid.videoid)
                    // <Alert color="success">
                    //     성공적으로 업로드가 되었습니다.
                    // </Alert>
                    setTimeout(() => {
                        
                    }, 3000);
                    
                    }else{
                    alert('비디오 서버 저장에 실패했습니다.')
                    }
                })
        }
    
    }, [ThumbnailPath])
        // console.log('id',MvideoId)
        console.log('dasdasdsa',FileName)
        
    return (
        <Form>
            <div style={{width : "85%", margin: '5rem auto'}}>
                <div style={{textAlign : 'center', marginBottom : '2rem'}}>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={1000000000000}
                        >
                            {({getRootProps,getInputProps})=>(
                            <div className='flex-column' style={{ width: '100%', height: '50vh', backgroundColor : '#F7F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                            {...getRootProps()}>
                            <input {...getInputProps()} />
                            <BsUpload style={{fontSize:'5rem', paddingBottom:"30px",}}/>
                            <div style={{paddingBottom:"30px",}}>
                                <h1 style={{fontSize :"1rem"}}>동영상 파일을 드래그 앤 드롭하여 업로드</h1>
                                <h2 style={{fontSize : "0.8rem"}}>동영상을 게시하기 전에는 비공개로 설정됩니다.</h2>
                            </div>
                            <Button style={{fontSize : "0.9rem"}}>
                                파일 선택
                            </Button>
                            </div>
                            )}
                    </Dropzone>
                </div>
            </div>
        </Form>
    
    )
}

export default DropZone