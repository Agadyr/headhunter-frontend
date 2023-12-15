import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { END_POINT } from "@/config/end-point";

const token = localStorage.getItem("token")

let initialState = {
    isAuth:false,
    currentUSer:null,
    tokenExt:0
}
if(token){
    let decodedToken = jwtDecode(token)
    if(decodedToken.exp * 1000 > Date.now()){
        initialState = {
            isAuth:true,
            currentUSer:{
                id:decodedToken.id,
                email:decodedToken.email,
                full_name:decodedToken.full_name,
                phone:decodedToken.phone,
                role:decodedToken.role
            },
            tokenExt:decodedToken.exp
        }
        console.log(initialState);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }else{
        localStorage.removeItem("token")
    }
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        authorize:(state,action) => {
            localStorage.setItem("token",action.payload.token)
            const decoded  = jwtDecode(action.payload.token)
            state.currentUSer = {
                id:decoded.id,
                email:decoded.email,
                full_name:decoded.full_name,
                phone:decoded.phone,
                role:decoded.role

            }
            state.isAuth = true
            state.tokenExt = decoded.exp
        },
        logOut: (state) =>{
            state.isAuth = false,
            state.currentUSer = null,
            state.exp = 0,
            localStorage.removeItem("token")
        }
    }
})

export const {authorize,logOut} = authSlice.actions

export const sendVerifacationEMail = (email) => (dispatch) =>{
    axios.post(`${END_POINT}/api/auth/sendmail`,{
        email
    })
}
export const VerifyCode = (email,code) => (dispatch) =>{
    axios.post(`${END_POINT}/api/auth/verifycode`,{
        email,
        code
    }).then(res => {
        dispatch(authorize(res.data))
    })
}


export default authSlice.reducer