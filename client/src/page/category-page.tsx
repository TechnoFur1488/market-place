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


export const CategoryPage: React.FC<Props> = ({ className }) => {

    const { subSubCategoryId } = useParams<{ subSubCategoryId: string }>()

    const { data, isLoading, isError } = useGetCategoryProductsQuery(subSubCategoryId || '', )

    if (isLoading) return <LoadingPage />
    if (isError) return <ErrorPage />

    const serverUrl = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/"

    return (
        <div className={className}>
            {data?.map((el: Product) => {
                return (
                    <CardProduct
                        key={el.id}
                        isImgProduct={serverUrl + el.img}
                        isNameProduct={el.name}
                        isPriceProduct={el.price}
                        isDiscountProduct={el.discount}
                    />
                )
            })}
        </div>
    )
}