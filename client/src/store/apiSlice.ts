import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Products {
    id: number
    img: string
    name: string
    price: number
    discount: number
    subSubCategoryId: number
}

interface ProductOptions {
    id: number
    img: string
    name: string
    price: number
    discount: number
    description: string
    size: string
    color: string
    compound: string
    gender: string
    season: string
    productId: number
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

interface Rating {
    id: number
    grade: number
    gradeText?: string
    img?: string
    productOptionId: number
    createdAt: string
}


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000"
    }),
    tagTypes: ["Products", "Ratings"],
    endpoints: (builder) => ({
        postProduct: builder.mutation<ProductOptions, FormData>({
            query: (formData) => ({
                url: `/api/products`,
                method: "POST",
                body: formData,
                headers: {
                    'Content-Type': ''
                }
            }),
            invalidatesTags: ["Products"]
        }),
        getProducts: builder.query<Products[], void>({
            query: () => "/api/products",
            providesTags: ["Products"]
        }),
        getProductOption: builder.query<ProductOptions, string>({
            query: (productId) => `/api/product-option/${productId}`,
            providesTags: ["Products"]
        }),
        deleteProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `/api/products/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Products"]
        }),
        getCategoryProducts: builder.query<Products[], string>({
            query: (subSubCategoryId) => `/api/products/${subSubCategoryId}`,
            providesTags: ["Products"]
        }),
        getCategory: builder.query<Category[], void>({
            query: () => "/api/category",
            providesTags: ["Products"]
        }),
        getRating: builder.query<Rating[], string>({
            query: (productOptionId) => `/api/ratings/product-option/${productOptionId}`,
            providesTags: ["Ratings"]
        }),
        postRating: builder.mutation<Rating, FormData>({
            query: (formData) => ({
                url: `/api/ratings/product-option/${formData.get('productOptionId')}`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["Ratings"]
        }),
        deleteRating: builder.mutation<void, number>({
            query: (id) => ({
                url: `/api/ratings/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Ratings"]
        })
    })
})

export const {
    usePostProductMutation,
    useGetProductsQuery,
    useGetCategoryProductsQuery,
    useDeleteProductMutation,
    useGetCategoryQuery,
    useGetProductOptionQuery,
    useGetRatingQuery,
    usePostRatingMutation,
    useDeleteRatingMutation
} = apiSlice