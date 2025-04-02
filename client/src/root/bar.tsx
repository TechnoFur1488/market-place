import { BarCatalog, Container } from "@/components/shared"
import { useGetCategoryQuery } from "@/store/apiSlice"
import React, { useEffect } from "react"
import { Outlet, useOutletContext } from "react-router-dom"

interface Props {
    className?: string
}

interface State {
    btn: boolean
    setBtn: React.Dispatch<React.SetStateAction<boolean>>
}

interface Category {
    id: number
    name: string
    url?: string
    sub_category: Array<{
        id: number
        name: string
        url?: string
        sub_sub_category: Array<{
            id: number
            name: string
            url?: string
        }>
    }>
}

export const Bar: React.FC<Props> = ({ }) => {

    const { btn, setBtn } = useOutletContext<State>()

    const { data } = useGetCategoryQuery()

    useEffect(() => {
        if (!btn) {
            document.body.style.overflow = "auto"
        } else {
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [btn])

    return (
        <>
            <div className={`${btn ? "fixed left-0 top-0 z-30 block bg-[#0B3559] w-[300px] h-screen" : "hidden"}`}>
                <h1>Каталог</h1>
                <nav className="pt-[300px]">
                    <ul>
                        {data?.map((el: Category) => {
                            return (
                                <BarCatalog
                                    key={el.id}
                                    id={el.id}
                                    name={el.name}
                                    url={el.url}
                                    sub_category={el.sub_category}
                                    isSetBtn={setBtn}
                                />
                            )
                        })}
                    </ul>
                </nav>
            </div>
            <Container>
                <Outlet />
            </Container>
        </>
    )
}