import React, { useEffect, useState } from 'react'
import DropZone from './DropZone'
import UploadDetailPage from '../UploadDetailPage/UploadDetailPage'
import {Modal,}from 'react-bootstrap'
function UploadModal(props) {
    const [Show, setShow] = useState(true)
    const [ModalDisplay, setModalDisplay] = useState(false)//업로드 후 업로드 페이지 디스플레이 논
    const [VideoId, setVideoId] = useState('')
    const state=props.show //부모로 받은 show값
    const HideGet=props.HideGet //자식 hide값 부모로 보내기
    // console.log('프롭스:',state,',쇼값:',Show)
    // console.log('hide',HideGet)
    const onHideHandle=(e)=>{
      HideGet(false)
      setModalDisplay(false)
    }
    // console.log('display',ModalDisplay)
    console.log('모달쪽업로드',VideoId)
  return (
    <>
    {/* 모달 비디오 업로드  썸네일 자동생성 */}
    <div>
        <Modal
        size="lg"
        show={state}
        onHide={onHideHandle}
        backdrop="static"
        aria-labelledby="modal-sizes-title-lg"
      >
        <div id='upload-dropzone' style={{display : state&&`${ModalDisplay? "none" : ""}`}}>
        <Modal.Header closeButton>
          <Modal.Title id="modal-sizes-title-lg">
            동영상 업로드
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <DropZone display={setModalDisplay} MvideoId={setVideoId}/>
        </Modal.Body>
        <div className='d-flex  flex-column ' style={{fontSize : "2px", paddingBottom : "10px"}}>
          <div className='d-flex justify-content-center'>
            JoTube에 동영상을 제출하면 JoTube 서비스 약관 및 커뮤니티 가이드에 동의하게 됩니다.
          </div>
          <div className='d-flex justify-content-center'>
            불법촬영물 게재시 삭제 조치되고 관련 법에 따라 처벌 받을 수 있습니다. 타인의 저작권 또는 개인정보 보호 권한을 침해해서는 안 됩니다. 자세히 알아보기
          </div>
        </div>
        </div>
        {/* ModalDisplay===false&&`${ModalDisplay? "" : "none"}`||  */}
        <div id='detail-section' style={{display :state&&`${ModalDisplay? "" : "none"}`}}> 
        <Modal.Header closeButton>
        <Modal.Title id="modal-sizes-title-lg">
          제목
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <UploadDetailPage style={{marginLeft : '-10px' , marginTop : "-10rem"}} styleV={"-2rem"} styleN={"42%"} true={true} VideoId={VideoId} HideGet={HideGet} ModalDisplay={setModalDisplay} />
        </Modal.Body>
        </div>
      </Modal>
    </div>
    </>
    
  )
}

export default UploadModal