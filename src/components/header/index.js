'use client'
import Link from "next/link"
export default function Header(){
    return(
        <header className="header"> 
            <div className="container">
                <div className="header-inner">
                    <div>
                        <Link href="/"><img src="/images/logo.svg"/></Link>
                        <Link href="/resumes">Мои резюме</Link>
                        <a>Помощь</a>
                    </div>
                    <div>
                        <button className="header-search">
                        <img src="/images/search.svg"/>
                            Поиск
                        </button>
                        <Link href="/create-resume" className="header-button  header-button-green">
                            Создать Резюме
                        </Link>
                        <Link href="/login" className="header-button">
                            Войти
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}