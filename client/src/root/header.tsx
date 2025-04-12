import { SearchInput } from "@/components/shared/search-input"
import { Menu, PencilRuler, ShoppingCart, User } from "lucide-react"
import React, { useState } from "react"
import { Link, Outlet } from "react-router-dom"

interface Props {
    className?: string
}

export const Header: React.FC<Props> = ({ }) => {

    const [btn, setBtn] = useState(false)

    return (
        <>
            <header className="bg-[#0F4C81] sticky top-0 z-40">
                <nav className="flex py-[30px]  justify-between items-center max-w-[1440px] m-auto">
                    <Link to={"/"}><img src="../images/Group 84.png" alt="" /></Link>
                    <Menu onClick={() => setBtn(!btn)} className="text-white cursor-pointer" size={35} />
                    {/* <input className="bg-white rounded-[24px] w-[926px] px-[31px] py-[10px]" type="text" /> */}
                    <SearchInput />
                    <ul className="flex">
                        <li className="pr-[50px]">
                            <Link to={"/"}>
                                <User className="text-white" size={35} />
                            </Link>
                        </li>
                        <li className="pr-[50px]">
                            <Link to={"/create"}>
                                <PencilRuler className="text-white" size={35} />
                            </Link>
                        </li>
                        <li>
                            <Link to={"/"}>
                                <ShoppingCart className="text-white" size={35} />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <Outlet context={{ btn, setBtn }} />
        </>
    )
}