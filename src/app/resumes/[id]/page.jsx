"use client";
import Header from "@/components/header";
import MyResumes from "@/components/myresumes";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResumeById } from "@/app/store/slices/resumeSlice";
import { useParams } from "next/navigation";
export default function ResumePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const resume = useSelector((state) => state.resume.resume);
  const didMount = () => {
    dispatch(getResumeById(id));
  };
  console.log(resume);
  useEffect(didMount, []);
  const birthday = new Date(resume.birthday);
  const MonthsInRussian = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];
  const MonthsInRussian2 = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  let age = 0;
  age = new Date().getTime() - birthday.getTime();
  age = parseInt(age / (1000 * 60 * 60 * 24 * 365));

  const showPhone = (phone) => {
    let res = "";
    if (phone[0] === "8") {
      phone = "+7" + phone.slice(1, phone.length);
    }

    res = `${phone.slice(0, 2)} (${phone.slice(2, 5)} ${phone.slice(
      5,
      8
    )}-${phone.slice(8, 10)}-${phone.slice(10, 12)})`;
    return res;
  };

  let skills = [];
  if (resume.skills) skills = resume.skills.split(",");
  return (
    <main>
      <Header />
      <div>
        <div className="container">
          <div className="flex flex-ai-c flex-jc-sb p7b7">
            <Link href="/resumes" className="link">
              К списку резюме
            </Link>
            <Link className="button button-secondary-bordered"href="/edit-resume">
              Редактировать
            </Link>
          </div>
          <h1>{resume.first_name} {resume.last_name}</h1>

          <p className="mt2">
            {resume.gender} {age} лет, родился {birthday.getDate()}{" "}
            {MonthsInRussian[birthday.getMonth()]} {birthday.getFullYear()}
          </p>

          <p className="secondary mt2 gray">Контакты</p>
          <p className="mt1">{resume.phone && showPhone(resume.phone)}</p>
          <p className="mt2">{resume.email}</p>
          {resume.city && (
            <p className="mt2"> Место проживания: {resume.city.name}</p>
          )}
          <div className="flex flex-jc-sb salary mt4">
            <div>
            <h1>{resume.position}</h1>
            </div>
            <div>
              <h2>{resume.salary} {resume.salary_type} на руки</h2>
            </div>
          </div>
         
          <p className="mt1">
            Занятость:{" "}
            {resume.employmentTypes &&
              resume.employmentTypes.map((et) => `${et.name} `)}
          </p>

          <h3 className="mt4 gray">Опыт работы</h3>

          {resume.workingHistories &&
            resume.workingHistories.map((job) => {
              let start = new Date(job.start_date);
              let end = new Date(job.end_date);
              return (
                <div className="flex work-history-ofuser mt2" >
                  <div className="working-history-date">
                    <p className="lh">
                    {MonthsInRussian2[start.getMonth()]} {start.getFullYear()} -{" "}
                    {MonthsInRussian2[end.getMonth()]} {end.getFullYear()}
                    </p>

                  </div>
                  <div className="working-history-info">
                    <h4>{job.company_name}</h4>
                    <h4>{job.company_description}</h4>
                    <h4>{job.responsibilities}</h4>
                  </div>
                </div>
              );
            })}

          <h3 className="mt4 gray"> Ключевые навыки</h3>

          {skills.map((skill) => (
            <span className="tag p2 mr2">{skill}</span>
          ))}

          <h3 className="mt4 gray"> Обо мне</h3>

          <p>{resume.about}</p>

          <h3 className="mt4 gray"> Высшее образование</h3>
          {resume.education &&
            resume.education.map((eds) => {
              let end = new Date(eds.end_date);
              return (
                <div className="flex work-history-ofuser mt2">
                  <div className="working-history-date">
                    {end.getFullYear()}
                  </div>
                  <div className="working-history-info">
                    <h4>{eds.university_name}</h4>
                    <p>{eds.major}</p>
                  </div>
                </div>
              );
            })}

          <h3 className="mt2 gray"> Знание языков</h3>
          {resume.foreignLanguages &&
            resume.foreignLanguages.map((fr) => (
              <p className="tag mr2">
                {fr.name} - {fr.level}
              </p>
            ))}
          <h3 className="mt2 gray">Гражданство</h3>
          <h4 className="">Гражданство {resume.citizenshipObj && resume.citizenshipObj.name}</h4>
          <h4 className="">Город {resume.city && resume.city.name}</h4>
        </div>

        
      </div>
    </main>
  );
}
