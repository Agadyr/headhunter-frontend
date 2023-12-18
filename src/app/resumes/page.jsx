'use client'
import { useDispatch,useSelector } from 'react-redux'
import Header from '../../components/header'
import MyResumes from '../../components/myresumes'
import { useEffect } from 'react'
import { getMyresumes } from '../store/slices/resumeSlice'
import Link from 'next/link'
export default function ResumePage() {

  const dispatch = useDispatch()
  const resumes = useSelector((state) => state.resume.resumes)
  const didMount = () =>{
    dispatch(getMyresumes())
  }
  useEffect(didMount, [])

  return (
    <main>
      <Header/>
      <div>
        <div className='container'>
            <div className='flex flex-ai-c flex-jc-sb p7b7'>
              <h1>Мои резюме</h1>
              <Link className='button button-secondary-bordered' href="/create-resume">Создать резюме</Link>
            </div>
            <MyResumes resumes={resumes}/>
        </div>
      </div>
    </main>
  )
}
