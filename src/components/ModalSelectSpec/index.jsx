import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import SpecType from "./specType";
export default function ModalSelectSpec({closeModal,onChange,value,SetSpecModalOpen}){
    const[search,Setsearch] = useState('')
    const [filteredSpecTypec,SetfilteredSpecTypec] = useState([])
    const specializationTypes = useSelector(state => state.vacancy.specializations)

    const onSearch = (e) => {
        Setsearch(e.target.value)
        let types = [...specializationTypes]
        types = types.filter(item => {
            for(let i = 0;i < item.specializations.length;i++){
                if(item.specializations[i].name.includes(e.target.value)) return item
            }
        })
        SetfilteredSpecTypec(types)
    }
    useEffect(() => {
        SetfilteredSpecTypec(specializationTypes)
    },[specializationTypes])
    return(
        <div className="modal">
            <div className="modal-back-drop" onClick={closeModal}></div>
            <div className="modal-inner">
            <div className="flex flex-ai-c flex-jc-sb">
            <h3>Кого вы хотите найти?</h3>
                <span onClick={() => SetSpecModalOpen(false)}>X</span>
            </div>
                

                <input className="input" type="text" value={search} onChange={onSearch} placeholder="Быстрый Поиск"/>
                {filteredSpecTypec.map((specType,index) => (<SpecType specType={specType} key={index} onChange={onChange} value={value}/>))}
            </div>
        </div>
    )
}