export default function SelectDate({size,label}){
    const onChangeDay = () => {

    }
    const onChangeMonth = () => {
            
    }
    const onChangeYear = () => {
            
    }
    return(
            <fieldset className={"fieldset " + size}>
                <label>{label}</label>
                <div className="selectdate">
                    <input className="input" placeholder="День" type="text" onChange={onChangeDay} />
                    <select onChange={onChangeMonth} placeholder="Месяц" className="input">
                        <option>Январь</option>
                        <option>Февраль</option>
                        <option>Март</option>
                        <option>Апрель</option>
                        <option>Май</option>
                        <option>Июнь</option>
                        <option>Июль</option>
                        <option>Август</option>
                        <option>Сентябрь</option>
                        <option>Октябрь</option>
                        <option>Ноябрь</option>
                        <option>Декабрь</option>
                    </select>
                    <input className="input" placeholder="Год" type="text" onChange={onChangeYear} />
                </div>
                
            </fieldset>
    )
}