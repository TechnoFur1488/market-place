import { CardProduct } from '@/components/shared'
import { ErrorPage, LoadingPage } from '@/page-waiting'
import { useGetCategoryProductsQuery } from '@/store/apiSlice'
import React from 'react'
import { useParams } from 'react-router-dom'

interface Props {
    className?: string
}

interface Product {
    id: number,
    img: string,
    name: string,
    price: number,
    discount: number,
    subSubCategoryId: number
}


export const CategoryPage: React.FC<Props> = ({ }) => {

    const { subSubCategoryId } = useParams<{ subSubCategoryId: string }>()

    const { data, isLoading, isError } = useGetCategoryProductsQuery(subSubCategoryId || '', )

    if (isLoading) return <LoadingPage />
    if (isError) return <ErrorPage />

    const serverUrl = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/"

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
        </div>
    )
}