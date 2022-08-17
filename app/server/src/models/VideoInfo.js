const db = require("../config/db");

class VideoInfo{
    //모달 드랍존 기본 저장
    static save(videoInfo){
        // console.log('디비 정보',videoInfo)
        return new Promise((resolve,reject)=>{
            const query = "INSERT INTO video(videoid, writer, title, description, privacy,fileName, filePath, category, views, duration,thumbnailName,thumbnailPath) VALUES((REPLACE(UUID(),'-','')), ?, ?, ?,?,?,? ,? ,? ,? ,? ,? );";
        db.query(query,
            [videoInfo.writer,videoInfo.fileName, videoInfo.description, videoInfo.privacy,videoInfo.fileName,videoInfo.filePath, videoInfo.category, videoInfo.views, videoInfo.duration,videoInfo.thumbnailName ,videoInfo.thumbnail], 
            (err)=>{
            if(err) reject(`${err}`);
            else resolve({ success : true})
            })
        })
    };
    // 내가 올린 비디오들
    static videoInfos(){
        return new Promise((resolve, reject)=>{
            const query = "select * from users3,video WHERE uid=writer order by title asc;";
            db.query(query, (err, data)=>{
                if(err) {reject(`${err}`);
                // console.log(data)
            }
                else resolve(data)
            })
        })
    };
    //디테일 페이지 비디오 정보
    static videoInfo(videoid){
        // console.log('db',videoid)
        return new Promise((resolve, reject)=>{
            const query = "select * from video left outer join users3 on users3.uid=video.writer WHERE videoid =?;"
            db.query(query, [videoid.videoid],(err, data)=>{
                if(err) {reject(`${err}`);
                console.log(data)
            }
                else resolve(data[0])
            })
        })
    };
    static modalvideoInfo(videoid){
        // console.log('dbd',videoid)
        return new Promise((resolve, reject)=>{
            const query = "select * from video WHERE videoid=? order by title asc;";
            db.query(query, [videoid.videoid],(err, data)=>{
                if(err) {reject(`${err}`);
                console.log(data)
            }
                else {resolve(data[0]),console.log('디비 모달 가져온거',data[0])} 
            })
        })
    };
    static getmyvideoinfos(uid){
        // console.log('db',uid.uid)
        return new Promise((resolve, reject)=>{
            const query = "select * from video WHERE writer=? order by title asc;";
            db.query(query, [uid.uid],(err, data)=>{
                if(err) {reject(`${err}`);
                // console.log(data)
            }
                else resolve(data)
            })
        })
    };
    //채널 비디오
    static getcvideoinfos(uid){
        // console.log('db',uid)
        return new Promise((resolve, reject)=>{
            const query = "select * from video WHERE writer=? order by in_date asc;";
            db.query(query, [uid.uid],(err, data)=>{
                if(err) {reject(`${err}`);
                // console.log(data)
            }
                else resolve(data),console.log(data)
            })
        })
    };
    //모달
    static getmyvideoinfo2(path){//모달쪽 api 
        // console.log('db1',videoid)
        return new Promise((resolve, reject)=>{
            const query = "select * from video WHERE filePath=? order by title asc;";
            db.query(query, [path],(err, data)=>{
                if(err) {reject(`${err}`);
            }
                else resolve(data[0])
            })
        })
    };
    
    //삭제
    static getmyvideoinfo(videoid){ //비디오 아이디로 삭제될 비디오들 정보
        // console.log('db1',videoid)
        return new Promise((resolve, reject)=>{
            const query = "select * from video WHERE videoid IN(?) order by title asc;";
            db.query(query, [videoid],(err, data)=>{
                if(err) {reject(`${err}`);
            }
                else resolve(data)
            })
        })
    };
    static delete(Videoid){
        // console.log('dbde',Videoid)
        return new Promise((resolve,reject)=>{
            const query="DELETE FROM video where filePath=? ;";
            db.query(query,[Videoid],
                (err,data)=>{
                    if(err) reject(`${err}`)
                    else resolve(true)
                })
        })
    };

    //최종 업로드
    static VideoEndUpload(VideoInfo){
        return new Promise((resolve,reject)=>{
            const query="UPDATE video SET title=?, description=?, thumbnailName=? ,thumbnailPath=?, category=?, privacy=?, restriction=? WHERE videoid=? ;";
            db.query(query,[VideoInfo.title, VideoInfo.description,VideoInfo.thumbnailName, VideoInfo.thumbnailPath, VideoInfo.category, VideoInfo.privacy, VideoInfo.restriction, VideoInfo.videoid],
                (err,data)=>{
                    if(err) reject(`${err}`)
                    else resolve(true)
                })
        })
    };
    //내가 구독한 비디오들 불러오기
    static subvideoInfos(user){
        // console.log('쿼리:',user)
        return new Promise((resolve, reject)=>{
            const query="select * from video left outer join users3 on users3.uid=video.writer where uid in (?) order by video.in_date asc;";
            db.query(query,[user],(err, data)=>{
                if(err) {reject(`${err}`);
                // console.log('db쪽 구독한 비디오들',data)
            }
                else resolve(data)
              
            })
        })
    };
    //뷰 조회수 업데이트
    static viewscnt(videoid){
        // console.log("db",videoid)
        return new Promise((resolve,reject)=>{
            const query="UPDATE video SET views=views+1 where videoid=? ;";
            db.query(query,[videoid.videoid],
                (err,data)=>{
                    if(err) reject(`${err}`)
                    else resolve(true)
                })
        })
    }
}


module.exports=VideoInfo