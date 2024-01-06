'use client'
import Header from "@/components/header"
import Link from "next/link"
import MyVacancies from "@/components/myvacancies"
import { useDispatch } from "react-redux"
import { getMyvacancies } from "../store/slices/vacancySlice"
import { useEffect } from "react"
export default function Vacancy(){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyvacancies())
    },[])
    return(
        <main>
            <Header/>
            <div className="container"> 
                <div className="flex flex-ai-c flex-jc-sb p7b7">
                    <h1>Мои вакансии</h1>
                    <Link className="button button-secondary-bordered" href="/create-vacancy">Создать Вакансию</Link>
                </div>
                <MyVacancies/>
            </div>
        </main> 
    )
}