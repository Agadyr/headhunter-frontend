'use client'
import Link from "next/link"
import { deleteResume } from "@/app/store/slices/resumeSlice"
import { useDispatch } from "react-redux"
export default function MyVacancy({item}){
    const dispatch = useDispatch()
    return(
        <div className="card mtb4">
            <Link className="h3 link mb2" href={`/vacansy/${item.id}`}>{item.name}</Link>
            <p className="mtb2">Создан {item.createdAt}</p>
            <h3>Статистика</h3>
            <span className="deleteResume" onClick={() => dispatch(deleteResume(item.id))}>Удалить</span>
        </div>
    )
}