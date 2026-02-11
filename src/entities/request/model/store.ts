import { create } from 'zustand'
import { mockCategories, mockPharmacies } from './mockData'
import type { CreateRequestDTO, Request } from './types'

type RequestsStore = {
	requests: Request[]
	pharmacies: typeof mockPharmacies
	categories: typeof mockCategories
	addRequest: (data: CreateRequestDTO) => void
}

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

const formatDate = (): string => {
	const date = new Date()
	const day = date.getDate().toString().padStart(2, '0')
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const year = date.getFullYear()
	return `${day}.${month}.${year}`
}

const formatTime = (): string => {
	const date = new Date()
	const hours = date.getHours().toString().padStart(2, '0')
	const minutes = date.getMinutes().toString().padStart(2, '0')
	const seconds = date.getSeconds().toString().padStart(2, '0')
	return `${hours}:${minutes}:${seconds}`
}

export const useRequestsStore = create<RequestsStore>(set => ({
	requests: [
		{
			id: '1',
			number: 'КС-001',
			pharmacy: mockPharmacies[0],
			createdAt: '20.07.2025 12:35:45',
			priority: 'Высокий',
			topic: 'Поломка кассы',
			category: mockCategories[0],
			status: 'Новая',
			isWarranty: false,
			description: '',
			photos: [],
		},
		{
			id: '2',
			number: 'ХЛ-001',
			pharmacy: mockPharmacies[1],
			createdAt: '21.08.2025 13:35:45',
			priority: 'Низкий',
			topic: 'Холодильник сильно гудит',
			category: mockCategories[1],
			status: 'Новая',
			isWarranty: false,
			description: '',
			photos: [],
		},
	],
	pharmacies: mockPharmacies,
	categories: mockCategories,
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
				status: 'Новая',
				isWarranty: data.isWarranty,
				description: data.description,
				photos: data.photos,
			}

			return {
				requests: [...state.requests, newRequest],
			}
		}),
}))
