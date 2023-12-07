import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { END_POINT } from "@/config/end-point";
export const authSlice = createSlice({
    name:"auth",
    initialState:{
        isAuth:false,
        currentUSer:null,
        tokenExt:0
    },
    reducers:{
        authorize:(state,action) => {
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
            state.isAuth = false
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