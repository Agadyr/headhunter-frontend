import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/config/end-point";


let initialState = {
    applies:[],
    apply:{},
}

export const applySlice = createSlice({
    name:"apply",
    initialState,
    reducers:{
        AppendApply:(state,action)=>{
            state.applies = [...state.applies,action.payload]
        },
        setApplies:(state,action) => {
            state.applies = action.payload
        },
        removeApply:(state,action) => {
            let applies = [...state.applies]
            applies = applies.filter(item => item.id !== action.payload)
            state.applies = applies
        },
        SetApplyStatus:(state,action) => {
            let applies = [...state.applies]
            applies = applies.map(item => {
                if(item.id === action.payload.applyId){
                    item.status = action.payload.status
                }
                return item
            })
            state.applies = applies
        }
    }
})

export const {AppendApply,SetError,setApplies,removeApply,SetApplyStatus} = applySlice.actions


export const getEmployeeApplies = (data) => (dispatch) =>{
    axios.get(`${END_POINT}/api/applies/employee`).then(res => {
        dispatch(setApplies(res.data))
    }).catch(e => {
        console.log(e);
    })
}

export const getVacancyApplies = (id) => (dispatch) =>{
    axios.get(`${END_POINT}/api/applies/vacancy/${id}`).then(res => {
        dispatch(setApplies(res.data))
    }).catch(e => {
        console.log(e);
    })
}

export const createApply = (data) => (dispatch) =>{
    axios.post(`${END_POINT}/api/applies`,data).then(res => {
        dispatch(AppendApply(res.data))
    }).catch(e => {
        console.log(e);
    })
}

export const acceptApply = (applyId) => (dispatch) =>{
    axios.put(`${END_POINT}/api/applies/accept/employee`,{applyId}).then(res => {
        dispatch(SetApplyStatus({applyId, status:"INVITATION"}))
    }).catch(e => {
        console.log(e);
    })
}

export const desclinedApply = (applyId) => (dispatch) =>{
    axios.put(`${END_POINT}/api/applies/decline/employee`,{applyId}).then(res => {
        dispatch(SetApplyStatus({applyId, status:"DECLINED"}))
    }).catch(e => {
        console.log(e);
    })
}


export const deleteApply = (id) => (dispath) => {
    axios.delete(`${END_POINT}/api/applies/${id}`).then(res => {
        dispath(removeApply(id))
    })
}

export default applySlice.reducer