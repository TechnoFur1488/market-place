import { Menu, Search, ShoppingCart, User } from "lucide-react"
import React from "react"
import { Link, Outlet } from "react-router-dom"

interface Props {
    className?: string
}

export const Header: React.FC<Props> = ({ className }) => {
    return (
        <>
            <header className="bg-[#0F4C81]">
                <nav className="flex py-[30px]  justify-between items-center max-w-[1440px] m-auto">
                    <Link to={"/"}><img src="./images/Group 84.png" alt="" /></Link>
                    <Menu className="text-white cursor-pointer" size={42} />
                    <input className="bg-white rounded-[24px] w-[926px] px-[31px] py-[10px]" type="text" />
                    <ul className="flex">
                        <li className="pr-[83px]">
                            <Link to={"/"}>
                                <User className="text-white" size={42} />
                            </Link>
                        </li>
                        <li>
                            <Link to={"/"}>
                                <ShoppingCart className="text-white" size={42} />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </>
    )
}