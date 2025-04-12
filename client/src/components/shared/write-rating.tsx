import React, { useState, useRef } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '../ui/input'
import { usePostRatingMutation } from '@/store/apiSlice'

interface Props {
    productOptionId: number | string
}


export const WriteRating: React.FC<Props> = ({ productOptionId }) => {
    const [postData] = usePostRatingMutation()
    const [textRating, setTextRating] = useState("")
    const [btn, setBtn] = useState(0)
    const [image, setImage] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const fetchPost = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append('grade', btn.toString())
            formData.append('productOptionId', productOptionId.toString())
            if (textRating) formData.append('gradeText', textRating)
            if (image) formData.append('img', image)
            formData.append('createdAt', new Date().toISOString())

            await postData(formData).unwrap()
            setTextRating("")
            setBtn(0)
            setImage(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className='cursor-pointer'>Оставить Отзыв</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Оставить отзыв</AlertDialogTitle>
                    <AlertDialogDescription>
                        <form onSubmit={fetchPost}>
                            <div className='pb-2'>
                                {[1, 2, 3, 4, 5].map((el) => (
                                    <button 
                                        type="button" 
                                        className='mr-1' 
                                        key={el} 
                                        onClick={() => setBtn(el)}
                                    >
                                        {el <= btn ? (
                                            <img src='../images/Vector.svg' alt='star' />
                                        ) : (
                                            <img src='../images/Vector (1).svg' alt='star' />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className='mb-4'>
                                <textarea 
                                    value={textRating} 
                                    onChange={e => setTextRating(e.target.value)} 
                                    maxLength={1000} 
                                    placeholder='Напишите отзыв' 
                                    className='p-3 w-full h-[450px] resize-none rounded-2xl border-1 border-[#0F4C81]' 
                                />
                                {textRating.length !== 1000 ? (
                                    <div className='flex justify-between flex-row'>
                                        <span></span>
                                        <span>{textRating.length}/1000</span>
                                    </div>
                                ) : (
                                    <div className='text-red-600 flex justify-between flex-row'>
                                        <span>Введено максимальное количество символов</span>
                                        <span className='text-red-600'>{textRating.length}/1000</span>
                                    </div>
                                )}
                            </div>
                            <div className='mb-4'>
                                <Input 
                                    type='file' 
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel type="button">Назад</AlertDialogCancel>
                                <AlertDialogAction type="submit">Отправить Отзыв</AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}