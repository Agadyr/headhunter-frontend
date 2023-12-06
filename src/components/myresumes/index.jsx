import Myresume from "./myresume"
export default function MyResumes({resumes}){
    const showResumes = resumes.map(item =>(<Myresume item={item}/>))
    return(
        <div>
            {showResumes}
        </div>
    )
}