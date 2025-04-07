import React from 'react'
import { Link} from 'react-router-dom'

interface CardProductProps {
    isImgProduct: string
    isNameProduct: string
    isPriceProduct: number | string
    isDiscountProduct: number | string
    isProductId: number
}


export const CardProduct: React.FC<CardProductProps> = ({ isImgProduct, isNameProduct, isPriceProduct, isDiscountProduct, isProductId }) => {

    if(isNameProduct.length > 15) {
        isNameProduct = isNameProduct.slice(0, 20) + "..."
    }

    return (
        <div className="flex flex-col justify-between w-[216px] h-[435px]">
            <Link to={ `/product-option/${isProductId}`} className="flex flex-col justify-between h-[370px]">
                <img className='rounded-2xl h-[267px] w-[100%] object-cover' src={isImgProduct} alt="" />
                <div className='flex items-center font-medium'>
                    <span className='text-[24px] text-pink-600 pr-3.5'>{isPriceProduct.toLocaleString("ru-Ru", {style: "currency", currency: "RUB", minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                    <span className='text-[15px] text-[#A2A2A2] line-through'>{isDiscountProduct.toLocaleString("ru-Ru", {style: "currency", currency: "RUB", minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                </div>
                <span className='text-white font-medium'>{isNameProduct}</span>
            </Link>
            <button className='bg-[#0F4C81] h-11 rounded-2xl text-white text-[14px] font-medium cursor-pointer hover:bg-[#092d4d]'>Добавить в корзину</button>
        </div>
    )
}