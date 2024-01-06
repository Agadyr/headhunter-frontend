
'use client'
import Header from "@/components/header"
import { SetError } from "@/app/store/slices/authSlice"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signIn } from "@/app/store/slices/authSlice"
import { useRouter } from "next/navigation"
export default function EmployerSignin() {
    const [email,Setemail] = useState('')
    const[password,SetPassword] = useState('')
    const router = useRouter()
    const dispatch = useDispatch()
    const error = useSelector((state) => state.auth.error)
    useEffect(() => {
        return () => {
            dispatch(SetError(null))
        }
    },[])
    const OnLogoChange = (e) => {
    }
    const handleSignIn = () => {
        dispatch(signIn({
            email,
            password
        },router))
    }
return (

    <main className="">
        <Header/>
        <div className="container">
            <div className="auth-header mt2">
                <section className="login-page"> 
                    <div className="card mb5">
                        <h1 className="mtb4">Поиск сотрудников</h1>
                        <form>
                            <input className="inputauth" placeholder="Введите email" value={email} onChange={(e) => Setemail(e.target.value)}/>
                            <input className="inputauth" placeholder="Введите пароль" value={password} onChange={(e) => SetPassword(e.target.value)}/>
                            <button className="button button-primary" type="button" onClick={() => handleSignIn()}> Войти в личный кабинет</button>
                        </form>
                        <div className="flex flex-jc-sb mtb4">
                            <Link className="link" href="/employer/signup">Регистрация для поиска сотрудников</Link>
                        </div>
                        {error && Object.keys(error).map(key => ( <p key={key}  className="error">{ error[key] }</p>))}
                    </div>
                    <div className="card card-search-work">
                        <h1 className="">Поиск работы</h1>
                        <h2 className="mtb4">Публикация резюме и поиск по вакансиям</h2>
                        <Link href='/login' className="button button-primary btn-hover">Я ищу работу</Link>
                    </div>
                </section>
            </div>
        </div>

    </main>
)
}
