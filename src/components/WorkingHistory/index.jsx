const MonthsInRussian = [
    'Январь','Февраль','Март','Апрель','Май','Июнь',
    'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'
]
export default function WorkingHistory({WorkingHistory,remove}){
    const startDate = new Date(WorkingHistory.start_date)
    const endDate = new Date(WorkingHistory.end_date)
    return(
        <div className="working-history">
            <div className="flex flex-ai-c flex-jc-sb">
                <p>{MonthsInRussian[startDate.getMonth() + 1]} {startDate.getUTCFullYear()} - {MonthsInRussian[endDate.getMonth() + 1]} {endDate.getUTCFullYear()}</p>
                <p onClick={() => remove(WorkingHistory)}>X</p>
            </div>
            <h3>{WorkingHistory.company_name}</h3>
            <span>{WorkingHistory.company_description}</span>
        </div>
    )
}