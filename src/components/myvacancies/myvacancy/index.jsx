'use client'
import { deleteVacancy } from "@/app/store/slices/vacancySlice"
import Link from "next/link"
import { useDispatch } from "react-redux"
export default function MyVacancy({item}){
    const dispatch = useDispatch()
    return(
        <div className="card mtb4">
            <Link className="h3 link mb2" href={`/vacansy/${item.id}`}>{item.name}</Link>
            <p className="mtb2">Создан {item.createdAt}</p>
            <h3>Статистика</h3>
            <span className="deleteResume" onClick={() => dispatch(deleteVacancy(item.id))}>Удалить</span>
        </div>
    )
}