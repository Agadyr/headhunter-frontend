'use client'
import { deleteVacancy, getEmpTypes } from "@/app/store/slices/vacancySlice"
import Link from "next/link"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
export default function MyVacancy({item}){
    const dispatch = useDispatch()
    const experiences = useSelector(state => state.vacancy.experiences)
    console.log(experiences);
    const show = experiences.map(exp => exp.id == item.id)
    console.log(show);
    return(
        <div className="card mtb4">
            <Link className="h3 link mb2" href={`/vacansy/${item.id}`}>{item.name}</Link>
            <h4 className="salary_about">{item.salary_from} - {item.salary_to} {item.salary_type} </h4>
            <h3>Статистика</h3>
            {/* {experiences.filter(exp => exp.id == item.id)} */}
            <span className="deleteResume" onClick={() => dispatch(deleteVacancy(item.id))}>Удалить</span>
        </div>
    )
}