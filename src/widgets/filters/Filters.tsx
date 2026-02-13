import './Filters.scss'

import createIcon from '@shared/assets/icons/create.svg'
import exportIcon from '@shared/assets/icons/export.svg'
import searchIcon from '@shared/assets/icons/search.svg'

import { useDisclosure } from '@chakra-ui/react'
import {
	useRequestsStore,
	type FilterType,
} from '@entities/request/model/store'

import { useWindowWidth } from '@shared/hooks/useWindowWidth'
import { CreateRequestModal } from '../create-request-modal'

const Filters = () => {
	const width = useWindowWidth()
	const filterTabs: FilterType[] = [
		'Новые',
		'Отклонены',
		'На рассмотрении',
		'В работе',
		'Ожидают запчасти',
		'Готовы',
		'Закрыты',
		'Все статусы',
	]

	const { isOpen, onOpen, onClose } = useDisclosure()
	const { activeFilter, setActiveFilter } = useRequestsStore()

	const getPlaceholder = () => {
		return width <= 630 ? 'Поиск' : 'Поиск по номеру или теме заявки'
	}

	return (
		<div className='container-1840'>
			<div className='filters'>
				<section className='filters__actions'>
					<div className='filters__actions__search'>
						<img src={searchIcon} alt='' />
						<input
							type='text'
							placeholder={getPlaceholder()}
							aria-label='Поиск заявок'
						/>
					</div>

					<button className='filters__actions__export'>
						<img src={exportIcon} alt='' />
						<span>Экспорт</span>
					</button>

					<button onClick={onOpen} className='filters__actions__create'>
						<img src={createIcon} alt='' />
						<span>Создать новую заявку</span>
					</button>
				</section>

				<section className='filters__tabs'>
					<ul>
						{filterTabs.map((tab, index) => (
							<li key={tab}>
								<button
									type='button'
									role='tab'
									aria-selected={activeFilter === tab}
									tabIndex={activeFilter === tab ? 0 : -1}
									id={`tab-${index + 1}`}
									aria-controls={`panel-${index + 1}`}
									onClick={() => setActiveFilter(tab)}
								>
									{tab}
								</button>
							</li>
						))}
					</ul>
				</section>

				<CreateRequestModal isOpen={isOpen} onClose={onClose} />
			</div>
		</div>
	)
}

export default Filters
