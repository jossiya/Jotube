import { createSlice } from '@reduxjs/toolkit'

//기본 설정 값
let initialState={
 loginSuccess : null,
 regisgterSuccess : null,
 userData :null,
 logoutSuccess : null,
}

const userProcess=createSlice({
    name : "USERS",
    initialState ,
    reducers : {
        LoginUser(state,action){
            state.loginSuccess=action.payload
        },
        RegisterUser(state,action){
            state.regisgterSuccess=action.payload
        },
        AuthUser(state,action){
            state.userData=action.payload
        },
        LogoutUser(state,action){
            state.logoutSuccess=action.payload
        }

    }
})
export const userActions= userProcess.actions
export default userProcess.reducer