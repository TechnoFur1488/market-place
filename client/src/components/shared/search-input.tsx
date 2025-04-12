import { Search } from 'lucide-react'
import React from 'react'

interface Props {
    className?: string
}

export const SearchInput: React.FC<Props> = ({  }) => {

    return (
        <>
            <div className="bg-gray-100 flex justify-start items-center w-240 rounded-2xl p-2">
                <Search />
                <input className='pl-4 w-full border-none outline-none' type='text' placeholder='Найти товар' />
            </div>
            <div>
                
            </div>
        </>
    )
}