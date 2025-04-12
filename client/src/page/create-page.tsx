import { Input } from '@/components/ui/input'
import React from 'react'

interface Props {
    className?: string
}

export const CreatePage: React.FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <h1 className='font-medium text-2xl text-white'>Создание товара</h1>
            <div className='flex flex-col justify-between'>
                <Input className='bg-white mt-3' type='file' />
                <input className='bg-white mt-3' placeholder='Название товара' type="text" />
                <input className='bg-white mt-3' placeholder='Цена товара' type="text" />
                <input className='bg-white mt-3' placeholder='Скидка на товар' type="text" />
                <textarea className='bg-white mt-3 max-h-150' placeholder='Описание товара' name="" id="" />
                <input className='bg-white mt-3' type="text" />
                <input className='bg-white mt-3' placeholder='Цвет товара' type="text" />
                <input className='bg-white mt-3' placeholder='Состав' type="text" />
                <input className='bg-white mt-3' placeholder='Пол' type="text" />
                <input className='bg-white mt-3' placeholder='Сезон' type="text" />
                <input className='bg-white mt-3' placeholder='Категория' type="text" />
                <button className='bg-white'>Создать товар</button>
            </div>
        </div>
    )
}