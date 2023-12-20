import { useEffect, useState } from "react"

export default function AddLang({onChange,foreignLanguages}){

    const remove = (index) =>{
        const langs = [...foreignLanguages]
        langs.splice(index,1)
        onChange(langs)
    }
    const onSelect = (e) =>{
        const[index,key] = e.target.name.split("-")
        const langs = [...foreignLanguages]
        langs[index][key] = e.target.value
        onChange(langs)

        onChange(langs)

    }
    const lns = foreignLanguages.map((ln,index) => (
        <div key={index} className="lns fieldset-md selectdate selectdate-noday">
            <span className="remove" onClick={() => remove(index)}>X</span>
            <select  placeholder="Язык" className="mw-input" name={index + "-name"} value={foreignLanguages[index].name} onChange={onSelect}>
                <option value="Казахсий">Казахсий</option>
                <option value="Английский">Английский</option>
                <option value="Руский">Руский</option>
            </select>
            <select  placeholder="Уровень" className="mw-input" name={index + "-level"} value={foreignLanguages[index].level} onChange={onSelect}>
                <option value="A1">A1 - начальный</option>
                <option  value="A2">A2 - элментарный</option>
                <option  value="B1">B1 - средний</option>
                <option  value="B2">B2 - средний продвинутый</option>
                <option  value="C1">C1 - продвинутый</option>
                <option  value="C2">C2 - В совершенстве</option>
            </select>
        </div>
    ))
    return(
        <div className="education-form">
            {lns}
            <a onClick={() => onChange([...foreignLanguages, {name:"", level:""}])}>Добавить Язык</a>
        </div>
    )
}