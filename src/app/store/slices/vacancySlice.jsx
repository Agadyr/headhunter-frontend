import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/config/end-point";



export const VacancySlice = createSlice({
    name:"vacancy",
    initialState:{
        vacancies:[],
        vacancy:{},
        specializations:[],
        cities:[],
        experiences:[],
        skills:[],
        empTypes:[]
    },
    reducers:{
        SetMyVacancies: (state,action) => {
            state.vacancies = action.payload.vacancies
        },
        setVacancy: (state,action) => {
            state.vacancy = action.payload.vacancy
        },
        uppendVacancy: (state,action) => {
            state.vacancies = [...state.vacancies,action.payload.newvacancy]
        },
        handleDeletedVacancy:(state,action) => {
            let vacancies = [...state.vacancies]
            vacancies = vacancies.filter(item => item.id !== action.payload )
            state.vacancies = vacancies
        },
        setSpecializations:(state,action) => {
            state.specializations = action.payload
        },
        setCities:(state,action) => {
            state.cities = action.payload
        },
        setExperiences:(state,action) => {
            state.experiences = action.payload
        },
        setSkills:(state,action) => {
            state.skills = action.payload
        },
        setEmpTypes:(state,action)=>{
            state.empTypes = action.payload
        }
    }
})

export const {SetMyVacancies,uppendVacancy,setVacancy,handleDeletedVacancy,setSpecializations,setCities,setExperiences,setSkills,setEmpTypes} = VacancySlice.actions

export const getMyvacancies = () => async(dispatch) =>{
    try {
        const res = await axios.get(`${END_POINT}/api/vacancy`)
        console.log(res.data);
        dispatch(SetMyVacancies({vacancies:res.data}))
    } catch (error) {
        alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта")
    }

    
}

export const getSpecializations = () => async(dispatch) =>{
    try {
        const res = await axios.get(`${END_POINT}/api/specializations`)
        dispatch(setSpecializations(res.data))
    } catch (error) {
        alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта")
    }

    
}

export const getCities = () => async(dispatch) => {
    try {
       const res = await axios.get(`${END_POINT}/api/region/cities`)
       dispatch(setCities(res.data))
    } catch (error) {
        alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта")

    }

}


export const getexperiences = () => async(dispatch) => {
    try {
       const res = await axios.get(`${END_POINT}/api/experiences`)
       dispatch(setExperiences(res.data))
    } catch (error) {
        alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта")

    }

}


export const getSkills = () => async(dispatch) => {
    try {
       const res = await axios.get(`${END_POINT}/api/skills`)
       dispatch(setSkills(res.data))
    } catch (error) {
        alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта")

    }

}

export const getEmpTypes= () => async(dispatch) => {
    try {
       const res = await axios.get(`${END_POINT}/api/employment-types`)
       dispatch(setEmpTypes(res.data))
    } catch (error) {
        alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта")

    }

}


// export const getResumeById = (id) => async(dispatch) =>{
//     try {
//         const res = await axios.get(`${END_POINT}/api/resume/${id}`)
//         dispatch(setResume({resume:res.data}))
//     } catch (error) {
//         alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта")
//     }

    
// }
// export const createResume = (sendData,router) => async (dispatch) => {
//     try {
//         const res = await axios.post(`${END_POINT}/api/resume`,sendData)
//         router.push("/resumes")
//         dispatch(uppendResume({newresume:res.data}))
//     } catch (error) {
//         alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта")
//     }
// }

// export const editResume = (sendData,router) => async (dispatch) => {
//     try {
//         const res = await axios.put(`${END_POINT}/api/resume`,sendData)
//         router.push("/resumes")
//     } catch (error) {
//         alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта")
//     }
// }

// export const deleteResume = (id) => async (dispatch) => {
//     try {
//         const res = await axios.delete(`${END_POINT}/api/resume/${id}`)
//         dispatch(handleDeletedResume(id))
//     } catch (error) {
//         alert("Что то пошло не так, сообщите о ошибке Тех спецам сайта")
//     }
// }
export default VacancySlice.reducer