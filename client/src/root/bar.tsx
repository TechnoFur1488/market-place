import React from "react"
import { Outlet } from "react-router-dom"

interface Props {
    className?: string
}

export const Bar: React.FC<Props> = ({ className }) =>  {
    return (
        <>
            <div>
                
            </div>
            <Outlet />
        </>
    )
}