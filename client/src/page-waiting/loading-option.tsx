import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

interface Props {
    className?: string
}

export const LoadingOption: React.FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <div className='flex justify-between'>
                <Skeleton className='bg-[#303030] rounded-2xl h-[700px] w-[525px]' />
                <div className='w-[480px]'>
                    <Skeleton className='h-[36px] w-[420px] bg-[#303030] rounded-2xl' />
                    <div className='mt-5'>
                        <Skeleton className='h-[32px] w-[230px] bg-[#303030] rounded-2xl' />
                        <div className='flex items-center py-5'>
                            <Skeleton className='mr-5 bg-[#303030] rounded-2xl h-[110px] w-[80px]' />
                            <Skeleton className='mr-5 bg-[#303030] rounded-2xl h-[110px] w-[80px]' />
                            <Skeleton className='mr-5 bg-[#303030] rounded-2xl h-[110px] w-[80px]' />
                            <Skeleton className='mr-5 bg-[#303030] rounded-2xl h-[110px] w-[80px]' />
                        </div>
                    </div>
                    <div>
                        <Skeleton className='bg-[#303030] rounded-2xl h-[32px] w-[190px]' />
                        <div className=' flex flex-col my-3'>
                            <Skeleton className='bg-[#303030] rounded-2xl h-[24px] w-[300px] mb-1' />
                            <Skeleton className='bg-[#303030] rounded-2xl h-[24px] w-[300px] mb-1' />
                            <Skeleton className='bg-[#303030] rounded-2xl h-[24px] w-[300px] mb-1' />
                            <Skeleton className='bg-[#303030] rounded-2xl h-[24px] w-[300px] mb-1' />
                            <Skeleton className='bg-[#303030] rounded-2xl h-[24px] w-[300px] mb-1' />
                        </div>
                    </div>
                    <div className='my-5'>
                        <Skeleton className='bg-[#303030] rounded-2xl h-[32px] w-[100px]' />
                    </div>
                    <div>
                        <Skeleton className='bg-[#303030] rounded-2xl h-[32px] w-[100px]' />
                        <Skeleton className=' bg-[#303030] rounded-2xl my-5 w-[457px] h-[141px]' />
                    </div>
                </div>
                <Skeleton className='w-[340px] bg-[#303030] h-30 rounded-2xl' />
            </div>
        </div>
    )
}