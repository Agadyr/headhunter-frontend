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
import { weakMapMemoize } from '@reduxjs/toolkit'
export default function CreateResume() {
  const [cities, setCities] = useState(1)
  const [countries, setCountries] = useState(1)
  const [skills, setSkills] = useState(1)
  const[employmentTypes,SetemploymentTypes] = useState([])
  const[workinghistories,Setworkinghistories] = useState([])
  const [modalExpIsOpen,setmodalExpIsOpen] = useState(false)
  const [WeatherData,SetWeatherData] = useState()

  const API_KEY = '3769d468b23b9ca16e80755000761c1d'
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=Kazakhstan'



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
    // console.log(WeatherData);
    

    const onSelect = (data) =>{
      console.log(data);
    }
    const closeModalExp = () =>{
      setmodalExpIsOpen(false)
    }
    const AddworkingHistory = (item) =>{
      Setworkinghistories([...workinghistories,item])
      closeModalExp()
    }
    const removeWorkingHistory = (WorkingHistory) => {
      let wh =[...workinghistories]
      let index = workinghistories.indexOf(WorkingHistory)
      wh.splice(index,1)
      Setworkinghistories(wh)
    }

  return (
    <main>
      <Header/>

        <div className='container p7b7'>
            <h1>Ваша Резюме</h1>

            <h3>Контактные данные</h3>
            <Input placeholder="" type="text" label="Имя" size="fieldset-md"/>
            <Input placeholder="" type="text" label="Фамилия" size="fieldset-md"/>
            <Input placeholder="" type="text" label="Мобильный телефон" size="fieldset-md"/>
            <AutoCompliteSelect placeholder="" type="text" label="Город проживания" size="fieldset-md" items={cities} onSelect={onSelect}/>
            
            <h3>Основная Информация</h3>
            <SelectDate size="fieldset-sm" label="Дата рождения"/>

            <fieldset className={"fieldset fieldset-sm"}>
              <label  className='label'>Пол</label>
                <div className='radio-group'>
                  <div className='radio'>
                    <input type="radio" name='gender' id='g1' />
                    <label  for='g1'>Мужской</label>
                  </div>
                  <div className='radio'>
                    <input type="radio" name='gender' id='g2'/>
                    <label for='g2'>Женский</label>
                  </div>
                </div>
            </fieldset>
            <AutoCompliteSelect placeholder="" type="text" label="Гражданство" size="fieldset-md" items={countries} onSelect={onSelect}/>
        

            <h3>Основная специальность</h3>

            <Input placeholder="" type="text" label="Желаемая должность" size="fieldset-lg"/>
            <fieldset className={"fieldset fieldset-lg"}>
              <label className='label'>Зарплата</label>
                <div className='salary'>
                    <input placeholder="" type="text" className='input' size="fieldset-lg"/>
                    <select className='input'>
                      <option>KZT</option>
                      <option>RUB</option>
                      <option>USD</option>
                    </select>
                    на руки
                </div>
        
            </fieldset>


            <h3>Опыт Работы</h3>
            {modalExpIsOpen && <ModalAddExp closeModal={closeModalExp} AddworkingHistory={AddworkingHistory}/>}
            <fieldset className={"fieldset fieldset-lg jcsb-none"}>
              <label className='label'>Места работы</label>
                <div className='exp'>
                    {workinghistories.map(item => (<WorkingHistory WorkingHistory={item} remove={removeWorkingHistory}/>))}
                    <button className='button button-primary-bordered w20' onClick={() => setmodalExpIsOpen(true)}>Добавить место работы</button>
                </div>
            </fieldset>


            <fieldset className={"fieldset fieldset-lg"}>
                <label>О себе</label>
                <textarea className="textarea w45" placeholder="Расскажите о Себе" ></textarea>
            </fieldset>


            <AutoCompliteTags placeholder="" type="text" label="Ключевые Навыки" size="fieldset-md" items={skills} onSelect={onSelect}/>


            <h3>Образование</h3>

            <AddEducation onChange={() => {}}/>
            

            <h3 className='mt2'>Владения языками</h3>

            <AddLang onChange={() => {}}/>

            <h3 className='mt2'>Другая важная информация</h3>
            <SelectEmploymentTypes label="Занятость" employmentTypes={employmentTypes} size="fieldset-sm"/>

            <button className='button button-primary'>Сохранить и опубликовать</button>

        </div>
    </main>
  )
}
