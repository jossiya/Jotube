const db=require('../config/db')
const bcrypt= require("bcrypt");
const saltRounds = 10;


class UserStorage{
    //로그인 개인 정보
    static getUserInfo(email,req){
        // console.log('login :',email)
        return new Promise((resolve,reject)=>{
            const query="SELECT * FROM users3 WHERE email=?;"
            db.query(query,[email],(err,data)=>{
                if(err) reject(`${err}`)
                else resolve(data[0])
                console.log(data[0])
                if(data[0]!==undefined){
                    req.session.uid=data[0].uid;
                    req.session.email=data[0].email;
                    req.session.name=data[0].name;
                    req.session.nickname=data[0].nickname;
                    req.session.role=data[0].role;
                    req.session.image=data[0].image;
                    req.session.isLogined=true;
                    req.session.save(()=>{
                    })
                }
            })
        })
    };
    //Auth 변경 정보 갱신
    static UserInfo(uid,req){
        // console.log('loginㅇㅇ :',email)
        // console.log("d",req)
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM users3 WHERE uid=?;"
            db.query(query,[uid], (err, data)=>{
                if(err) reject(`${err}`);
                // console.log(data[0])
                else resolve(data[0])
            
        });
    });
    };
    
    //회원가입
    static save(userInfo){
        return new Promise((resolve, reject)=>{
            const query = "INSERT INTO users3(uid,name, nickname, email, password ) VALUES((REPLACE(UUID(),'-','')), ?, ?, ?, ?);";
            bcrypt.genSalt(saltRounds, (err, salt)=>{
                if(err) return {success : false, err}
                //클라 비번 해쉬로 바꿔서 db 저장
                bcrypt.hash(userInfo.password, salt, (err,hash)=>{
                    if(err) return {success : false, err}
                    // console.log(hash)
                    db.query(query,
                        [userInfo.name,userInfo.nickname, userInfo.email, hash], 
                        (err)=>{
                        if(err) reject(`${err}`);
                        else resolve({ success : true})
                    });
                });
            });
                
        });
    }
}
module.exports=UserStorage