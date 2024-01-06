'use client'
import Header from '@/components/header'
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
import { useDispatch,useSelector } from 'react-redux'
import { editResume, getResumeById } from '@/app/store/slices/resumeSlice'
import { useParams } from 'next/navigation'
export default function CreateResume() {
  const { id } = useParams();
  const resume = useSelector((state) => state.resume.resume);

  const router = useRouter()
  const dispatch = useDispatch()
  const [cities, setCities] = useState([])
  const [countries, setCountries] = useState([])
  const [allskills, setSkills] = useState([])
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
  const [foreignLanguages,SetforeignLanguages] = useState([])
  const[employmentTypes,SetSelectedEmpTypes] = useState([])
  const[about,setAbout] = useState('')
 


    useEffect(() => {
        console.log("did mount");
        dispatch(getResumeById(id));
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
    useEffect(() => {
      if(resume.id){
        setCity(resume.cityId)
        SetSelectedEmpTypes(resume.employmentTypes.map(et=>et.id))
        setName(resume.first_name)
        setSureName(resume.last_name)
        setPhone(resume.phone)
        setGender(resume.gender)
        setcityzenship(resume.citizenship)
        setSalary(resume.salary)
        setSalaryType(resume.salary_type)
        Setworkinghistories(resume.workingHistories)
        setposition(resume.position)
        setAbout(resume.about)
        SetSelectedSkills(resume.skills)
        Seteducation(resume.education)
        SetforeignLanguages(resume.foreignLanguages)
        SetemploymentTypes(resume.employmentTypes)
      }

    },[resume])

    
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
    const onSkillsChange = (data) => {
      const arr = data.map(item => item.name)
      SetSelectedSkills(arr.join(","))
    }
    const handleSave = () => {
      dispatch(editResume({
        id:resume.id,
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
    let eds = education.map(ed => {
      const end = new Date(ed.end_date)
      return{
      ...ed,
      end_date:end.getFullYear()
    }
    })
  return (
    <main>
      <Header/>

        <div className='container p7'>
            <h1>Ваша Резюме</h1>

            <h3>Контактные данные</h3>
            <Input placeholder="" type="text" label="Имя" size="fieldset-md" onChange={(e) => setName(e.target.value)} value={first_name}/>
            <Input placeholder="" type="text" label="Фамилия" size="fieldset-md" onChange={(e) => setSureName(e.target.value)} value={last_name}/>
            <Input placeholder="" type="text" label="Мобильный телефон" size="fieldset-md" onChange={(e) => setPhone(e.target.value)} value={phone}/>
            <AutoCompliteSelect placeholder="" type="text" label="Город проживания" size="fieldset-md" items={cities} onSelect={(data) => setCity(data.id)} selected={cityId}/>
            
            <h3>Основная Информация</h3>
            <SelectDate size="fieldset-sm" label="Дата рождения" onChange={(date) => setBirthday(date)} value={resume.birthday}/>

            <fieldset className={"fieldset fieldset-sm"}>
              <label  className='label'>Пол</label>
                <div className='radio-group'>
                  <div className='radio'>
                   {resume.gender && gender === 'Мужской' && <input type="radio" name='gender' id='g1' value={"Мужской"} onChange={(e) => setGender(e.target.value)} checked/>}
                   {!resume.gender || gender !== 'Мужской' && <input type="radio" name='gender' id='g1' value={"Мужской"} onChange={(e) => setGender(e.target.value)} />}
                    <label  htmlFor='g1'>Мужской</label>
                  </div>
                  <div className='radio'>
                  {resume.gender && gender === 'Женский'  && <input type="radio" name='gender' id='g2' value={"Женский"} onChange={(e) => setGender(e.target.value)} checked/>}
                   {!resume.gender || gender !== 'Женский'  && <input type="radio" name='gender' id='g2' value={"Женский"} onChange={(e) => setGender(e.target.value)} />}
                    <label htmlFor='g2'>Женский</label>
                  </div>
                </div>
            </fieldset>
            <AutoCompliteSelect placeholder="" type="text" label="Гражданство" size="fieldset-md" items={countries} onSelect={(data) => setcityzenship(data.id)} selected={citizenship}/>
        

            <h3>Основная специальность</h3>

            <Input placeholder="" type="text" label="Желаемая должность" size="fieldset-lg" onChange={(e) => setposition(e.target.value)} value={position}/>
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


            <AutoCompliteTags placeholder="" type="text" label="Ключевые Навыки" size="fieldset-md" items={allskills} onSelect={onSkillsChange} selected={skills.length > 0 ? skills.split(",").map(item => ({name:item})) : []}/>


            <h3>Образование</h3>

            <AddEducation onChange={(eds) => {Seteducation(eds)}} education={eds}/>
            

            <h3 className='mt2'>Владения языками</h3>

            <AddLang onChange={(lns) => {SetforeignLanguages(lns)}} foreignLanguages={foreignLanguages}/>

            <h3 className='mt2'>Другая важная информация</h3>
            <SelectEmploymentTypes label="Занятость" allemploymentTypes={allemploymentTypes} size="fieldset-sm" onChange={(tps) => SetSelectedEmpTypes(tps)} employmentTypes={employmentTypes}/>

            <button className='button button-primary' onClick={() => handleSave()}>Сохранить и опубликовать</button>

        </div>
    </main>
  )
}
