const User=require('../../models/User')
const UserStorage=require('../../models/UserStorage')
const process={
    //클라이언트 쪽 로그인 정보 받아 와서 인스턴스 
      login : async(req,res)=>{
      const user =new User(req.body)
      const response = await user.login(req)
       console.log('로그인 성공여부:',response)
      return res.json(response)
      },
      auth :async (req, res)=>{
         const response=await UserStorage.UserInfo(req.session.uid)
         if(req.session.uid===undefined){
            return await res.json({inAuth : false, error : true})}
            else await res.status(200).json({
            userName : req.session.name,
            isAdmin :req.session.role === 0 ? false : true ,
            isAuth : true,
            email:req.session.email,
            nickname: response.nickname,
            uid : req.session.uid,
            role : req.session.role,
            image : response.image,
            })
   },
   logout : (req,res)=>{
      req.session.destroy((err)=>{
         req.session;
      req.session = null;
      return res.status(200).send({ success : true})
         });
   },
   register : async(req,res)=>{
      const user = new User(req.body);
      // console.log(user)
      const response = await user.register();
      console.log('회원가입 :',response)
      return res.json(response)
   },
   UserInfo :async (req,res)=>{
      try{const Writer=req.body.userTo
         console.log("ASDASDASDASD",Writer)
      const response=await UserStorage.UserInfo(Writer)
      return res.json({success : true ,userInfo : response})
    }catch(err){
      console.log(err)
      return {success : false, err }
    }
   }
}

module.exports={process}