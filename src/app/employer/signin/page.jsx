
'use client'
import { SetError } from "@/app/store/slices/authSlice"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
export default function EmployerSignin() {
    const [email,Setemail] = useState('')
    const[password,SetPassword] = useState('')
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

    }
return (
    <main className="bg">
        <div className="container">
            <div className="auth-header">
                <img className="mb2" src="/images/logo.svg" alt="" />
                <section className="login-page"> 
                    <div className="card mb5">
                        <h1 className="mtb4">Вход для поиска сотрудников</h1>
                        <p>В завершении на почту придёт пароль</p>
                        <form>
                            <input className="inputauth" placeholder="Введите email" value={email} onChange={(e) => Setemail(e.target.value)}/>
                            <input className="inputauth" placeholder="Введите пароль" value={password} onChange={(e) => SetPassword(e.target.value)}/>
                            <button className="button button-primary" type="button" onClick={() => handleSignIn()}> Войти</button>
                        </form>
                        <div className="flex flex-jc-sb mtb4">
                            <Link className="link" href="/">Войти</Link>
                            <Link className="link" href="/">Я ищу работу</Link>
                        </div>
                        <p>Продолжая регистрацию на сайте любыми доступными способами, вы подтверждаете, что ознакомлены и полностью согласны с <a href="" className="link">условиями использования сайта</a></p>
                        {error && Object.keys(error).map(key => ( <p key={key}  className="error">{ error[key] }</p>))}
                    </div>
                </section>
            </div>
        </div>

    </main>
)
}
