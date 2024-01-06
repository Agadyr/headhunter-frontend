"use client";
import Header from "@/components/header";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVacancyById } from "@/app/store/slices/vacancySlice";
import { useParams } from "next/navigation";
export default function VacancyPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const vacancy = useSelector((state) => state.vacancy.vacancy);
  const didMount = () => {
    dispatch(getVacancyById(id));
  };
  useEffect(didMount, []);
 


  let skills = [];
  if (vacancy.skills) skills = vacancy.skills.split(",");
  return (
    <main>
      <Header />
      <div>
        <div className="container">
          <div className="flex flex-ai-c flex-jc-sb p7b7">
            {/* <Link className="button button-secondary-bordered"href={`/edit-resume/${resume.id}`}>
              Редактировать
            </Link> */}
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
              <button className="button button-green">Откликнуться</button>
            </div>
            <div className="card cardcompanyshow">
                {vacancy.company && <h3>{vacancy.company.name} <img src="/images/trusted.svg" alt="" /></h3>}
                {vacancy.company && <p> {vacancy.city.name} <span className="redBall"></span> {vacancy.company.address}</p>}
            </div>
          </div>


            {vacancy.company && <p className="secondary mt2 fwb">{vacancy.company.name}</p>}
            {vacancy.company && <p className="secondary">{vacancy.company.description}</p>}

            <p className="secondary vac-desc">{vacancy.description}</p>
            <p className="secondary">{vacancy.address}</p>

            <h3>Ключевые навыки</h3>

            {skills.map((skill) => (
            <span className="tag p2 mr2">{skill}</span>
          ))}
          
        </div>

        
      </div>
    </main>
  );
}
