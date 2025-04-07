import React from 'react'
import { Link } from 'react-router-dom'
import { AlterDialogComponent } from './alter-dialog-component'
import { Rating } from './rating'

interface ProductOption {
    id: number,
    img: string,
    name: string,
    price: number,
    discount: number,
    description: string,
    size: string,
    color: string,
    compound: string,
    gender: string,
    season: string,
    productId: number,
}

export const ProductOption: React.FC<ProductOption> = ({ id, img, name, price, discount, description, size, color, compound, gender, season, productId }) => {

    let descriptionNotFull

    if (description.length > 320) {
        descriptionNotFull = description.slice(0, 320) + "..."
    }

    return (
        <div className='text-white' key={id}>
            <div className='flex justify-between'>
                <img className='rounded-2xl h-[700px] w-[525px] object-cover' src={img} alt="" />
                <div className='w-[480px]'>
                    <h1 className='text-3xl font-medium'>{name}</h1>
                    <div className='mt-5 '>
                        <h2 className='text-2xl font-medium'>Варианты продукта</h2>
                        <div className='flex items-center py-5'>
                            <Link className='mr-5' to={"/"}>
                                <img className='rounded-2xl h-[110px] w-[80px] object-cover' src={img} alt={name} />
                            </Link>
                            <Link className='mr-5' to={"/"}>
                                <img className='rounded-2xl h-[110px] w-[80px] object-cover' src={img} alt={name} />
                            </Link>
                            <Link className='mr-5' to={"/"}>
                                <img className='rounded-2xl h-[110px] w-[80px] object-cover' src={img} alt={name} />
                            </Link>
                            <Link className='mr-5' to={"/"}>
                                <img className='rounded-2xl h-[110px] w-[80px] object-cover' src={img} alt={name} />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h2 className='text-2xl font-medium'>Характеристики</h2>
                        <div className='flex flex-col my-3'>
                            <div className='flex'>
                                <div className='flex items-center w-[150px]'>
                                    <span className='pr-2 text-gray-300'>Артикул</span>
                                    <div className='w-full bg-gray-300 h-[1px]' />
                                </div>
                                <span className='pl-3'>{productId}</span>
                            </div>
                            <div className='flex'>
                                <div className='flex items-center w-[150px]'>
                                    <span className='pr-2 text-gray-300'>Цвет</span>
                                    <div className='w-full bg-gray-300 h-[1px]' />
                                </div>
                                <span className='pl-3'>{color}</span>
                            </div>
                            <div className='flex'>
                                <div className='flex items-center w-[150px]'>
                                    <span className='pr-2 text-gray-300'>Состав</span>
                                    <div className='w-full bg-gray-300 h-[1px]' />
                                </div>
                                <span className='pl-3'>{compound}</span>
                            </div>
                            <div className='flex'>
                                <div className='flex items-center w-[150px]'>
                                    <span className='pr-2 text-gray-300'>Пол</span>
                                    <div className='w-full bg-gray-300 h-[1px]' />
                                </div>
                                <span className='pl-3'>{gender}</span>
                            </div>
                            <div className='flex'>
                                <div className='flex items-center w-[150px]'>
                                    <span className='pr-2 text-gray-300'>Сезон</span>
                                    <div className='w-full bg-gray-300 h-[1px]' />
                                </div>
                                <span className='pl-3'>{season}</span>
                            </div>
                        </div>
                    </div>
                    <div className='my-5'>
                        <h2 className='text-2xl font-medium'>Размеры</h2>
                        <div>
                            <button>{size}</button>
                        </div>
                    </div>
                    <div>
                        <h2 className='text-2xl font-medium'>Описание</h2>
                        <p className='text-start my-5'>
                            <span>
                                {descriptionNotFull}
                            </span>
                            <AlterDialogComponent>
                                {description}
                            </AlterDialogComponent>
                        </p>
                    </div>
                </div>
                <div className=' flex flex-col justify-between items-center bg-white w-[340px] h-30 rounded-2xl'>
                    <div className='flex items-center justify-between w-[300px]'>
                        <span className='text-[34px] font-medium text-pink-600 '>{price.toLocaleString("ru-Ru", { style: "currency", currency: "RUB", minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                        <span className='text-[20px] font-medium text-[#A2A2A2] line-through'>{discount.toLocaleString("ru-Ru", { style: "currency", currency: "RUB", minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className='flex justify-center mb-4'>
                        <button className='bg-[#0F4C81] w-[300px] h-11 rounded-2xl text-white text-[17px] font-medium cursor-pointer hover:bg-[#092d4d]'>В корзину</button>
                    </div>
                </div>
            </div>
            <Rating productOptionId={id} />
        </div>
    )
}