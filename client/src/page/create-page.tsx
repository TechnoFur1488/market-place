import { Input } from '@/components/ui/input'
import { usePostProductMutation } from '@/store/apiSlice'
import React, { useRef, useState } from 'react'

interface Props {
    className?: string
}

export const CreatePage: React.FC<Props> = ({ className }) => {
    const [postData, { isLoading }] = usePostProductMutation()
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [image, setImage] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [name, setName] = useState("")
    const [price, setPrice] = React.useState<number | string>("")
    const [discount, setDiscount] = React.useState<number | string>("")
    const [description, setDescription] = useState("")
    const [size, setSize] = useState("")
    const [color, setColor] = useState("")
    const [compound, setCompound] = useState("")
    const [gender, setGender] = useState("")
    const [season, setSeason] = useState("")
    const [subSubCategoryId, setSubSubCategoryId] = React.useState<number | string>("")

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSuccessMessage('')
        setErrorMessage('')

        if (name.length < 13) {
            setErrorMessage('Название должно быть не короче 13 символов')
            return
        }

        if (description.length < 550) {
            setErrorMessage('Описание должно быть не короче 550 символов')
            return
        }

        if (Number(price) >= Number(discount)) {
            setErrorMessage('Цена должна быть больше скидки')
            return
        }

        if (!image) {
            setErrorMessage('Изображение товара обязательно')
            return
        }

        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("price", price.toString())
            formData.append("discount", discount.toString())
            formData.append("description", description)
            formData.append("size", size)
            formData.append("color", color)
            formData.append("compound", compound)
            formData.append("gender", gender)
            formData.append("season", season)
            formData.append("subSubCategoryId", subSubCategoryId.toString())

            formData.append("img", image)

            for (let [key, value] of formData.entries()) {
                console.log(key, value)
            }

            await postData(formData).unwrap()

            setName("")
            setPrice("")
            setDiscount("")
            setDescription("")
            setSize("")
            setColor("")
            setCompound("")
            setGender("")
            setSeason("")
            setSubSubCategoryId("")
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
            setImage(null)

            setSuccessMessage('Товар успешно создан!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch (error) {
            console.error('Полная ошибка:', error)
            setErrorMessage(error.data?.message || 'Ошибка при создании товара')
        }
    }

    return (
        <div className={`${className} p-6 max-w-4xl mx-auto`}>
            <h1 className='font-medium text-2xl text-white mb-6'>Создание товара</h1>

            {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Изображение товара</label>
                            <Input
                                className='w-full p-2 border rounded'
                                ref={fileInputRef}
                                type='file'
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Название товара</label>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className='w-full p-2 border rounded'
                                placeholder='Введите название'
                                type="text"
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Цена товара</label>
                            <input
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                className='w-full p-2 border rounded'
                                placeholder='Введите цену'
                                type="number"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Скидка (сумма)</label>
                            <input
                                value={discount}
                                onChange={e => setDiscount(e.target.value)}
                                className='w-full p-2 border rounded'
                                placeholder='Введите сумму скидки'
                                type="number"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Описание товара</label>
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className='w-full p-2 border rounded min-h-[100px]'
                                placeholder='Введите описание'
                                required
                            />
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Размер</label>
                            <input
                                value={size}
                                onChange={e => setSize(e.target.value)}
                                className='w-full p-2 border rounded'
                                placeholder='Введите размер'
                                type="text"
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Цвет</label>
                            <input
                                value={color}
                                onChange={e => setColor(e.target.value)}
                                className='w-full p-2 border rounded'
                                placeholder='Введите цвет'
                                type="text"
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Состав</label>
                            <input
                                value={compound}
                                onChange={e => setCompound(e.target.value)}
                                className='w-full p-2 border rounded'
                                placeholder='Введите состав'
                                type="text"
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Пол</label>
                            <select
                                value={gender}
                                onChange={e => setGender(e.target.value)}
                                className='w-full p-2 border rounded'
                            >
                                <option value="">Выберите пол</option>
                                <option value="male">Мужской</option>
                                <option value="female">Женский</option>
                                <option value="unisex">Унисекс</option>
                            </select>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Сезон</label>
                            <select
                                value={season}
                                onChange={e => setSeason(e.target.value)}
                                className='w-full p-2 border rounded'
                            >
                                <option value="">Выберите сезон</option>
                                <option value="winter">Зима</option>
                                <option value="spring">Весна</option>
                                <option value="summer">Лето</option>
                                <option value="autumn">Осень</option>
                                <option value="all">Демисезон</option>
                            </select>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Категория (ID)</label>
                            <input
                                value={subSubCategoryId}
                                onChange={e => setSubSubCategoryId(e.target.value)}
                                className='w-full p-2 border rounded'
                                placeholder='Введите ID категории'
                                type="number"
                                min="0"
                                required
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`mt-6 w-full py-2 px-4 rounded-md text-white font-medium ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {isLoading ? 'Создание...' : 'Создать товар'}
                </button>
            </form>
        </div>
    )
}