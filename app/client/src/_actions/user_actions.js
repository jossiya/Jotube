import axios from "axios";
import {userActions} from '../_reducers/user_reducer'

//로그인
export  function loginUser(dataToSubmit){
    return async(dispatch)=>{
        const reqeust = await axios.post('/api/login',dataToSubmit)
    .then(response=>response.data)
    console.log('로그인 api 정보:', reqeust)
        return dispatch(userActions.LoginUser(reqeust))
    }
    
};
//회원가입
export function registerUser(dataToSubmit){
    return async (dispatch)=>{ 
    const reqeust =await axios.post('/api/register',dataToSubmit)
        .then(response=>response.data)
        
        return dispatch(userActions.RegisterUser(reqeust))
    }
};
//로그인 유저 세션
export function auth(){
    return async (dispatch)=>{
        const reqeust = await axios.get('/api/auth')
    .then(response=>response.data)
    
    return dispatch(userActions.AuthUser(reqeust))
    }
    
};
//로그아웃
export function logoutUser(){
    return async(dispatch)=>{
        const request = await axios.get(`/api/logout`)
    .then(response => response.data);
    return dispatch(userActions.LogoutUser(request))
    }
}