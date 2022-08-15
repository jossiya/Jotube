const UserStorage=require('./UserStorage')
const bcrypt=require('bcrypt')

class User { 
    constructor(body){
        this.body=body
    }
    //클라이언트 로그인 정보랑 디비 정보랑 일치
    async login(req){
        const client=this.body
        // console.log('클라이언트 로그인 정보:', client)
        //로그인 컨트롤
        try{
            const user= await UserStorage.getUserInfo(client.email,req)
            // console.log('db err:', user)
        if(user){                           //해쉬화 된 디비 패스워드를 클라이언트 패스워드와 비교                           
            if(user.email===client.email&&bcrypt.compareSync(client.password,user.password)){
                return {success : true}
            }return {success : false , msg : "비밀번호가 틀렸습니다"}
        }return {success : false , msg : "존재하지 않는 아이디 입니다."}
        }catch(err){
            return{success : false ,err}
        }
    };
    async register(){
        const client = this.body;
        if(client.email,client.name,client.password==="" || client.err===false){
            return {success : false, msg : "사용자 정보를 모두 입력해주세요"}
        }else{
            // console.log(client)
            try{
                const response = await UserStorage.save(client);
                return response;
            }catch(err){
                return { success : false, err }
            }}
           
    }; 
}

module.exports=User