import Header from '../../components/header'
import MyResumes from '../../components/myresumes'
export default function ResumePage() {
  const resumes = [{
    position:'Менеджер отдела продаж',
    createdAt:'25-07-2023',
    stats:{
      views:2,
      applies:4,
      show:2
    }
  },{
    position:'Back-end developer',
    createdAt:'20-07-2023',
    stats:{
      views:25,
      applies:6,
      show:45
    }
  },{
    position:'React-developer',
    createdAt:'25-03-2022',
    stats:{
      views:4,
      applies:20,
      show:100
    }
  }]
  return (
    <main>
      <Header/>
      <div>
        <div className='container'>
            <div className='flex flex-ai-c flex-jc-sb p7b7'>
              <h1>Мои резюме</h1>
              <button className='button button-secondary-bordered'>Создать резюме</button>
            </div>
            <MyResumes resumes={resumes}/>
        </div>
      </div>
    </main>
  )
}
