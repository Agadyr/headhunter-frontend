'use client'
import { useEffect, useState } from "react"
import Header from "@/components/header"
import { useDispatch, useSelector } from "react-redux"
import { getSpecializations,getCities, getexperiences, getSkills, getEmpTypes, setEmpTypes,createVacancy } from "@/app/store/slices/vacancySlice"
import ModalSelectSpec from "@/components/ModalSelectSpec"
import AutoCompliteSelect from "@/components/AutoCompliteSelect"
import AutoCompliteTags from "@/components/AutoCompliteTags"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRouter } from "next/navigation"
export default function CreateVacancy(){
    const[name,SetName] = useState('')
    const [cityId,setCity] = useState()
    const[specializationId,SetspecializationId] = useState()
    const[specializationName,SetspecializationName] = useState()
    const[salary_from,Setsalary_from] = useState("")
    const[salary_to,Setsalary_to] = useState("")
    const[salary_type,SetSalaryType] = useState('KZT')
    const[address,SetAdress] = useState('')
    const[description,Setdescription] = useState("<h2>Обязанности</h2> <ul><li></li><li></li></ul><h2>Требование</h2><ul><li></li><li></li></ul><h2>Условия</h2><ul><li></li><li></li></ul>")
    const[experienceId,SetExperienceId] = useState()
    const[skills, SetSelectedSkills] = useState([])
    const[employmentTypeId,SetEmploymentTypes] = useState()
    const [isSpecModalOpen,SetSpecModalOpen] = useState(false)
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
    const onSkillsChange = (data) => {
        const arr = data.map(item => item.name)
        SetSelectedSkills(arr.join(","))
      }
    const handleSave = () => {
        dispatch(createVacancy({
            name,
            specializationId:`${specializationId}`,
            cityId:`${cityId}`,
            description,
            employmentTypeId,
            salary_from:salary_from * 1,
            salary_to:salary_to*1,
            salary_type,
            address,
            experienceId,
            skills,
            about_company:""
        },router))
    }

    const cities = useSelector(state => state.vacancy.cities)
    const experiences = useSelector(state => state.vacancy.experiences)
    const allskills = useSelector(state => state.vacancy.skills)
    const empTypes = useSelector(state => state.vacancy.empTypes)
    
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
                    {specializationName && <p>Выбранная спецализация: {specializationName}</p>}
                    <p className="link" onClick={() => SetSpecModalOpen(true)}>Указать спецализацию</p>
                </fieldset>
                {isSpecModalOpen && <ModalSelectSpec SetSpecModalOpen={SetSpecModalOpen} closeModal={closeSpecModal} onChange={handleOnSpecChange} value={specializationId}/>}

                <AutoCompliteSelect placeholder="Например, Караганда" type="text" label="Город проживания" size="fieldset-md fieldset-vertical" items={cities} onSelect={(data) => setCity(data.id)}/>

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
                        {experiences.map(exp => 
                        <div className="radio" key={exp.id}>
                            <input type="radio" value={exp.id} name="exp" onChange={handleChangeExp}/>
                            <label>{exp.duration}</label>
                        </div>)}
                    </div>
                    
                </fieldset>

                <fieldset className="mtb4">
                    <h3 >Расскажите про вакансию</h3>
                    <div className="mtb4">
                    <CKEditor
                    editor={ ClassicEditor }
                    config={ {
                        toolbar: [ 'bold', 'italic','bulletedList','numberedList','redo' ]
                    } }
                    data={description}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event,editor ) => {
                        const data = editor.getData()
                        Setdescription(data)
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                    </div>
                </fieldset>

                <AutoCompliteTags placeholder="Например, организация конференций" type="text" label="Ключевые Навыки" size="fieldset-md fieldset-vertical" items={allskills} onSelect={onSkillsChange} selected={skills.length > 0 ? skills.split(",").map(item => ({name:item})) : []}/>

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

                <button className="button button-primary" onClick={handleSave}>Продолжить</button>
            </div>
        </main>
    )
}