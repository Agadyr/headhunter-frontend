'use client'
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { getAgeFromBirthday } from "@/app/utils/format"
export default function Apply({item}){
    const dispatch = useDispatch()
    const age = getAgeFromBirthday(item.resume.birthday)
    let skills = [];
    if (item.resume.skills) skills = item.resume.skills.split(",");

    return(
        <div className="card card-resumes">
            <Link className="link" href={`/resumres/${item.resume.id}`}>{item.resume.position}</Link>
            <p>{item.resume.first_name} {item.resume.last_name}, Возраст:{age}</p>
            <h3>{item.resume.salary} {item.resume.salary_type}</h3>

            {skills.map((skill,index) => (
              <span key={`${skill}-${index}`} className="tag p2 mr2">{skill}</span>
            ))}
            <div className="flex">
                <button className="button button mr2">Пригласить</button>
                <button className="button button">Отказать</button>
            </div>


        </div>
    )
}