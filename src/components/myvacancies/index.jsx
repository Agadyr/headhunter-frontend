import MyVacancy from "./myvacancy"
import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { getMyvacancies } from "@/app/store/slices/vacancySlice"
export default function MyVacancies(){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyvacancies())
    },[])
    const vakancies = useSelector(state => state.vacancy.vacancies)
    console.log(vakancies);
    const showvakancies = vakancies.map((item, index) =>(<MyVacancy item={item} key={item.id}/>))
    return(
        <div>
            {showvakancies}
        </div>
    )
}