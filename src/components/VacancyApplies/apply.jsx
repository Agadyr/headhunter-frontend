'use client'
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { getAgeFromBirthday } from "@/app/utils/format"
import { acceptApply, desclinedApply } from "@/app/store/slices/applySlice"
export default function Apply({item}){
    const dispatch = useDispatch()
    const age = getAgeFromBirthday(item.resume.birthday)
    let skills = [];
    if (item.resume.skills) skills = item.resume.skills.split(",");

    return(
        <div className="card card-resumes">
            <span className="redBall"></span>
            <Link className="link fwb " href={`/resumes/${item.resume.id}`}>{item.resume.position}</Link>
            <p>{item.resume.first_name} {item.resume.last_name}, Возраст:{age}</p>
            <h3>{item.resume.salary} {item.resume.salary_type}</h3>
            <h4 className="h4-contacts">Контакты</h4>
            <div className="contacts">
                <img src="/images/trusted.svg" alt="" />
                <p className=""> {item.resume.phone}</p>
            </div>

            {skills.map((skill,index) => (
              <span key={`${skill}-${index}`} className="tag  mr2 tag-vacancy">{skill}</span>
            ))}

            <div className="flex">
                {item.status !== "INVITATION" && <button className="black-bordered mr2" onClick={() => dispatch(acceptApply(item.id))}>Пригласить</button>}
                {item.status !== "DECLINED" && <button className="black-bordered" onClick={() => dispatch(desclinedApply(item.id))}>Отказать</button>}
            </div>


        </div>
    )
}