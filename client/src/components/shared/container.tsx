import React from 'react'

export const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className="max-w-[1440px] m-auto mt-[20px]">
            {children}
        </div>
    )
}