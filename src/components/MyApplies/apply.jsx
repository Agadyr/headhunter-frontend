'use client'
import { deleteApply } from "@/app/store/slices/applySlice"
// import { deleteVacancy, getEmpTypes } from "@/app/store/slices/vacancySlice"
import Link from "next/link"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
export default function Applies({item}){
    const dispatch = useDispatch()
    const current_user = useSelector(state => state.auth.currentUSer)
    return(
        <div className="row   flex">
            <div className="col">
                {item.status}
            </div>
            <div className="col">
                <div className=" response-vacansy-name">
                    <p className="link">{item.vacancy && item.vacancy.name}</p>
                    {item.vacancy.address !== "" && <p className="graymin">{item.vacancy && item.vacancy.address}</p>}
                    {item.vacancy.address === "" && <p className="graymin">Адрес не Найден</p>}
                    <span onClick={() => dispatch(deleteApply(item.id))}>Удалить</span>
                </div>
            </div>
            <div className="col">
                {item.updatedAt}
            </div>
        </div>
    )
}