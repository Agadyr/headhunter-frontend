'use client'
import Link from "next/link"
import { deleteResume } from "@/app/store/slices/resumeSlice"
import { useDispatch } from "react-redux"
export default function Myresume({item}){
    const dispatch = useDispatch()
    return(
        <div className="card mtb4">
            <Link className="h3 link mb2" href={`/resumes/${item.id}`}>{item.position}</Link>
            <p className="mtb2">Создан {item.createdAt}</p>
            <h3>Статистика</h3>
            <div className="flex">
                <a  className="p3" href="">0 показов</a>
                <a className="p3" href="">0 просмотров</a>
                <a className="p3" href="">0 приглашений</a>
            </div>
            <span className="deleteResume" onClick={() => dispatch(deleteResume(item.id))}>Удалить</span>
        </div>
    )
}