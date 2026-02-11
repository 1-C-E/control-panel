import type { Category, Pharmacy } from './types'

export const mockPharmacies: Pharmacy[] = [
	{ id: '1', number: '065', address: 'Геленджик Островского 7' },
	{ id: '2', number: '150', address: 'Кореновск Красная 108' },
	{ id: '3', number: '089', address: 'Краснодар Красная 200' },
	{ id: '4', number: '234', address: 'Новороссийск Советов 45' },
]

export const mockCategories: Category[] = [
	{ id: '1', name: 'Кассы', prefix: 'КС' },
	{ id: '2', name: 'Холодильники', prefix: 'ХЛ' },
	{ id: '3', name: 'Кондиционеры', prefix: 'КН' },
	{ id: '4', name: 'Освещение', prefix: 'ОС' },
]
