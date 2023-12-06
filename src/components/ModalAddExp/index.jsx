import { useState } from "react"
export default function ModalAddExp({closeModal}){
    const [start_date, SetStartDate] = useState(Date.now())
    const [end_date, SetEndDate] = useState(Date.now())
    const [company_name, Setcompany_name] = useState("")
    const [company_description, Setcompany_description] = useState("")
    const [responsibilites , Setresponsibilites] = useState("")


    const onChangeMonth = (e) => {
        let date = new Date(start_date)
        date.setMonth(e.target.value)
        SetStartDate(date.getTime())
    }
    const onChangeYear = (e) => {
        let date = new Date(start_date)
        date.setFullYear(e.target.value)
        SetStartDate(date.getTime())
    }
    const onChangeMonthEnd = (e) => {
        let date = new Date(end_date)
        date.setMonth(e.target.value)
        SetEndDate(date.getTime())
    }
    const onChangeYearEnd = (e) => {
        let date = new Date(end_date)
        date.setFullYear(e.target.value)
        SetEndDate(date.getTime())
    }
    const onChangeCompanyName = (e) =>{
        Setcompany_name(e.target.value)
    }
    const onChangeCompanydesc = (e) =>{
        Setcompany_description(e.target.value)
    }
    const onChangeCompanyresponsibilites = (e) =>{
        Setresponsibilites(e.target.value)
    }
    const save = () =>{
        const workingHistory = {
            start_date,
            end_date,
            responsibilites,
            company_name,
            company_description
        }
        console.log(workingHistory);
    }

    return(
        <div className="modal">
            <div className="modal-back-drop" onClick={closeModal}></div>
            <div className="modal-inner">
                <h3>Опыт Работы</h3>

                <h4>Начало работы</h4>
                <div className="selectdate selectdate-noday">
                    <select onChange={onChangeMonth} placeholder="Месяц" className="mw-input">
                        <option disabled>Выберите Месяц</option>
                        <option value={0}>Январь</option>
                        <option value={1}>Февраль</option>
                        <option value={2}>Март</option>
                        <option value={3}>Апрель</option>
                        <option value={4}>Май</option>
                        <option value={5}>Июнь</option>
                        <option value={6}>Июль</option>
                        <option value={7}>Август</option>
                        <option value={8}>Сентябрь</option>
                        <option value={9}>Октябрь</option>
                        <option value={10}>Ноябрь</option>
                        <option value={11}>Декабрь</option>
                    </select>
                    <input className="mw-input" placeholder="Год" type="text" onChange={onChangeYear} />
                </div>
                <h4>Конец Работы</h4>
                <div className="selectdate selectdate-noday">
                    <select onChange={onChangeMonthEnd} placeholder="Месяц" className="mw-input">
                        <option disabled>Выберите Месяц</option>
                        <option value={0}>Январь</option>
                        <option value={1}>Февраль</option>
                        <option value={2}>Март</option>
                        <option value={3}>Апрель</option>
                        <option value={4}>Май</option>
                        <option value={5}>Июнь</option>
                        <option value={6}>Июль</option>
                        <option value={7}>Август</option>
                        <option value={8}>Сентябрь</option>
                        <option value={9}>Октябрь</option>
                        <option value={10}>Ноябрь</option>
                        <option value={11}>Декабрь</option>
                    </select>
                    <input className="mw-input" placeholder="Год" type="text" onChange={onChangeYearEnd} />
                </div>

                <h4>Организация</h4>
                <input className="mw-input" type="text" placeholder="Название компании" value={company_name} onChange={onChangeCompanyName} />

                <h4>Должность</h4>
                <input className="mw-input" type="text" placeholder="Должность" value={company_description} onChange={onChangeCompanydesc}/>

                <h4>Обязанности на рабочем месте</h4>
                <textarea className="textarea" type="text" placeholder="Опишите что вы делали на работе" onChange={onChangeCompanyresponsibilites}>{responsibilites}</textarea>
                <div className="modal-actions">
                    <button className="button button-primary-bordered"  onClick={closeModal}>Отменить</button>
                    <button className="button button-primary" onClick={save()}>Сохранить</button>
                </div>
            </div>

        </div>
    )
}