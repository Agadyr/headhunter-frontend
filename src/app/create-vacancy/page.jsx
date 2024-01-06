'use client'
import { useEffect, useState } from "react"
import Header from "@/components/header"
import { useDispatch, useSelector } from "react-redux"
import { getSpecializations,getCities, getexperiences } from "@/app/store/slices/vacancySlice"
import ModalSelectSpec from "@/components/ModalSelectSpec"
import AutoCompliteSelect from "@/components/AutoCompliteSelect"
export default function CreateVacancy(){
    const[name,SetName] = useState('')
    const [cityId,setCity] = useState()
    const[specializationId,SetspecializationId] = useState()
    const[salary_from,Setsalary_from] = useState("")
    const[salary_to,Setsalary_to] = useState("")
    const[salary_type,SetSalaryType] = useState('KZT')
    const[address,SetAdress] = useState('')
    const[experienceId,SetExperienceId] = useState()
    const [isSpecModalOpen,SetSpecModalOpen] = useState(false)
    const dispatch = useDispatch()

    const closeSpecModal = () => {
        SetSpecModalOpen(false)
    }

    useEffect(() => {
        dispatch(getSpecializations())
        dispatch(getCities())
        dispatch(getexperiences())
    },[])

    const handleOnSpecChange = (e) => {
        SetspecializationId(e.target.value*1)
    }
    const handleChangeExp = (e) => {
        SetExperienceId(e.target.value)
    }

    const cities = useSelector(state => state.vacancy.cities)
    const experiences = useSelector(state => state.vacancy.experiences)
    return(
        <main>
            <Header/>
            <div className="container p7">
                <h1>Создание вакансии</h1>
                

                <h2 className="mtb1">Основная Информация</h2>

                <fieldset className="fieldset-vertical">
                    <label>Название Вакансии</label>
                    <input className="input" placeholder="Название" type="text" value={name} onChange={(e) => SetName(e.target.value)}/>
                </fieldset>

                <fieldset className="fieldset-vertical">
                    <label>Указать спецализацию</label>
                    <p className="link" onClick={() => SetSpecModalOpen(true)}>Указать спецализацию</p>
                </fieldset>
                {isSpecModalOpen && <ModalSelectSpec closeModal={closeSpecModal} onChange={handleOnSpecChange} value={specializationId}/>}

                <AutoCompliteSelect placeholder="" type="text" label="Город проживания" size="fieldset-md fieldset-vertical" items={cities} onSelect={(data) => setCity(data.id)}/>

                <fieldset className="fieldset-vertical fieldset-md">
                    <label>Предполагаемый уровень дохода в месяц или за объем робот</label>
                    <div className="input-group">
                        <input className="input" placeholder="От" type="text" value={salary_from} onChange={(e) => Setsalary_from(e.target.value)}/>
                        <input className="input" placeholder="До" type="text" value={salary_to} onChange={(e) => Setsalary_to(e.target.value)}/>
                        <select className="input" name="salary_type" value={salary_type} onChange={(e) => SetSalaryType(e.target.value)}>
                            <option value={"KZT"}>KZT</option>
                            <option value={"RUB"}>RUB</option>
                            <option value={"USD"}>USD</option>
                        </select>
                    </div>
                    
                </fieldset>

                <fieldset className="fieldset-vertical">
                    <label>Адрес</label>
                    <input className="input" placeholder="Введите адрес" type="text" value={address} onChange={(e) => SetAdress(e.target.value)}/>
                </fieldset>
                
                <fieldset className="fieldset-vertical fieldset-md">
                    <label>Предполагаемый уровень дохода в месяц или за объем робот</label>
                    <div>
                        {experiences.map((exp,index) => 
                        <div className="radio" key={index}>
                            <input type="radio" value={exp.id} name="exp" onChange={handleChangeExp}/>
                            <label>{exp.duration}</label>
                        </div>)}
                    </div>
                    
                </fieldset>
            </div>
        </main>
    )
}