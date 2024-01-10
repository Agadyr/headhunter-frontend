import Applies from "./apply"
import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { getEmployeeApplies } from "@/app/store/slices/applySlice"
export default function MyApplies(){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getEmployeeApplies())
    },[])
    const applies = useSelector(state => state.apply.applies)
    const showapplies = applies.map((item, index) =>(<Applies item={item} key={item.id}/>))
    return(
        <div className="table">
            <div className="row row-header  flex">
                <div className="col">
                    Статус
                </div>
                <div className="col">
                    Вакансия
                </div>
                <div className="col">
                    Дата
                </div>
        </div>
            {showapplies}
        </div>
    )
}