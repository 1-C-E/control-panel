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

export type Priority = 'Низкий' | 'Высокий'

export type RequestStatus = 'Новая'

export type Request = {
	id: string
	number: string
	pharmacy: Pharmacy
	createdAt: string
	priority: Priority
	topic: string
	category: Category
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
