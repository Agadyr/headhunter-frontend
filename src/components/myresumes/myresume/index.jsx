export default function Myresume({item}){
    return(
        <div className="card mtb4">
            <a className="h3" href="">{item.position}</a>
            <p className="mtb2">Создан {item.created}</p>
            <h3>Статистика</h3>
            <div className="flex">
                <a  className="p3" href="">{item.stats.show}</a>
                <a className="p3" href="">{item.stats.views}</a>
                <a className="p3" href="">{item.stats.applies}</a>
            </div>
        </div>
    )
}