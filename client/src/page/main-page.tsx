import { CardProduct } from "@/components/shared/index.ts"
import { useGetProductsQuery } from "../store/apiSlice.ts"
import React from "react"
import { ErrorPage, LoadingPage } from "../page-waiting/index.ts"
import { Skeleton } from "@/components/ui/skeleton.tsx"

interface Props {
    className?: string
    productOptionId: number
}

interface Product {
    id: number,
    img: string,
    name: string,
    price: number,
    discount: number,
}


export const MainPage: React.FC<Props> = ({ }) => {

    const { data, isLoading, isError } = useGetProductsQuery()

    if (isLoading) return <LoadingPage />
    if (isError) return <ErrorPage />

    const serverUrl = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/"

    const skeleton = Array.from({ length: 30 })

    return (
        <div className="grid grid-cols-6 gap-x-[30px] gap-y-[30px]">
            {data?.map((el: Product) => {
                return (
                    <CardProduct
                        key={el.id}
                        id={el.id}
                        isImgProduct={serverUrl + el.img}
                        isNameProduct={el.name}
                        isPriceProduct={el.price}
                        isDiscountProduct={el.discount}
                        isProductId={el.id}
                    />
                )
            })}

            {skeleton.map((_, i) => (
                <div key={i} className='flex flex-col justify-between w-[215px] h-[435px]'>
                    <div className='flex flex-col justify-between h-[370px]'>
                        <Skeleton className='rounded-2xl h-[267px] w-[100%] bg-[#303030]' />
                        <Skeleton className='w-[180px] h-[33px] bg-[#303030] rounded-2xl' />
                        <Skeleton className='w-[100%] h-[23px] bg-[#303030] rounded-2xl' />
                    </div>
                    <Skeleton className='w-[215px] h-11 bg-[#303030] rounded-2xl' />
                </div>
            ))}
        </div>
    )
}