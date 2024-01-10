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
        }
    }
})

export const {AppendApply,SetError,setApplies} = applySlice.actions


export const getEmployeeApplies = (data) => (dispatch) =>{
    axios.get(`${END_POINT}/api/applies/employee`,data).then(res => {
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


export default applySlice.reducer