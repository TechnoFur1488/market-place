import { useGetProductsQuery } from "../store/apiSlice.ts"
import React from "react"

interface Props {
    className?: string
}

interface Product {
    id: number,
    img: string,
    name: string,
    price: number,
    discount: number,
}

export const MainPage: React.FC<Props> = ({ className }) =>  {
    
    const {data, isLoading, isError} = useGetProductsQuery()
    console.log(data);
    
    if(isLoading) return <h1>Загрузка</h1>
    
    if(isError) return <h1>Ошибка запроса</h1>

    const serverUrl = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/"

    return (
        <div>
            {data?.map((el: Product) => {
                return (
                    <div key={el.id}>
                        <img src={serverUrl + el.img} alt="" />
                        <span>{el.name}</span>
                        <span>{el.price}</span>
                        <span>{el.discount}</span>
                    </div>
                )
            })}
        </div>
    )
}