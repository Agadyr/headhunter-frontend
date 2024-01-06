import { useEffect, useState } from "react"
import Spec from "./spec"
export default function SpecType({specType,onChange,value}){
    const [active,Setactive] = useState(false)
    useEffect(() => {
        specType.specializations.map(spec => spec.id === value ? Setactive(true):null)
    },[])
    return(
        <div>
            <div className={`specTypes ${active?" active":''}`} onClick={() => Setactive(!active)}>
                <img src="/images/arrow-next.svg" alt="" />
                {specType.name}
            </div>
            {
                active && specType.specializations.map(spec => (<Spec spec={spec} onChange={onChange} value={value}/>))
            }
        </div>

    )
}