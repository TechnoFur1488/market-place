import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Products {
    id: number,
    img: string,
    name: string,
    price: number,
    discount: number,
    subSubCategoryId: number
}

interface Category {
    id: number
    name: string
    sub_category: Array<{
        id: number
        name: string
        url?: string
        sub_sub_category: Array<{
            id: number
            name: string
            url?: string
        }>
    }>
}

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000"
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getProducts: builder.query<Products[], void>({
            query: () => "/api/products",
            providesTags: ["Products"]
        }),
        getCategory: builder.query<Category[], void>({
            query: () => "/api/category",
            providesTags: ["Products"]
        }),
        getCategoryProducts: builder.query<Products[], string>({
            query: (subSubCategoryId) => `/api/products/${subSubCategoryId}`,
            providesTags: ["Products"]
        })
    })
})

export const { useGetProductsQuery, useGetCategoryQuery, useGetCategoryProductsQuery } = apiSlice