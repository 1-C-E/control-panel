import { create } from 'zustand'
import { mockCategories, mockPharmacies } from './mockData'
import type { CreateRequestDTO, Request } from './types'

// Тип нашего store
type RequestsStore = {
	requests: Request[]
	pharmacies: typeof mockPharmacies
	categories: typeof mockCategories
	addRequest: (data: CreateRequestDTO) => void
}

// Генерируем уникальный номер заявки
const generateRequestNumber = (
	categoryPrefix: string,
	existingRequests: Request[],
): string => {
	const categoryRequests = existingRequests.filter(req =>
		req.number.startsWith(categoryPrefix),
	)
	const nextNumber = (categoryRequests.length + 1).toString().padStart(3, '0')
	return `${categoryPrefix}-${nextNumber}`
}

// Форматируем текущую дату
const formatDate = (): string => {
	const date = new Date()
	const day = date.getDate().toString().padStart(2, '0')
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const year = date.getFullYear()
	return `${day}.${month}.${year}`
}

// Форматируем текущее время
const formatTime = (): string => {
	const date = new Date()
	const hours = date.getHours().toString().padStart(2, '0')
	const minutes = date.getMinutes().toString().padStart(2, '0')
	const seconds = date.getSeconds().toString().padStart(2, '0')
	return `${hours}:${minutes}:${seconds}`
}

export const useRequestsStore = create<RequestsStore>(set => ({
	// Начальное состояние - две тестовые заявки
	requests: [
		{
			id: '3',
			number: 'КС-001',
			pharmacy: mockPharmacies[2],
			createdAt: '22.07.2025 12:35:45',
			priority: 'Высокий',
			topic: 'Поломка кассы',
			category: mockCategories[2],
			technician: 'Федоровский Н.',
			reaction: '05:01',
			decision: '01:35:34',
			status: 'В работе',
			isWarranty: false,
			description: '',
			photos: [],
		},
		{
			id: '2',
			number: 'ХЛ-001',
			pharmacy: mockPharmacies[1],
			createdAt: '21.08.2025 15:35:45',
			priority: 'Низкий',
			topic: 'Холодильник сильно гудит',
			category: mockCategories[1],
			technician: 'Максимов П.',
			reaction: '04:38',
			decision: '02:46:17',
			status: 'Готово',
			isWarranty: false,
			description: '',
			photos: [],
		},
		{
			id: '1',
			number: 'ХЛ-001',
			pharmacy: mockPharmacies[0],
			createdAt: '21.08.2025 13:30:41',
			priority: 'Низкий',
			topic: 'Холодильник сильно гудит',
			category: mockCategories[0],
			technician: 'Алексеев М.',
			reaction: '06:10',
			decision: '02:48:10',
			status: 'Закрыто',
			isWarranty: false,
			description: '',
			photos: [],
		},
	],
	pharmacies: mockPharmacies,
	categories: mockCategories,

	// Функция добавления новой заявки
	addRequest: data =>
		set(state => {
			const category = state.categories.find(c => c.id === data.categoryId)!
			const pharmacy = state.pharmacies.find(p => p.id === data.pharmacyId)!

			const requestNumber = generateRequestNumber(
				category.prefix,
				state.requests,
			)

			const newRequest: Request = {
				id: Date.now().toString(),
				number: requestNumber,
				pharmacy,
				createdAt: `${formatDate()} ${formatTime()}`,
				priority: data.priority,
				topic: data.topic,
				category,
				technician: '-',
				reaction: '-',
				decision: '-',
				status: 'Новая',
				isWarranty: data.isWarranty,
				description: data.description,
				photos: data.photos,
			}

			return {
				requests: [newRequest, ...state.requests],
			}
		}),
}))
