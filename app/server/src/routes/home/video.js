const multer = require("multer");
const  ffmpeg =require("fluent-ffmpeg");
const Video=require('../../models/Video')
const VideoInfo = require('../../models/VideoInfo');
const Subscribe=require('../../models/Subscribe')
const fs  = require('fs');
//뮤터를 사용해서 서버에 비디오 파일 저장
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/video/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4'|| ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

const videoupload = multer({ storage: storage }).single("file")

//업로드 상세 페이지 이미지 선택 업로드 
let storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        const filePath=file.originalname.replace('.jpg','')
        // console.log("form",filePath)
        cb(null, 'uploads/thumbnails/'+filePath+'/image')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

const imageupload = multer({ storage: storage2 }).single('file')


const process={
    videouploadfiles :async (req,res)=>{
        videoupload(req, res, err => {
            if (err) {
                return res.json({ success: false, err })
            }
            if(fs.existsSync("uploads/thumbnails")){
                fs.mkdir("uploads/thumbnails/"+res.req.file.filename, async()=>{
                    fs.mkdirSync("uploads/thumbnails/"+res.req.file.filename+"/image")
                })
            }
            return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename})
        })
    },
    thumbnail : (req,res)=>{
        //썸네일 생성하고 비디오 러닝타임 가져오기
        let thumbsFilePath ="";
        let thumbsFilePaths ="";
        let fileDuration ="";
        let thumbsName="";
        let thumbsNames="";
    
    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);
        console.log(req.body.fileName)
        fileDuration = metadata.format.duration;
    })

    //썸네일 생성
    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePaths = `uploads/thumbnails/${req.body.fileName}/` + filenames;
            thumbsFilePath = `uploads/thumbnails/${req.body.fileName}/`+ filenames[0];
            thumbsNames= filenames
            thumbsName = filenames[0]
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, url: thumbsFilePath ,urls: thumbsFilePaths, fileDuration: fileDuration, thumbsName :thumbsName,thumbsNames :thumbsNames})
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: `uploads/thumbnails/${req.body.fileName}/`,
            size:'320x240',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });
    },

    //드랍존 세이브
    uploadvideo :async (req,res)=>{
        const video= new Video(req.body)
        // console.log('클라쪽 데이타',video)
        const response = await video.videoupload()
        const videoid= await VideoInfo.getmyvideoinfo2(req.body.filePath)
        //     console.log('db<<',videoid)
        // console.log('결과' ,response)
        return res.json({success:response,videoid})
    },
    //이미지
    imageUpload : (req,res)=>{
        // console.log('이미지d',req.body)
        imageupload(req,res,err=>{
            // console.log('이미지',req.file,err)
            if (err) {
                return res.json({ success: false, err })
            }
            return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
        })
    },

    //비디오
    getvideo : async(req,res)=>{
        const videoid=req.body.videoid
        // console.log('server :',videoid)
        try{ const video = await VideoInfo.videoInfo(videoid)
        // console.log(video)
        return res.json({success : true , video})
    }catch(err){
        return { success : false, err }
    }
    },
    upgetvideo :async(req,res)=>{
        const videoid=req.body.videoid
        // console.log('클라',videoid)
        const thumbnails=[]
        try{const video = await VideoInfo.videoInfo(videoid)
            fs.readdir(`uploads/thumbnails/${video.fileName}`+'/image',(err,stats)=>{
                thumbnails.push(stats)
                fs.readdir(`uploads/thumbnails/${video.fileName}`,async(err,stats)=>{
                    if(err){
                        return{success: false}
                    }
                    thumbnails.push(stats)
                    // console.log(thumbnails)
                    return res.json({success : true , video ,thumbnails})
                })
            })
            }catch(err){
                return { success : false, err }
            }
        },
    getvideos : async(req,res)=>{
        try{const videos = await VideoInfo.videoInfos()
        // console.log('sever :' , videos)
        return res.json({success : true , videos})
        }catch(err){
            return { success : false, err }
        }
    },
    getmyvideoinfos :async (req,res)=>{
        try{
        const uid=req.body.uid
        const response= await VideoInfo.getmyvideoinfos(uid)
        res.json({success : true ,response})
        }catch(err){
            return { success : false, err }
        }
    },
    getcvideoinfos:async (req,res)=>{
        try{
        const uid=req.body.uid
        console.log('uid',uid)
        const response= await VideoInfo.getcvideoinfos(uid)
        res.json({success : true ,response})
        }catch(err){
            return { success : false, err }
        }
    },
    videodelete : async (req,res)=>{
        const videos=new Video(req.body)
        const response= await videos.Videosdelete(videos)
        // console.log('제이슨',response)
        return res.json({response})
    },
    modalvideoinfo: async(req,res)=>{
        const videoid=req.body
        const thumbnails=[]
        try{const video=await VideoInfo.modalvideoInfo(videoid)
        fs.readdir(`uploads/thumbnails/${video.fileName}`+'/image',(err,stats)=>{
            thumbnails.push(stats)
            fs.readdir(`uploads/thumbnails/${video.fileName}`,async(err,stats)=>{
                if(err){
                    return{success: false}
                }
                thumbnails.push(stats)
                return res.json({success : true,video,thumbnails})
            })
        })
    }catch(err){
        return { success : false, err }
    }
    },
    videodetailupload : async (req,res)=>{
        try{const videoinfo=req.body;
        // console.log('클라쪽',videoinfo)
        const response=await VideoInfo.VideoEndUpload(videoinfo)
        return res.json({success : response})
    }catch(err){
        return { success : false, err }
    }
    },
    getSubscriptionVideo :async(req,res)=>{
        try{
        const userFrom = req.body.userFrom
        const response= await Subscribe.SubscribeInfos(userFrom)
        // console.log('구독한 사람 누구:',response)
        const subscribeTos=[]
            response.map((subscribed,i)=>{
                subscribeTos.push(subscribed.userTo)
            })
            console.log('구독한 영상:',subscribeTos)
            if(subscribeTos.length!==0){
            const subresponse=await VideoInfo.subvideoInfos(subscribeTos)
            console.log('구독한 비디오들',subresponse)
            return res.json({success : true, subresponse : subresponse})
            }
        }catch(err){
            console.log('구독 에러',err)
            return{success : false,err}
        }
    },
    viewscnt :async(req,res)=>{
        try{
            const videoid=req.body.videoid
            const response=VideoInfo.viewscnt(videoid)
            return res.json({success : response})
        }catch(err){
            return {success : false ,err}
        }
    },
}

module.exports={process}