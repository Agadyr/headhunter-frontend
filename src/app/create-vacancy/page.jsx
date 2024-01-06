'use client'
import { useEffect, useState } from "react"
import Header from "@/components/header"
import { useDispatch } from "react-redux"
import { getSpecializations } from "@/app/store/slices/vacancySlice"
import ModalSelectSpec from "@/components/ModalSelectSpec"
export default function CreateVacancy(){
    const[name,SetName] = useState('')
    const[specializationId,SetspecializationId] = useState()
    const dispatch = useDispatch()
    const [isSpecModalOpen,SetSpecModalOpen] = useState(false)

    const closeSpecModal = () => {
        SetSpecModalOpen(false)
    }

    useEffect(() => {
        dispatch(getSpecializations())
    },[])

    const handleOnSpecChange = (e) => {
        SetspecializationId(e.target.value*1)
    }
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
                
            </div>
        </main>
    )
}