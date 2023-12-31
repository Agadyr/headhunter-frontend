'use client'
import { useEffect, useState } from "react"
import Header from "@/components/header"
import { useDispatch, useSelector } from "react-redux"
import { getSpecializations,getCities, getexperiences, getSkills, getEmpTypes, setEmpTypes,createVacancy } from "@/app/store/slices/vacancySlice"
import ModalSelectSpec from "@/components/ModalSelectSpec"
import AutoCompliteSelect from "@/components/AutoCompliteSelect"
import { useRouter } from "next/navigation"
export default function SearchVacancyAdvanced(){
    const[q,Setq] = useState('')
    const [cityId,setCity] = useState()
    const[specializationId,SetspecializationId] = useState()
    const[specializationName,SetspecializationName] = useState()
    const[salary,Setsalary] = useState("")
    const[salary_type,SetSalaryType] = useState('KZT')
    const[experienceId,SetExperienceId] = useState()
    const [isSpecModalOpen,SetSpecModalOpen] = useState(false)
    const[employmentTypeId,SetEmploymentTypes] = useState()
    const dispatch = useDispatch()
    const router = useRouter()

    const closeSpecModal = () => {
        SetSpecModalOpen(false)
    }

    useEffect(() => {
        dispatch(getSpecializations())
        dispatch(getCities())
        dispatch(getexperiences())
        dispatch(getSkills())
        dispatch(getEmpTypes())
    },[])

    const handleOnSpecChange = (e) => {
        SetspecializationId(e.target.value*1)
        SetspecializationName(e.target.dataset.name)
        closeSpecModal()
    }
    const handleChangeExp = (e) => {
        SetExperienceId(e.target.value)
    }

    const handleSearch = () => {
        let queryString = '?'
        if(q) queryString += `q=${q}&`
        if(specializationId) queryString += `specializationId=${specializationId}&`
        if(cityId) queryString += `cityId=${cityId}&`
        if(salary) queryString += `salary=${salary}&`
        if(salary_type) queryString += `salary_type=${salary_type}&`
        if(experienceId) queryString += `experienceId=${experienceId}&`
        if(employmentTypeId) queryString += `employmentTypeId=${employmentTypeId}&`
        router.push(`/search/vacancy${queryString}`)
    }

    const cities = useSelector(state => state.vacancy.cities)
    const experiences = useSelector(state => state.vacancy.experiences)
    const empTypes = useSelector(state => state.vacancy.empTypes)
    
    return(
        <main>
            <Header/>
            <div className="container p7">
                <h1>Поиск вакансии</h1>
                

                <h2 className="mtb1">Основная Информация</h2>

                <fieldset className="fieldset-vertical">
                    <label>Ключевые Слова</label>
                    <input className="input" placeholder="Название" type="text" value={q} onChange={(e) => Setq(e.target.value)}/>
                </fieldset>

                <fieldset className="fieldset-vertical">
                    <label>Указать спецализацию</label>
                    {specializationName && <p>Выбранная спецализация: {specializationName}</p>}
                    <p className="link" onClick={() => SetSpecModalOpen(true)}>Указать спецализацию</p>
                </fieldset>
                {isSpecModalOpen && <ModalSelectSpec  SetSpecModalOpen={SetSpecModalOpen} closeModal={closeSpecModal} onChange={handleOnSpecChange} value={specializationId}/>}

                <AutoCompliteSelect placeholder="Например, Караганда" type="text" label="Город проживания" size="fieldset-md fieldset-vertical" items={cities} onSelect={(data) => setCity(data.id)}/>

                <fieldset className="fieldset-vertical fieldset-md">
                    <label>Предполагаемый уровень дохода в месяц или за объем робот</label>
                    <div className="input-group">
                        <input className="input" placeholder="От" type="text" value={salary} onChange={(e) => Setsalary(e.target.value)}/>
                        <select className="input" name="salary_type" value={salary_type} onChange={(e) => SetSalaryType(e.target.value)}>
                            <option value={"KZT"}>KZT</option>
                            <option value={"RUB"}>RUB</option>
                            <option value={"USD"}>USD</option>
                        </select>
                    </div>
                    
                </fieldset>

                
                <fieldset className="fieldset-vertical fieldset-md">
                    <label>Предполагаемый уровень дохода в месяц или за объем робот</label>
                    <div>
                        {experiences.map(exp => 
                        <div className="radio" key={exp.id}>
                            <input type="radio" value={exp.id} name="exp" onChange={handleChangeExp}/>
                            <label>{exp.duration}</label>
                        </div>)}
                    </div>
                    
                </fieldset>

                <fieldset className="fieldset-vertical fieldset-md">
                    <h2 className="mtb2">Дополнительно</h2>
                    <label>Тип занятости</label>
                    <div>
                        {empTypes.map(et => 
                        <div className="radio" key={et.id}>
                            <input type="radio" value={et.id} name="et" onChange={(e) => SetEmploymentTypes(e.target.value)}/>
                            <label>{et.name}</label>
                        </div>)}
                    </div>
                    
                </fieldset>

                <button className="button button-primary" onClick={handleSearch}>Найти</button>
            </div>
        </main>
    )
}