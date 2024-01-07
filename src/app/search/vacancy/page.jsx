'use client'
import Header from "@/components/header"
import { useRouter, useSearchParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getSearchedvacancies } from "@/app/store/slices/vacancySlice"
import MyVacancies from "@/components/myvacancies"
import ModalSelectSpec from "@/components/ModalSelectSpec"
import AutoCompliteSelect from "@/components/AutoCompliteSelect"
import { getSpecializations,getCities, getexperiences, getSkills, getEmpTypes, setEmpTypes,createVacancy } from "@/app/store/slices/vacancySlice"

export default function SearchVacancy(){
    const dispatch = useDispatch()
    const router = useRouter()
    const[specializationName,SetspecializationName] = useState()
    const [isSpecModalOpen,SetSpecModalOpen] = useState(false)
    const searchParams = useSearchParams()
    const[q, Setq] = useState(searchParams.get("q"))
    const[specializationId, SetspecializationId] = useState(searchParams.get("specializationId"))
    const[cityId, SetcityId] = useState(searchParams.get("cityId"))
    const[salary, Setsalary] = useState(searchParams.get("salary"))
    const[salary_type, Setsalary_type] = useState(searchParams.get("salary_type"))
    const[experienceId, SetexperienceId] = useState(searchParams.get("experienceId"))
    const[employmentTypeId, SetemploymentTypeId] = useState(searchParams.get("employmentTypeId"))


    const handleSearch = () => {
        dispatch(getSearchedvacancies({
            q,
            specializationId,
            cityId,
            salary,
            salary_type,
            experienceId,
            employmentTypeId
        }))
    }

    const handleChangeExp = (e) => {
        SetexperienceId(e.target.value)
    }
    useEffect(() => {
        dispatch(getSpecializations())
        dispatch(getCities())
        dispatch(getexperiences())
        dispatch(getSkills())
        dispatch(getEmpTypes())
    },[])

    useEffect(() => {
        dispatch(getSearchedvacancies({
            q,
            specializationId,
            cityId,
            salary,
            salary_type,
            experienceId,
            employmentTypeId
        }))
    },[])

    useEffect(handleSearch, [q,specializationId,cityId,salary,salary_type,experienceId,employmentTypeId])
    const handleOnSpecChange = (e) => {
        SetspecializationId(e.target.value*1)
        SetspecializationName(e.target.dataset.name)
        SetSpecModalOpen(false)
    }
    const closeSepcModal = () => {
        SetSpecModalOpen(false)
    }

    const cities = useSelector(state => state.vacancy.cities)
    const experiences = useSelector(state => state.vacancy.experiences)
    const empTypes = useSelector(state => state.vacancy.empTypes)
    return(
        <main>
        <Header />

        <div className="container mt4">
            <div className='flex'>
                <fieldset className="fieldset-vertical  flex" style={{width: `100%`}}>
                        <input className="input" placeholder="Название" type="text" value={q} onChange={(e)=>Setq(e.target.value)}/>
                </fieldset>
                <button className='button button-primary' onClick={handleSearch}>Найти</button>
            </div>
                

                <div className='flex'>

               
                    <div style={{width: `20%`}}>

                        
                        <fieldset className="fieldset-vertical">
                            <label>Указать специализацию</label>
                            {specializationName && <p>{specializationName}</p>}
                            <p className="link" onClick={() => SetSpecModalOpen(true)}>Указать специализацию</p>
                        </fieldset>
                        {isSpecModalOpen && <ModalSelectSpec SetSpecModalOpen={SetSpecModalOpen} close={closeSepcModal} onChange={handleOnSpecChange} value={specializationId * 1}/>}

                        <AutoCompliteSelect placeholder="" type="text" label="Город проживания" size="fieldset-md fieldset-vertical" items={cities} onSelect={(data) => SetcityId(data.id)}/>

                        <fieldset className="fieldset-vertical fieldset-md">
                            <label>Предполагаемый уровень дохода в месяц</label>
                            <div className="input-group">
                                <input className="input" placeholder="От" type="text" value={salary} onChange={(e)=>Setsalary(e.target.value)}/>
                            
                                <select className="input" name="salary_type" value={salary_type} onChange={e=>Setsalary_type(e.target.value)}>
                                    <option value={"KZT"}>KZT</option>
                                    <option value={"USD"}>USD</option>
                                    <option value={"RUB"}>RUB</option>
                                </select>
                            </div>
                            
                        </fieldset>

        

                        <fieldset className="fieldset-vertical fieldset-md">
                            <label>Опыт работы</label>
                            <div>
                                {experiences.map(exp => <div className="radio" key={exp.id}>
                                    <input type="radio" value={exp.id} name="exp" onChange={handleChangeExp}/>
                                    <label>{exp.duration}</label>
                                </div>)}

                            </div>
                            
                        </fieldset>

                        <fieldset className="fieldset-vertical fieldset-md">
                            <label>Тип занятости</label>
                            <div>
                                {empTypes.map(et => <div className="radio" key={et.id}>
                                    <input type="radio" value={et.id} name="empType" onChange={(e) => SetemploymentTypeId(e.target.value)}/>
                                    <label>{et.name}</label>
                                </div>)}

                            </div>
                            
                        </fieldset>

                    </div>

                    <div style={{width: `80%`, paddingLeft: `40px`}}>

                        <MyVacancies />

                    </div>
                </div>
        </div>
    </main>
    )
}