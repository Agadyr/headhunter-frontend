'use client'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { authorize, sendVerifacationEMail, VerifyCode } from "@/app/store/slices/authSlice"
export default function userLogin(){
    const isAuth = useSelector((state) => state.auth.isAuth)
    const [step, setStep] = useState(1)
    const[email,Setemail] = useState('')
    const[code,setCode] = useState('')
    const[time,setTime]  = useState(119)
    const router = useRouter()
    const dispatch = useDispatch()
    const sendVerifyEmail  = (e) =>{
        dispatch(sendVerifacationEMail(email))
        setStep(2)
    }
    const VerifyCodeFunc = () =>{
        dispatch(VerifyCode(email,code))
    }
    useEffect(() =>{
        let interval;
        if(step === 2){
            interval = setInterval(() =>{
                if(time !== 0)
                {
                    // setTime((time) => time- 1) не правильно работает
                    setTime(time => time - 1) //Более менее
                }
            },1000)
        }else if(interval){
            clearInterval(interval)
        }
    },[step])
    useEffect(() =>{
        if(isAuth) router.push("/resumes")
    },[isAuth])
    const minutes = parseInt(time/60)
    const sec = time % 60
    return(
        <section className="login-page"> 
            {isAuth ? "true":"false"}
            {step === 1 && <div className="card">
                <form>
                    <h1>Поиск Работы</h1>
                    <input className="inputauth" placeholder="Введите email" value={email} onChange={(e) => Setemail(e.target.value)}/>
                    <button className="button button-primary" onClick={sendVerifyEmail}>Продолжить</button>
                </form>
            </div>}
            {step === 1 && <div className="card">
                <div className="card_for_offer">
                    <h1>Поиск Сотрудников</h1>
                    <p>Размещение вакансий и доступ к базе резюме</p>
                    <button className="button button-primary-bordered">Я ищу Сотрудников</button>
                </div>
            </div>}
            {step === 2 &&
            <div className="card card_modal">
                <h1>Отправили код на ...</h1>
                <p>Напишите его что бы потвердить что это вы, а не кто то другой</p>
                <form>
                    <input className="inputauth" placeholder="Введите код" value={code} onChange={(e) => setCode(e.target.value)}/>
                    <p>Повторить можно через {minutes}:{sec}</p>
                    <button className="button button-primary" onClick={VerifyCodeFunc} type="button">Продолжить</button>
                    <button className="button button-primary-bordered" onClick={() => setStep(1)}>Назад</button>
                </form>
            </div>}
        </section>
    )
}