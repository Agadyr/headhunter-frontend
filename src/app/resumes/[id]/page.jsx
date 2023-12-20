'use client'
import Header from '@/components/header'
import MyResumes from '@/components/myresumes'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getResumeById } from '@/app/store/slices/resumeSlice'
import { useParams } from 'next/navigation'
export default function ResumePage() {
  const dispatch = useDispatch()
  const {id} = useParams()
  const resume = useSelector(state => state.resume.resume)
  const didMount = () => {
    dispatch(getResumeById(id))
  }
  console.log(resume);
  useEffect(didMount,[])
  const birthday = new Date(resume.birthday)
  const MonthsInRussian = [
    'Января','Февраля','Марта','Апреля','Мая','Июня',
    'Июля','Августа','Сентября','Октября','Ноября','Декабря'
]
  let age = 0
  age = new Date().getTime() - birthday.getTime()
  age = parseInt(age / (1000 * 60 * 60 *24 * 365))
  return (
    <main>
      <Header/>
      <div>
        <div className='container'>
            <div className='flex flex-ai-c flex-jc-sb p7b7'>
              <Link href='/resumes' className='link'>К списку резюме</Link>
              <Link className='button button-secondary-bordered' href="/edit-resume">Редактировать</Link>
            </div>
            <h1>{resume.first_name} {resume.last_name}</h1>
            <p>{resume.gender} {age} лет, родился {birthday.getDate()} {MonthsInRussian[birthday.getMonth()]} {birthday.getFullYear()}</p>
            <p className='secondary'>Контакты</p>
            <p>{resume.phone}</p>
       
        </div>
      </div>
    </main>
  )
}
