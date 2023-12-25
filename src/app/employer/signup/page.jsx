
'use client'
import { SetError, signUp } from "@/app/store/slices/authSlice"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
export default function EmployerSignUp() {
    const [email,Setemail] = useState('')
    const [step,Setstep] = useState(1)
    const[first_name,SetfirstName] = useState('')
    const[last_name,SetLastName] = useState('')
    const[company_name,SetCompanyName] = useState('')
    const[company_description,SetCompanyDesk] = useState('')
    const[company_address,SetCompanyAdr] = useState('')
    const[company_logo,SetCompanyLogo] = useState()
    const[password,SetPassword] = useState('')
    const[password2,SetPassword2] = useState('')
    const dispatch = useDispatch()
    const router = useRouter()
    const error = useSelector((state) => state.auth.error)
    console.log(error);
    useEffect(() => {
        return () => {
            dispatch(SetError(null))
        }
    },[])
    const OnLogoChange = (e) => {
        SetCompanyLogo(e.target.files[0])
    }
    const handleSignUp = () => {
        dispatch(signUp({
            email,
            full_name:`${first_name} ${last_name}`,
            company_name,
            company_description,
            company_address,
            company_logo,
            password,
            password2
        },router))
    }
return (
    <main className="bg">
        <div className="container">
            <div className="auth-header">
            <img className="mb2" src="/images/logo.svg" alt="" />
            <section className="login-page"> 
                {step === 1 && <div className="card mb5">
                <h1 className="mtb4">Регистрация для поиска сотрудников</h1>
                <p>В завершении на почту придёт пароль</p>
                    <form>
                        <input className="inputauth" placeholder="Введите email" value={email} onChange={(e) => Setemail(e.target.value)}/>
                        <button className="button button-primary" type="button" onClick={() => Setstep(2)}>Продолжить</button>
                    </form>
                    <div className="flex flex-jc-sb mtb4">
                        <Link className="link" href="/">Войти</Link>
                        <Link className="link" href="/">Я ищу работу</Link>
                    </div>
                    <p>Продолжая регистрацию на сайте любыми доступными способами, вы подтверждаете, что ознакомлены и полностью согласны с <a href="" className="link">условиями использования сайта</a></p>
                    {error && Object.keys(error).map(key => ( <p key={key}  className="error">{ error[key] }</p>))}
                </div>}

                {step === 2 &&
                <div className="card card_modal">
                    <h1>Введите данные</h1>
                    <form>
                        <input className="inputauth" placeholder="Название компании" value={first_name} onChange={(e) => SetfirstName(e.target.value)}/>
                        <input className="inputauth" placeholder="Фамилия" value={last_name} onChange={(e) => SetLastName(e.target.value)}/>
                        <button className="button button-primary"  type="button" onClick={() => Setstep(3)}>Продолжить</button>
                        <button className="button button-primary-bordered" onClick={() => Setstep(1)}>Назад</button>
                    </form>
                    {error && Object.keys(error).map(key => ( <p key={key} className="error">{ error[key] }</p>))}
                </div>}

                {step === 3 &&
                <div className="card card_modal">
                    <h1>Введите название компании</h1>
                    <p>Напишите его что бы потвердить что это вы, а не кто то другой</p>
                    <form>
                        <input className="inputauth" placeholder="Название компании" value={company_name} onChange={(e) => SetCompanyName(e.target.value)}/>
                        <textarea className="textarea" placeholder="Описание" value={company_description} onChange={(e) => SetCompanyDesk(e.target.value)}></textarea>
                        <input className="inputauth" placeholder="Адрес компании" value={company_address} onChange={(e) => SetCompanyAdr(e.target.value)}/>
                        <input type="file" className="inputauth" placeholder="Логотип компании"  onChange={OnLogoChange} />
                        <button className="button button-primary"  type="button" onClick={() => Setstep(4)}>Продолжить</button>
                        <button className="button button-primary-bordered" onClick={() => Setstep(2)}>Назад</button>
                    </form>
                    {error && Object.keys(error).map(key => ( <p key={key} className="error">{ error[key] }</p>))}
                </div>}

                {step === 4 &&
                <div className="card card_modal">
                    <h1>Введите пароль</h1>
                    <p>Напишите его что бы потвердить что это вы, а не кто то другой</p>
                    <form>
                        <input  className="inputauth" placeholder="Введите пароль" value={password} onChange={(e) => SetPassword(e.target.value)}/>
                        <input  className="inputauth" placeholder="Повторите пароль" value={password2} onChange={(e) => SetPassword2(e.target.value)} />
                        {error && Object.keys(error).map(key => ( <p key={key}  className="error">{ error[key] }</p>))}
                        <button className="button button-primary"  type="button"  onClick={handleSignUp}>Регистрировать</button>
                        <button className="button button-primary-bordered" onClick={() => Setstep(3)}>Назад</button>
                    </form>
                </div>}


            </section>
            </div>
        </div>

    </main>
)
}
