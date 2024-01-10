'use client'
import Header from "@/components/header"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getVacancyApplies } from "@/app/store/slices/applySlice";
import Applies from "@/components/VacancyApplies"
export default function VacancyApplies(){
    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getVacancyApplies(id))
    },[])

    const applies = useSelector(state => state.apply.applies)
    const [status,SetStatus] = useState('NEW') 
    
    const filteredApplies =  applies.filter(item => item.status === status)
    return(
        <main>
            <Header/>
            <div className="container"> 
                <div className="flex flex-ai-c flex-jc-sb p7b7">
                    <h1>Отклики {applies.length}</h1>
                </div>
                <div className="flex flex-jc-sb">
                    <div className="list">
                        <div className={`list-item ${status === "NEW" ? 'active' : ''}`} onClick={() => SetStatus("NEW")}>Все неразобранные</div>
                        <div className={`list-item ${status === "INVITATION" ? 'active' : ''}`} onClick={() => SetStatus("INVITATION")}>Приглашенный</div>
                        <div className={`list-item ${status === "DECLINED" ? 'active' : ''}`} onClick={() => SetStatus("DECLINED")}>Отказы</div>
                    </div>
                    <div className="w1">
                        <Applies applies={filteredApplies}/>
                    </div>
                </div>

            </div>
        </main> 
    )
}