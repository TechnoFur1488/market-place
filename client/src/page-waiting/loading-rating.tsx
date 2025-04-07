import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

interface Props {
    className?: string
}

export const LoadingRating: React.FC<Props> = ({  }) => {
    return (
        <div className="flex justify-between">
            <Skeleton className='rounded-2xl bg-[#303030] w-[460px] h-[150px]' />
            <Skeleton className='rounded-2xl bg-[#303030] w-[460px] h-[150px]' />
            <Skeleton className='rounded-2xl bg-[#303030] w-[460px] h-[150px]' />
        </div>
    )
}