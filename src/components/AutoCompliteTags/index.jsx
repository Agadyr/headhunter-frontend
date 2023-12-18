'use client'
import { useState } from "react"
import Input from "../input"
import { useEffect } from "react"
export default function AutoCompliteTags({label,placeholder,type,size,items,onSelect}){
    const [value,setValue] = useState([])
    const [filtereditems , SetFilteredItems] = useState([])
    const onClick = (item) =>{
        setValue([...value,item])
    }
    const deletetag = (tag) =>{
        let wh = [...value]
        let index = wh.indexOf(tag)
        wh.splice(index,1)
        setValue(wh)
        SetFilteredItems([...filtereditems,tag])
    }
    const onChange = (e) =>{
        // console.log(e.target.value);
        if(e.target.value === ""){
            SetFilteredItems([])
        }else{
            const filter = items.filter(item => item.name.includes(e.target.value))

            let fi = []
            filter.map(item=>{
                let exist = false
                value.map(tag => {
                    if(tag.name === item.name){
                        exist = true
                    }
                })
                if(!exist){
                    fi.push(item)
                }
            })
            SetFilteredItems(fi)
        }

    }
    useEffect(() =>{
        let fi = []
        filtereditems.map(item=>{
            let exist = false
            value.map(tag => {
                if(tag.name === item.name){
                    exist = true
                }
            })
            if(!exist){
                fi.push(item)
            }
        })
        SetFilteredItems(fi)
        onSelect(value)
    },[value])
    return(
        <div className="fieldset-lg">
            <div className="tags">
                {value.length > 0 && value.map(tag => <div className="tag">
                <span>{tag.name}</span> <i onClick={() => deletetag(tag)}>X</i>
                </div>)}
            </div>
            <div className={"autocomplite " + size}>


                <Input placeholder={placeholder} type={type} onChange={onChange} label={label} size={size}/>
                {filtereditems.length > 0 && <div className="dropdown dropdown-tags">
                    <h3>Рекомендуемые Навыки</h3>
                    {filtereditems.map(item => (<a onClick={() => onClick(item)}>{item.name}</a>))}
                </div>}
            </div>
        </div>


    )
}