import type { Category, Pharmacy } from './types'

export const mockPharmacies: Pharmacy[] = [
	{ id: '1', number: '065', address: 'Геленджик Островского 7' },
	{ id: '2', number: '150', address: 'Кореновск Красная 108' },
	{ id: '3', number: '045', address: 'Тимашевск Интернац 3Б' },
	{ id: '4', number: '164', address: 'РнД Сельмаш 92' },
	{ id: '5', number: '190', address: 'Геленджик Душистая 24' },
	{ id: '6', number: '267', address: 'Анапа Парковая 67к2' },
]

export const mockCategories: Category[] = [
	{ id: '1', name: 'Кассы', prefix: 'КС' },
	{ id: '2', name: 'Холодильники', prefix: 'ХЛ' },
	{ id: '3', name: 'Кондиционеры', prefix: 'КН' },
	{ id: '4', name: 'Изм. оборуд.', prefix: 'ИЗ' },
	{ id: '5', name: 'Помещения', prefix: 'ПО' },
	{ id: '6', name: 'ИТ', prefix: 'ИТ' },
	{ id: '7', name: 'Сантехника', prefix: 'СА' },
]
