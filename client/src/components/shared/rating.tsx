import { useDeleteRatingMutation, useGetRatingQuery } from '@/store/apiSlice'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { ErrorPage, LoadingRating } from '@/page-waiting';
import { WriteRating } from './write-rating';
import { Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
    className?: string
    productOptionId: number | string
}

interface Rating {
    id: number
    grade: number
    gradeText?: string | undefined
    img?: string
    productOptionId: number
    createdAt: string
}

export const Rating: React.FC<Props> = ({ productOptionId }) => {

    const { data, isLoading, isError } = useGetRatingQuery(String(productOptionId))
    const [deleteData] = useDeleteRatingMutation()

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

    const handleDelete = async (id: number) => {
        try {
            await deleteData(id).unwrap()
        } catch {
            alert("Отзыв не был удален")
        }
    }

    return (
        <div className='mt-10'>
            <div>
                <h1 className='text-white text-2xl font-bold flex items-center'>
                    Средний рейтинг: {data.length > 0 ? (data.reduce((sum, el) => sum + el.grade, 0) / data.length).toFixed(1) : 0}
                    <Link className='text-[15px] pl-3 font-normal' to={"/"}>Всего оценок: {data.length}</Link>
                </h1>
            </div>
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

                    let serverUrl = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/"

                    let textRating = el.gradeText || ""

                    if (textRating.length > 100) {
                        textRating = textRating.slice(0, 100)
                    }

                    return (
                        <SwiperSlide key={el.id} className='w-full my-10'>
                            <div className='flex flex-col bg-white rounded-2xl text-black  h-[190px] p-5'>
                                <div className='flex justify-between items-center'>
                                    <span>{datePublic(el.createdAt)}</span>
                                    <span>{grade}</span>
                                </div>
                                <div className='flex justify-between py-2'>
                                    <button><Pencil className='hover:text-green-500 transition-all duration-300 hover:scale-110 cursor-pointer' size={25} /></button>
                                    <button onClick={() => handleDelete(el.id)}><Trash2 className='hover:text-red-600 transition-all duration-300 hover:scale-110 cursor-pointer' size={25} /></button>
                                </div>
                                <div className='flex justify-between'>
                                    {textRating !== "" ? <span>{textRating} <Link to={"/"}>Еще</Link></span> : ""}
                                    {el.img && <img className='object-cover rounded-2xl w-[50px] h-[75px]' src={serverUrl + el.img} alt="" />}
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