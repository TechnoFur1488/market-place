import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const AlterDialogComponent: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger className='pl-1.5 font-bold cursor-pointer'>Еще</AlertDialogTrigger>
            <AlertDialogContent className='bg-[#1E1E1E] border-0'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-white'>Описание</AlertDialogTitle>
                    <div className="w-full h-[2px] bg-[#0F4C81]" />
                    <AlertDialogDescription className='text-gray-300'>
                        {children}
                    </AlertDialogDescription>
                    <div className="w-full h-[2px] bg-[#0F4C81]" />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction className='cursor-pointer bg-[#0F4C81] hover:bg-[#092d4d] '>Продолжить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}