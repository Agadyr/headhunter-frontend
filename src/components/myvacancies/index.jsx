import MyVacancy from "./myvacancy"
import { useSelector } from "react-redux"
export default function MyVacancies(){
    const vakancies = useSelector(state => state.vacancy.vacancies)
    console.log(vakancies);
    const showvakancies = vakancies.map((item, index) =>(<MyVacancy item={item} key={item.id}/>))
    return(
        <div>
            {showvakancies}
        </div>
    )
}