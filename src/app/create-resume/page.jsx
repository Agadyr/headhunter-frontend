'use client'
import Header from '../../components/header'
import Input from '@/components/input'
import { END_POINT } from '@/config/end-point'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AutoCompliteSelect from '@/components/AutoCompliteSelect'
import SelectDate from '@/components/SelectdDate'
import ModalAddExp from '@/components/ModalAddExp'
export default function CreateResume() {
  const [cities, setCities] = useState(1)
  const [countries, setCountries] = useState(1)
  const [modalExpIsOpen,setmodalExpIsOpen] = useState(false)
    useEffect(() => {
        console.log("did mount");
        axios.get(`${END_POINT}/api/region/cities`).then(res => {
         setCities(res.data)
      })

      axios.get(`${END_POINT}/api/region/countries`).then(res=>{
        setCountries(res.data)
      })
    }, [])
    const onSelect = (data) =>{
      console.log(data);
    }
    const closeModalExp = () =>{
      setmodalExpIsOpen(false)
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
            {modalExpIsOpen && <ModalAddExp closeModal={closeModalExp}/>}
            <fieldset className={"fieldset fieldset-lg"}>
              <label className='label'>Места работы</label>
                <div className='exp'>
                    <div className=''>

                    </div>
                    <button className='button button-primary-bordered' onClick={() => setmodalExpIsOpen(true)}>Добавить место работы</button>
                </div>
            </fieldset>
        </div>
    </main>
  )
}
