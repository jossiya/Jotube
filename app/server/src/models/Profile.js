const db=require('../config/db')

class Pofile{
   static profileImageSave(info){
    return new Promise((resolve, reject)=>{
        const query = "UPDATE users3 set image=?,nickname=?  WHERE uid=?;"
        db.query(query,[info.FilePath,info.NickName,info.userId], (err, data)=>{
            if(err) reject(`${err}`);
            // console.log(data[0])
            else resolve(true)
        })})
    };
}
module.exports=Pofile