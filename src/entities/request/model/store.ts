import doneIcon from '@shared/assets/icons/done.svg'
import expectationIcon from '@shared/assets/icons/expectation.svg'
import rejectionIcon from '@shared/assets/icons/rejection.svg'
import { create } from 'zustand'
import { mockCategories, mockPharmacies } from './mockData'
import type { CreateRequestDTO, Request } from './types'

// Тип для фильтров
export type FilterType =
	| 'Новые'
	| 'Отклонены'
	| 'На рассмотрении'
	| 'В работе'
	| 'Ожидают запчасти'
	| 'Готовы'
	| 'Закрыты'
	| 'Все статусы'

// Тип нашего store
type RequestsStore = {
	requests: Request[]
	pharmacies: typeof mockPharmacies
	categories: typeof mockCategories
	activeFilter: FilterType
	setActiveFilter: (filter: FilterType) => void
	getFilteredRequests: () => Request[]
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

export const useRequestsStore = create<RequestsStore>((set, get) => ({
	// Начальное состояние - пять тестовых заявок
	requests: [
		{
			id: '5',
			number: 'КН-001',
			pharmacy: mockPharmacies[5],
			createdAt: '23.07.2025 15:35:45',
			priority: 'Средний',
			topic: 'Конденсат на внутреннем блоке',
			category: mockCategories[2],
			technician: 'Китов Я.',
			reaction: '05:27',
			reactionIcon: doneIcon,
			decision: '01:50:34',
			decisionIcon: expectationIcon,
			status: 'В работе',
			isWarranty: false,
			description: '',
			photos: [],
		},
		{
			id: '3',
			number: 'ПО-002',
			pharmacy: mockPharmacies[2],
			createdAt: '23.08.2025 15:35:45 ',
			priority: 'Высокий',
			topic: 'Заметили крыс у входа',
			category: mockCategories[4],
			technician: 'Федоровский Н.',
			reaction: '05:01',
			reactionIcon: doneIcon,
			decision: '01:35:34',
			decisionIcon: doneIcon,
			status: 'Готово',
			isWarranty: false,
			description: '',
			photos: [],
		},
		{
			id: '4',
			number: 'ИЗ-002',
			pharmacy: mockPharmacies[4],
			createdAt: '22.07.2025 12:35:45',
			priority: 'Критич.',
			topic: 'Нужно поверить гигрометр',
			category: mockCategories[3],
			technician: 'Алексеев М.',
			reaction: '03:10',
			reactionIcon: doneIcon,
			decision: '01:40:13',
			decisionIcon: doneIcon,
			status: 'Закрыто',
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
			reactionIcon: doneIcon,
			decision: '02:46:17',
			decisionIcon: doneIcon,
			status: 'Закрыто',
			isWarranty: false,
			description: '',
			photos: [],
		},
		{
			id: '1',
			number: 'КС-001',
			pharmacy: mockPharmacies[0],
			createdAt: '21.08.2025 13:30:41',
			priority: 'Низкий',
			topic: 'Поломка кассы',
			category: mockCategories[0],
			technician: 'Алексеев М.',
			reaction: '06:10',
			reactionIcon: doneIcon,
			decision: '02:48:10',
			decisionIcon: rejectionIcon,
			status: 'Готово',
			isWarranty: false,
			description: '',
			photos: [],
		},
	],
	pharmacies: mockPharmacies,
	categories: mockCategories,
	activeFilter: 'Все статусы',

	setActiveFilter: filter => set({ activeFilter: filter }),

	getFilteredRequests: () => {
		const { requests, activeFilter } = get()

		switch (activeFilter) {
			case 'Новые':
				return requests.filter(request => request.status === 'Новая')

			case 'Отклонены':
				return requests.filter(
					request => request.decisionIcon === rejectionIcon,
				)

			case 'На рассмотрении':
				return requests.filter(request => request.reaction === '-')

			case 'В работе':
				return requests.filter(request => request.status === 'В работе')

			case 'Ожидают запчасти':
				return requests.filter(
					request => request.decisionIcon === expectationIcon,
				)

			case 'Готовы':
				return requests.filter(request => request.status === 'Готово')

			case 'Закрыты':
				return requests.filter(request => request.status === 'Закрыто')

			case 'Все статусы':
			default:
				return requests
		}
	},

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
