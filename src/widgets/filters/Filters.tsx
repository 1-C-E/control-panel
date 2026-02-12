import './Filters.scss'

import createIcon from '@shared/assets/icons/create.svg'
import exportIcon from '@shared/assets/icons/export.svg'
import searchIcon from '@shared/assets/icons/search.svg'

import { useDisclosure } from '@chakra-ui/react'

import { CreateRequestModal } from '../create-request-modal'

const Filters = () => {
	const filterTabs = [
		'Новые',
		'Отклонены',
		'На рассмотрении',
		'В работе',
		'Ожидают запчасти',
		'Готовы',
		'Закрыты',
		'Все статусы',
	] as const

	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<div className='filters'>
			<section className='filters__actions container-1840'>
				<div className='filters__actions__search'>
					<img src={searchIcon} alt='' />
					<input
						type='text'
						placeholder='Поиск по номеру или теме заявки'
						aria-label='Поиск заявок'
					/>
				</div>

				<button className='filters__actions__export'>
					<img src={exportIcon} />
					<span>Экспорт</span>
				</button>

				<button onClick={onOpen} className='filters__actions__create'>
					<img src={createIcon} />
					<span>Создать новую заявку</span>
				</button>
			</section>

			<section className='filters__tabs'>
				<ul>
					{filterTabs.map((tab, index) => (
						<li key={tab} className='filters__status-item'>
							<button
								type='button'
								role='tab'
								aria-selected={index === 0}
								tabIndex={index === 0 ? 0 : -1}
								id={`tab-${index + 1}`}
								aria-controls={`panel-${index + 1}`}
							>
								{tab}
							</button>
						</li>
					))}
				</ul>
			</section>

			<CreateRequestModal isOpen={isOpen} onClose={onClose} />
		</div>
	)
}

export default Filters
