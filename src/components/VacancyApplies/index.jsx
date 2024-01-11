import Apply from "./apply"
export default function Applies({applies}){

    const showapplies = applies.map((item, index) =>(<Apply item={item} key={item.id}/>))
    return(
        <div className="w1">
            {showapplies}
            {showapplies.length <= 0  && <p className="ml2">Откликов не найдено</p>}
        </div>
    )
}