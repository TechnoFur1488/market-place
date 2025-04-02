import React from 'react'
import { Skeleton } from '../components/ui/skeleton'

interface Props {
    className?: string
}

export const LoadingPage: React.FC<Props> = ({ }) => {

    const skeleton = Array.from({ length: 12 })

    return (
        <div className="grid grid-cols-6 gap-x-[30px] gap-y-[30px]">
            {skeleton.map((_, i) => (
                <div key={i} className='flex flex-col justify-between w-[215px] h-[435px]'>
                    <div className='flex flex-col justify-between h-[370px]'>
                        <Skeleton className='rounded-2xl h-[267px] w-[100%] bg-[#303030]' />
                        <Skeleton className='w-[180px] h-[33px] bg-[#303030] rounded-2xl' />
                        <Skeleton className='w-[100%] h-[23px] bg-[#303030] rounded-2xl' />
                    </div>
                    <Skeleton className='w-[215px] h-11 bg-[#303030] rounded-2xl' />
                </div>
            ))}
        </div>
    )
}