const db = require("../config/db");

class Like{

    //좋아요 프로세스
    //비디오
    static getlike(videoid){
        return new Promise((resolve,reject)=>{
            const query='SELECT * FROM liked where videoid=? or commentid=?;';
            db.query(query,[videoid.videoId,videoid.commentId],
                (err,data)=>{
                    if(err) reject(`${err}`)
                    else resolve(data)
                })
        })
    };
    static getdislike(videoid){
        return new Promise((resolve,reject)=>{
            const query='SELECT * FROM disliked where videoid=? or commentid=?;';
            db.query(query,[videoid.videoId,videoid.commentId],
                (err,data)=>{
                    if(err) reject(`${err}`)
                    else resolve(data)
                })
        })
    };
        static likesave(info){
        return new Promise((resolve,reject)=>{
            const query="INSERT INTO liked(likeid,userid,commentid,videoid) VALUES((REPLACE(UUID(),'-','')), ?, ?, ? );";
            db.query(query,[info.userId,info.commentId,info.videoId,],
                (err,data)=>{
                    if(err) reject(`${err}`)
                    else resolve(true)
                })
        })
    };
    static dislikedelete(info){
        return new Promise((resolve,reject)=>{
            const query="DELETE FROM disliked where videoid=? or commentid=? ";
            db.query(query,[info.videoId,info.commentId],
                (err,data)=>{
                    if(err) reject(`${err}`)
                    else resolve(true)
                })
        })
    }
    static likedelete(info){
        return new Promise((resolve,reject)=>{
            const query="DELETE FROM liked where videoid=? or commentid=? ";
            db.query(query,[info.videoId,info.commentId],
                (err,data)=>{
                    if(err) reject(`${err}`)
                    else resolve(true)
            })
        })
    }    
//싫어요 프로세스
    
    static dissave(info){
        return new Promise((resolve,reject)=>{
            const query="INSERT INTO disliked(likeid,userid,commentid,videoid) VALUES((REPLACE(UUID(),'-','')), ?, ?, ? );";
            db.query(query,[info.userId,info.commentId,info.videoId,],
                (err,data)=>{
                    if(err) reject(`${err}`)
                    else resolve(true)
                })
        })
    };
    //좋아요한 비디오 정보 가져오기
    static likedVideoId(uid){
        return new Promise((resolve,reject)=>{
            const query='SELECT videoid FROM liked where userid=?;';
            db.query(query,[uid.uid],
                (err,data)=>{
                    if(err) reject(`${err}`)
                    else resolve(data)
                })
        })
    };
    static likedVideos(videoid){
        // console.log('db',videoid)
        return new Promise((resolve,reject)=>{
            const query='SELECT * FROM video left outer join users3 on users3.uid=video.writer where videoid in (?) order by video.in_date asc ;';
            db.query(query,[videoid],
                (err,data)=>{
                    if(err) reject(`${err}`)
                    else resolve(data)
                        // console.log(data)
                })
        })
    };
}

module.exports=Like