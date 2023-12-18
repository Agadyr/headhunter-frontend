import Myresume from "./myresume"
export default function MyResumes({resumes}){
    const showResumes = resumes.map((item, index) =>(<Myresume item={item} key={item.id}/>))
    return(
        <div>
            {showResumes}
        </div>
    )
}