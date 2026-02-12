export type Pharmacy = {
	id: string
	number: string
	address: string
}

export type Category = {
	id: string
	name: string
	prefix: string
}

export type Priority = 'Низкий' | 'Средний' | 'Высокий' | 'Критич.'

export type RequestStatus = 'Новая' | 'В работе' | 'Готово' | 'Закрыто'

export type Request = {
	id: string
	number: string
	pharmacy: Pharmacy
	createdAt: string
	priority: Priority
	topic: string
	category: Category
	technician: string
	reaction: string
	reactionIcon?: string
	decision: string
	decisionIcon?: string
	status: RequestStatus
	isWarranty: boolean
	description: string
	photos: File[]
}

export type CreateRequestDTO = {
	pharmacyId: string
	categoryId: string
	isWarranty: boolean
	topic: string
	priority: Priority
	description: string
	photos: File[]
}
