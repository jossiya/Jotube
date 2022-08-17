const express=require('express')
const router=express.Router()
const ctrl=require('./home.ctrl')
const vctrl=require('./video')
const subscribe=require('./subscribe')
const comment = require('./comment')
const like = require('./like')
const profile = require('./profile')
//라우팅 경로 설정 하는 곳
router.get('/',(req,res)=>{
    res.send('hellow')//프록시 테스트
})


//유저 로그인 정보
router.get('/auth',ctrl.process.auth)
//로그인 회원가입 기능
router.post('/login',ctrl.process.login)
router.get('/logout',ctrl.process.logout)
router.post('/register',ctrl.process.register)
//검색 정보 비디오 가져오기
router.post('/video/search',vctrl.process.getvideos)
//렌더링 페이지 비디오 가져오기
router.get('/video/getVideos',vctrl.process.getvideos)
router.post("/video/videoInfo",vctrl.process.upgetvideo)
//비디오 업로드 및 썸네일 컨트롤 업로드
router.post('/video/videouploadfiles',vctrl.process.videouploadfiles)
router.post('/video/thumbnail',vctrl.process.thumbnail)
router.post('/video/uploadVideo',vctrl.process.uploadvideo)
router.post('/video/thumbnailuploadfiles',vctrl.process.imageUpload)
router.post('/video/videoset',vctrl.process.getmyvideoinfos)
router.post('/video/delete',vctrl.process.videodelete)
router.post('/video/videoDtailUpload',vctrl.process.videodetailupload)
router.post('/video/ModalVideoInfo',vctrl.process.modalvideoinfo)
//비디오 디테일 페이지
router.post('/video/getVideoDetail',vctrl.process.getvideo)
router.get("/video/getVideo",vctrl.process.getvideos)//싸이드쪽
router.post('/subscribe/subscribeNumber',subscribe.process.subscribeNumber)
router.post('/subscribe/subscribed',subscribe.process.subscribed)
router.post('/subscribe/unSubscribe',subscribe.process.unsubscribe)
router.post('/subscribe/Subscribe',subscribe.process.subscribe)
router.post('/video/getSubscriptionVideo',vctrl.process.getSubscriptionVideo)
router.post('/comment/saveComment',comment.process.commentSave)
router.post('/comment/getComment',comment.process.commentGet)
router.post('/like/getLikes',like.process.likeget )
router.post('/like/getDisLikes',like.process.dislikeget )
router.post('/like/upLike',like.process.uplike)
router.post('/like/unLike',like.process.unlike)
router.post('/like/unDislike',like.process.undislike)
router.post('/like/upDislike',like.process.upDislike)
router.post('/ViewsCnt',vctrl.process.viewscnt)
//구독한 사람 정보
router.post('/subscriber',subscribe.process.sidesubscribed)

// 내 프로필 쪽
router.post('/profile/uploadfiles',profile.process.imageuploadfile)
router.post('/profile/imageUpdate',profile.process.imageupdate)
router.post('/profile/imageDelete',profile.process.imagedelete)

//channel 쪽
router.post('/channel/video',vctrl.process.getcvideoinfos)
router.post('/Channel/Subscribers',subscribe.process.subscribeNumber)
router.post('/Channel/userInfo',ctrl.process.UserInfo)

//좋아요한 비디오 페이지
router.post('/LikedVideo',like.process.likedVideo )
module.exports=router

