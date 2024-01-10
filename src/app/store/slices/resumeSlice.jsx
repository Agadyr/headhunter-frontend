import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/config/end-point";



export const resumeSlice = createSlice({
    name:"resume",
    initialState:{
        resumes:[],
        resume:{}
    },
    reducers:{
        setMyResumes: (state,action) => {
            state.resumes = action.payload.resumes
        },
        setResume: (state,action) => {
            state.resume = action.payload.resume
        },
        uppendResume: (state,action) => {
            state.resumes = [...state.resumes,action.payload.newresume]
        },
        handleDeletedResume:(state,action) => {
            let resumes = [...state.resumes]
            resumes = resumes.filter(item => item.id !== action.payload )
            state.resumes = resumes
        }
    }
})

export const {setMyResumes,uppendResume,setResume,handleDeletedResume} = resumeSlice.actions

export const getMyresumes = () => async(dispatch) =>{
    try {
        const res = await axios.get(`${END_POINT}/api/resume`)
        console.log(res.data);
        dispatch(setMyResumes({resumes:res.data}))
    } catch (error) {
        alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта")
    }

    
}

export const getResumeById = (id) => async(dispatch) =>{
    try {
        const res = await axios.get(`${END_POINT}/api/resume/${id}`)
        dispatch(setResume({resume:res.data}))
    } catch (error) {
        alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта")
    }

    
}
export const createResume = (sendData,router) => async (dispatch) => {
    try {
        const res = await axios.post(`${END_POINT}/api/resume`,sendData)
        router.push("/resumes")
        dispatch(uppendResume({newresume:res.data}))
    } catch (error) {
        alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта")
    }
}

export const editResume = (sendData,router) => async (dispatch) => {
    try {
        const res = await axios.put(`${END_POINT}/api/resume`,sendData)
        router.push("/resumes")
    } catch (error) {
        alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта")
    }
}

export const deleteResume = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`${END_POINT}/api/resume/${id}`)
        dispatch(handleDeletedResume(id))
    } catch (error) {
        alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта")
    }
}
export default resumeSlice.reducer