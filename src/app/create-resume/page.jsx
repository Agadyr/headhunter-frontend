'use client'
import Header from '../../components/header'
import Input from '@/components/input'
import { END_POINT } from '@/config/end-point'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AutoCompliteSelect from '@/components/AutoCompliteSelect'
import SelectDate from '@/components/SelectdDate'
import ModalAddExp from '@/components/ModalAddExp'
import WorkingHistory from '@/components/WorkingHistory'
import AutoCompliteTags from '@/components/AutoCompliteTags'
import AddEducation from '@/components/AddEducation'
import AddLang from '@/components/AddLang'
import SelectEmploymentTypes from '@/components/SelectEmploymentTypes'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { createResume } from '../store/slices/resumeSlice'
export default function CreateResume() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [cities, setCities] = useState(1)
  const [countries, setCountries] = useState(1)
  const [allskills, setSkills] = useState(1)
  const[allemploymentTypes,SetemploymentTypes] = useState([])
  const[workingHistories,Setworkinghistories] = useState([])
  const [modalExpIsOpen,setmodalExpIsOpen] = useState(false)
  const [first_name,setName] = useState("")
  const [last_name,setSureName] = useState("")
  const [phone,setPhone] = useState("")
  const [cityId,setCity] = useState()
  const [birthday,setBirthday] = useState()
  const [gender,setGender] = useState("")
  const [citizenship,setcityzenship] = useState("")
  const [position,setposition] = useState("")
  const [salary,setSalary] = useState()
  const [salary_type,setSalaryType] = useState("KZT")
  const [skills,SetSelectedSkills] = useState("")
  const [education,Seteducation] = useState([])
  const [foreignLanguages,SetforeignLanguages] = useState("")
  const[employmentTypes,SetSelectedEmpTypes] = useState([])
  const[about,setAbout] = useState('')
 


    useEffect(() => {
        console.log("did mount");
        axios.get(`${END_POINT}/api/region/cities`).then(res => {
         setCities(res.data)
      })

      axios.get(`${END_POINT}/api/region/countries`).then(res=>{
        setCountries(res.data)
      })

      axios.get(`${END_POINT}/api/skills`).then(res =>{
        setSkills(res.data)
      })

      axios.get(`${END_POINT}/api/employment-types`).then(res =>{
        SetemploymentTypes(res.data)
      })

    }, [])

    
    const closeModalExp = () =>{
      setmodalExpIsOpen(false)
    }
    const AddworkingHistory = (item) =>{
      Setworkinghistories([...workingHistories,item])
      closeModalExp()
    }
    const removeWorkingHistory = (WorkingHistory) => {
      let wh =[...workingHistories]
      let index = workingHistories.indexOf(WorkingHistory)
      wh.splice(index,1)
      Setworkinghistories(wh)
    }
    const handleGenderChange = (e) =>{
      setGender(e.target.value)
    }
    const onSkillsChange = (data) => {
      const arr = data.map(item => item.name)
      SetSelectedSkills(arr.join(","))
    }
    const handleSave = () => {
      dispatch(createResume({
        first_name,
        last_name,
        phone,
        birthday,
        gender,
        about,
        position,
        salary,
        salary_type,
        main_language:"Казахский",
        skills,
        cityId,
        citizenship,
        workingHistories,
        education,
        employmentTypes,
        foreignLanguages,

      },
      router
      ));
    }


  return (
    <main>
      <Header/>

        <div className='container p7'>
            <h1>Ваша Резюме</h1>

            <h3>Контактные данные</h3>
            <Input placeholder="" type="text" label="Имя" size="fieldset-md" onChange={(e) => setName(e.target.value)}/>
            <Input placeholder="" type="text" label="Фамилия" size="fieldset-md" onChange={(e) => setSureName(e.target.value)}/>
            <Input placeholder="" type="text" label="Мобильный телефон" size="fieldset-md" onChange={(e) => setPhone(e.target.value)}/>
            <AutoCompliteSelect placeholder="" type="text" label="Город проживания" size="fieldset-md" items={cities} onSelect={(data) => setCity(data.id)}/>
            
            <h3>Основная Информация</h3>
            <SelectDate size="fieldset-sm" label="Дата рождения" onChange={(date) => setBirthday(date)}/>

            <fieldset className={"fieldset fieldset-sm"}>
              <label  className='label'>Пол</label>
                <div className='radio-group'>
                  <div className='radio'>
                    <input type="radio" name='gender' id='g1' value={"Мужской"} onChange={handleGenderChange}/>
                    <label  htmlFor='g1'>Мужской</label>
                  </div>
                  <div className='radio'>
                    <input type="radio" name='gender' id='g2' value={"Женский"} onChange={handleGenderChange}/>
                    <label htmlFor='g2'>Женский</label>
                  </div>
                </div>
            </fieldset>
            <AutoCompliteSelect placeholder="" type="text" label="Гражданство" size="fieldset-md" items={countries} onSelect={(data) => setcityzenship(data.id)}/>
        

            <h3>Основная специальность</h3>

            <Input placeholder="" type="text" label="Желаемая должность" size="fieldset-lg" onChange={(e) => setposition(e.target.value)}/>
            <fieldset className={"fieldset fieldset-lg"}>
              <label className='label'>Зарплата</label>
                <div className='salary'>
                    <input placeholder="" type="number" className='input' size="fieldset-lg" value={salary} onChange={e => setSalary(e.target.value*1)}/>
                    <select className='input' value={salary_type} onChange={e => setSalaryType(e.target.value)}>
                      <option value={"KZT"}>KZT</option>
                      <option value={"RUB"}>RUB</option>
                      <option value={"USD"}>USD</option>
                    </select>
                    на руки
                </div>
        
            </fieldset>


            <h3>Опыт Работы</h3>
            {modalExpIsOpen && <ModalAddExp closeModal={closeModalExp} AddworkingHistory={AddworkingHistory}/>}
            <fieldset className={"fieldset fieldset-lg jcsb-none"}>
              <label className='label'>Места работы</label>
                <div className='exp'>
                    {workingHistories.map(item => (<WorkingHistory WorkingHistory={item} remove={removeWorkingHistory}/>))}
                    <button className='button button-primary-bordered w20' onClick={() => setmodalExpIsOpen(true)}>Добавить место работы</button>
                </div>
            </fieldset>


            <fieldset className={"fieldset fieldset-lg"}>
                <label>О себе</label>
                <textarea className="textarea w45" placeholder="Расскажите о Себе" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
            </fieldset>


            <AutoCompliteTags placeholder="" type="text" label="Ключевые Навыки" size="fieldset-md" items={allskills} onSelect={onSkillsChange}/>


            <h3>Образование</h3>

            <AddEducation onChange={(eds) => {Seteducation(eds)}}/>
            

            <h3 className='mt2'>Владения языками</h3>

            <AddLang onChange={(lns) => {SetforeignLanguages(lns)}}/>

            <h3 className='mt2'>Другая важная информация</h3>
            <SelectEmploymentTypes label="Занятость" employmentTypes={allemploymentTypes} size="fieldset-sm" onChange={(tps) => SetSelectedEmpTypes(tps)} />

            <button className='button button-primary' onClick={() => handleSave()}>Сохранить и опубликовать</button>

        </div>
    </main>
  )
}
