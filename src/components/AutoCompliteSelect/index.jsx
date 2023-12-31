'use client'
import { useEffect, useState } from "react"
import Input from "../input"

export default function AutoCompliteSelect({label,placeholder,type,size,items,onSelect,selected}){
    const [value,setValue] = useState({name:""})
    const [filtereditems , SetFilteredItems] = useState([])
    const onClick = (item) =>{
        onSelect(item)
        setValue(item)
        SetFilteredItems([])
    }
    useEffect(() => {
        items.map(item => {
            if(item.id === selected) setValue(item)
        })
    },[selected,items])
    const reset = () =>{
        setValue({name:""})
        onSelect(null)
    }
    const onChange = (e) =>{
        // console.log(e.target.value);
        if(e.target.value === ""){
            SetFilteredItems([])
        }else{
            SetFilteredItems([...items.filter(item => item.name.includes(e.target.value))])
        }

    }
    return(

            <div className={"autocomplite " + size}>
                <Input placeholder={placeholder} type={type} onChange={onChange} label={label} size={size}/>
                {value.name !=="" && <div className="tag">
                    <span>{value.name}</span> <i onClick={reset}>X</i>
                </div>}
                {filtereditems.length > 0 && <div className="dropdown">
                    {filtereditems.map(item => (<a onClick={() => onClick(item)}>{item.name}</a>))}
                </div>}
            </div>
    )
}