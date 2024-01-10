import Applies from "./apply"
import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { getEmployeeApplies } from "@/app/store/slices/applySlice"
export default function MyApplies(){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getEmployeeApplies())
    },[])
    const [sortKey,setSortkey] = useState('status')
    const [sortDirection,setSortDirection] = useState('asc')
    const applies = useSelector(state => state.apply.applies)

        let sortedapplies = []
            sortedapplies = [...applies].sort((a,b)=> {
            let aPart,bPart;
            if(sortKey === "status"){
                aPart = a.status
                bPart = b.status
            }else if(sortKey === "vacancy"){
                aPart = a.vacancy.name
                bPart = b.vacancy.name
            }else if(sortKey === "updatedAt"){
                aPart = a.updatedAt
                bPart = b.updatedAt
            }

            if(sortDirection === "asc"){
                if(aPart < bPart){
                    return -1
                }
                if(aPart > bPart){
                    return 1
                }
            }else{
                if(aPart > bPart){
                    return -1
                }
                if(aPart < bPart){
                    return 1
                }
            }

            return 0
    })


    const sortBy = (key) => {
        if(sortKey === key){
            sortDirection === "asc" ? setSortDirection("desc"):setSortDirection("asc")
        }else{
            setSortkey(key)
            setSortDirection("asc")
        }
    }
    const showapplies = sortedapplies.map((item, index) =>(<Applies item={item} key={item.id}/>))
    return(
        <div className="table">
            <div className="row row-header  flex">
                <div className={`col ${sortDirection}`} onClick={() => sortBy('status')}>
                    Статус {sortKey === "status" && <img src="/images/arrow-next.svg" alt="" />}
                </div>
                <div className={`col ${sortDirection}`} onClick={() => sortBy('vacancy')}>
                    Вакансия{sortKey === "vacancy" && <img src="/images/arrow-next.svg" alt="" />}
                </div>
                <div className={`col ${sortDirection}`} onClick={() => sortBy('updatedAt')}> 
                    Дата {sortKey === "updatedAt" && <img src="/images/arrow-next.svg" alt="" />}
                </div>
        </div>
            {showapplies}
        </div>
    )
}