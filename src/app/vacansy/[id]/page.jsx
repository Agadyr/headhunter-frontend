"use client";
import Header from "@/components/header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVacancyById } from "@/app/store/slices/vacancySlice";
import { useParams } from "next/navigation";
import { getMyresumes, setResume } from "@/app/store/slices/resumeSlice";
import { createApply, getEmployeeApplies } from "@/app/store/slices/applySlice";
export default function VacancyPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [resumeId,setResumeId] = useState()
  const vacancy = useSelector((state) => state.vacancy.vacancy);
  const current_user = useSelector(state => state.auth.currentUSer)
  const resumes = useSelector(state => state.resume.resumes)
  const myapplies = useSelector(state => state.apply.applies)
  console.log(current_user);
  const didMount = () => {
    dispatch(getVacancyById(id));
    dispatch(getMyresumes())
    dispatch(getEmployeeApplies())
  };
  useEffect(didMount, []);

  useEffect(() => {
    if(resumes[0]){
      setResumeId(resumes[0].id)
    }
  },[resumes])
 

  let applies = myapplies.some(item => item.vacancyId === id*1)


  let skills = [];
  if (vacancy.skills) skills = vacancy.skills.split(",");
  const handleApply = () => {
    dispatch(createApply({
      resumeId,
      vacancyId:id
    }))
  }
  return (
    <main>
      <Header />
      <div>
        <div className="container">
          <div className="flex flex-ai-c flex-jc-sb p7b7">

          </div>
          <div className="flex ">
            <div className="card cardvacancyshow">
              <h1>{vacancy.name} </h1>

              <h4 >
              {vacancy.salary_from && `от ${vacancy.salary_from}`} {vacancy.salary_to && `до ${vacancy.salary_to}`} {vacancy.salary_type}
              </h4>
              {vacancy.experience && <p className="mt2">
                  Требуемый опыт работы: {vacancy.experience.duration}
              </p>}

              {vacancy.employmentType && <p>Тип занятости: {vacancy.employmentType.name}</p>}

              {
                current_user && current_user.role.name === "employee" && 
                  (
                    <select className="input mtb4" value={resumeId} onChange={(e) => setResume(e.target.value)}>
                      {resumes.map(item => (<option key={item.id} value={item.id}>{item.position}</option>))}
                    </select>
                  )
    
              }

              {(current_user && vacancy.userId) && (current_user.id !== vacancy.userId) && !applies && <div className="flex flex-ai-c">
                <button className="button button-green" onClick={handleApply}>Откликнуться</button>
                <button className="button button-bordered-green"><img src="/images/greenlike.svg" alt="" /></button>
              </div>}
              {(current_user && vacancy.userId) && (current_user.id !== vacancy.userId) && applies && <div className="flex flex-ai-c">
                <Link href="/applies" className="button button-green" onClick={handleApply}>Смотреть Отклики</Link>
                <button className="button button-bordered-green"><img src="/images/greenlike.svg" alt="" /></button>
              </div>}
              {(current_user && vacancy.userId) && (current_user.id == vacancy.userId) && 
              <Link className="button button-secondary-bordered"href={`/edit-vacancy/${vacancy.id}`}>
              Редактировать
            </Link>}
            </div>
            <div className="card cardcompanyshow">
                {vacancy.company && <h3>{vacancy.company.name} <img src="/images/trusted.svg" alt="" /></h3>}
                {vacancy.company && <p> {vacancy.city.name} <span className="redBall"></span> {vacancy.company.address}</p>}
            </div>
          </div>


            {vacancy.company && <p className="secondary mt2 fwb">{vacancy.company.name}</p>}
            {vacancy.company && <p className="secondary">{vacancy.company.description}</p>}

            <p className="secondary vac-desc" dangerouslySetInnerHTML={{__html:vacancy.description}}></p>
            <p className="secondary" >{vacancy.address}</p>

            <h3>Ключевые навыки</h3>

            {skills.map((skill,index) => (
            <span key={`${skill}-${index}`} className="tag p2 mr2">{skill}</span>
          ))}
          
        </div>

        
      </div>
    </main>
  );
}
