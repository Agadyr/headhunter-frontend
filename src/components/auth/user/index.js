'use client'
import { useState } from "react"
export default function userLogin(){
    const [step, setStep] = useState(1)
    return(
        <section className="login-page"> 
            {step === 1 && <div className="card">
                <form>
                    <h1>Поиск Работы</h1>
                    <input className="inputauth" placeholder="Введите email"/>
                    <button className="button button-primary" onClick={() => setStep(2)}>Продолжить</button>
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
                    <input className="inputauth" placeholder="Введите код"/>
                    <p>Повторить можно через 00:48</p>
                    <button className="button button-primary" onClick={() => setStep(3)}>Продолжить</button>
                    <button className="button button-primary-bordered" onClick={() => setStep(1)}>Назад</button>
                </form>
            </div>}
            {step === 3 &&
            <div className="card card_modal">
                <h1>Давайте познакомимся</h1>
                <form>
                    <input className="inputauth" placeholder="Имя"/>
                    <input className="inputauth" placeholder="Фамилия"/>
                    <button className="button button-primary">Продолжить</button>
                    <button className="button button-primary-bordered" onClick={() => setStep(2)}>Назад</button>
                </form>
            </div>}
        </section>
    )
}