const VideoInfo = require('./VideoInfo')
const fs=require('fs')
class Video{
    constructor(body){
        this.body=body
    }
    async videoupload(){
        const Info=this.body
        console.log(Info)
        try{
        const response=await VideoInfo.save(Info)
        return response
        }catch(err){
        return { success : false, err}
        } 
    };
    async Videosdelete(){
        const Videos=this.body
        const VideoDatas=[]
        console.log('삭제될 비디오들',Videos)
        try{
            const videodata= await VideoInfo.getmyvideoinfo(Videos)
            console.log('디비에서 가져온 데이타',videodata[0].filePath,videodata.length)
            if(fs.existsSync(videodata[0].filePath)){
                console.log('fs',videodata[0].filePath)
                for (let i = 0; i < videodata.length; i++){
                    if(fs.existsSync(`uploads/thumbnails/${videodata[i].fileName}`)){
                        fs.rmSync(`uploads/thumbnails/${videodata[i].fileName}`,{ recursive: true, force: true })
                    }
                    fs.unlink(videodata[i].filePath, async ()=>{

                    })
                    VideoDatas.push(videodata[i].fileName)
                    await VideoInfo.delete(videodata[i].filePath)
                } return {success : true ,VideoDatas}
            }
        }catch(err){
            return { success : false, err}
        }
    }
}
module.exports = Video