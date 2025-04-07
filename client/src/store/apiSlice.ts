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
    img?: File
    productOptionId: number
    createdAt: string
}

interface CreateRatingDto {
    grade: number
    gradeText?: string
    img?: File
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
        }),
        getProductOption: builder.query<ProductOptions, string>({
            query: (productId) => `/api/product-option/${productId}`,
            providesTags: ["Products"]
        }),
        getRating: builder.query<Rating[], string>({
            query: (productOptionId) => `/api/ratings/product-option/${productOptionId}`,
            providesTags: ["Ratings"]
        }),
        postRating: builder.mutation<Rating, CreateRatingDto>({
            query: (body) => {
                const formData = prepareBody(body)
                return {
                    url: `/api/ratings/product-option/${body.productOptionId}`,
                    method: "POST",
                    body: formData
                }
            },
            invalidatesTags: ["Ratings"]
        })
    })
})

function prepareBody(body: CreateRatingDto): FormData {
    const formData = new FormData()
    formData.append("grade", body.grade.toString())
    formData.append("productOptionId", body.productOptionId.toString())
    formData.append("createdAt", body.createdAt)
    if (body.gradeText) formData.append("gradeText", body.gradeText)
    if (body.img) formData.append("img", body.img)
    return formData
}

export const {
    useGetProductsQuery,
    useGetCategoryQuery,
    useGetCategoryProductsQuery,
    useGetProductOptionQuery,
    useGetRatingQuery,
    usePostRatingMutation
} = apiSlice