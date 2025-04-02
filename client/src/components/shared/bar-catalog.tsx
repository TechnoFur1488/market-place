import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
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
    isSetBtn: React.Dispatch<React.SetStateAction<boolean>>
}

export const BarCatalog: React.FC<Props> = ({ id, name, url, sub_category }) => {
    return (
        <li key={id}>
            {url ? <Link to={url}>{name}</Link> : <button>{name}</button>}
            <ul>
                {sub_category?.map((el) => {
                    return (
                        <li key={el.id}>
                            {el.url ? <Link to={el.url}>{el.name}</Link> : <button>{el.name}</button>}
                            <ul>
                                {el.sub_sub_category?.map((el) => {
                                    return (
                                        <li key={el.id}>
                                            {el.url ? <Link to={`${el.url}`}>{el.name}</Link> : <button>{el.name}</button>}
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </li>
    )
}