import { ProductOption } from '@/components/shared'
import { ErrorPage, LoadingOption } from '@/page-waiting'
import { useGetProductOptionQuery } from '@/store/apiSlice'
import React from 'react'
import { useParams } from 'react-router-dom'

interface Props {
    className?: string
}


export const ProductPage: React.FC<Props> = ({ }) => {

    const { productId } = useParams<{ productId: string }>()

    const { data, isLoading, isError } = useGetProductOptionQuery(productId || '')

    if (isLoading) return <LoadingOption />
    if (isError) return <ErrorPage />
    if (!data) return <h1>Товар не найден</h1>

    const serverUrl = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/"

    return (
        <div>
            <ProductOption
                key={data.id}
                id={data.id}
                img={serverUrl + data.img}
                name={data.name}
                price={data.price}
                discount={data.discount}
                description={data.description}
                size={data.size}
                color={data.color}
                compound={data.compound}
                gender={data.gender}
                season={data.season}
                productId={data.productId}
            />

        </div>
    )
}