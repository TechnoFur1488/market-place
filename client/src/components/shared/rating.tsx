import { useGetRatingQuery } from '@/store/apiSlice'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { ErrorPage, LoadingRating } from '@/page-waiting';
import { WriteRating } from './write-rating';

interface Props {
    className?: string
    productOptionId: number | string
}

interface Rating {
    id: number
    grade: number
    gradeText?: string
    img?: string
    productOptionId: number
    createdAt: string
}

export const Rating: React.FC<Props> = ({ productOptionId }) => {


    const { data, isLoading, isError } = useGetRatingQuery(String(productOptionId))

    if (isLoading) return <LoadingRating />
    if (isError) return <ErrorPage />
    if (!data) return <h1>Отзывы не найдены</h1>

    const datePublic = (component: string) => {
        let options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
        return new Date(component).toLocaleString("ru-RU", options)
    }

    return (
        <div className='mt-10'>
            <Swiper navigation={true} modules={[Navigation]} className='mySwiper' slidesPerView={3} spaceBetween={30} >
                {data?.map((el: Rating) => {

                    let grade

                    if (el.grade === 1) {
                        grade =
                            <div className="flex items-center">
                                <img className='w-10 pr-[10px]' src="../images/Vector.svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector (1).svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector (1).svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector (1).svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector (1).svg" alt="" />
                            </div>
                    } else if (el.grade === 2) {
                        grade =
                            <div className="flex items-center">
                                <img className='w-10 pr-[10px]' src="../images/Vector.svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector.svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector (1).svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector (1).svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector (1).svg" alt="" />
                            </div>
                    } else if (el.grade === 3) {
                        grade =
                            <div className="flex items-center">
                                <img className='w-10 pr-[10px]' src="../images/Vector.svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector.svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector.svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector (1).svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector (1).svg" alt="" />
                            </div>
                    } else if (el.grade === 4) {
                        grade =
                            <div className="flex items-center">
                                <img className='w-10 pr-[10px]' src="../images/Vector.svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector.svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector.svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector.svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector (1).svg" alt="" />
                            </div>
                    } else if (el.grade === 5) {
                        grade =
                            <div className="flex items-center">
                                <img className='w-10 pr-[10px]' src="../images/Vector.svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector.svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector.svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector.svg" alt="" />
                                <img className='w-10 pr-[10px]' src="../images/Vector.svg" alt="" />
                            </div>
                    }

                    // let options: Intl.DateTimeFormatOptions = {
                    //     year: 'numeric',
                    //     month: 'long',
                    //     day: 'numeric',
                    // }
                    // let date = new Date(el.createdAt).toLocaleString("ru-RU", options)

                    let serverUrl = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/"

                    return (
                        <SwiperSlide key={el.id} className='w-full'>
                            <div className='flex flex-col bg-white rounded-2xl text-black  h-[150px] p-5'>
                                <div className='flex justify-between items-center'>
                                    <span>{datePublic(el.createdAt)}</span>
                                    <span>{grade}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>{el.gradeText}</span>
                                    {el.img ? <img className='object-cover rounded-2xl w-[50px] h-[75px]' src={serverUrl + el.img} alt="" /> : null }
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <WriteRating productOptionId={productOptionId} />
        </div>
    )
}