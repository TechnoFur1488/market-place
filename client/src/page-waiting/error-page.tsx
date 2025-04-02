import React from 'react'

interface Props {
    className?: string
}

export const ErrorPage: React.FC<Props> = ({  }) => {
    return (
        <div className="flex justify-center items-center bg-[#1E1E1E] ">
            <h1 className='text-white text-4xl font-bold'>400 <span className='text-[#c4c4c44d] font-light'>|</span> <span className='text-[#c4c4c4] text-2xl'>Ошибка запроса данных</span></h1>
        </div>
    )
}