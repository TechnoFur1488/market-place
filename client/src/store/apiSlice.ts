import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Products {
    id: number,
    img: string,
    name: string,
    price: number,
    discount: number,
}

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000"
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<Products[], void>({
            query: () => "/api/products",
        })
    })
})

export const { useGetProductsQuery } = apiSlice