export default function Myresume({item}){
    return(
        <div className="card mtb4">
            <a className="h3" href="">{item.position}</a>
            <p className="mtb2">Создан {item.createdAt}</p>
            <h3>Статистика</h3>
            <div className="flex">
                <a  className="p3" href="">0 показов</a>
                <a className="p3" href="">0 просмотров</a>
                <a className="p3" href="">0 приглашений</a>
            </div>
        </div>
    )
}