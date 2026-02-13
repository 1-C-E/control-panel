import {
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
import { useRequestsStore, type Request } from '@entities/request'
import criticalPriorityIcon from '@shared/assets/icons/critical-priority.svg'
import highPriorityIcon from '@shared/assets/icons/high-priority.svg'
import lowPriorityIcon from '@shared/assets/icons/low-priority.svg'
import mediumPriorityIcon from '@shared/assets/icons/medium-priority.svg'
import './MyTable.scss'

const statusClasses = {
	Новая: '-new',
	'В работе': '-in-progress',
	Готово: '-done',
	Закрыто: '-closed',
} as const

const MyTable = () => {
	const { getFilteredRequests } = useRequestsStore()
	const filteredRequests = getFilteredRequests()

	const getPriorityIcon = (priority: string) => {
		switch (priority) {
			case 'Критич.':
				return criticalPriorityIcon
			case 'Высокий':
				return highPriorityIcon
			case 'Средний':
				return mediumPriorityIcon
			case 'Низкий':
				return lowPriorityIcon
			default:
				return lowPriorityIcon
		}
	}

	return (
		<div className='container-1840'>
			<TableContainer className='my-table'>
				<Table variant='simple'>
					<Thead>
						<Tr className='my-table__header'>
							<Th className='my-table__header__number'>№</Th>
							<Th className='my-table__header__pharmacy'>Аптека</Th>
							<Th className='my-table__header__created-at'>Создана</Th>
							<Th className='my-table__header__priority'>Приоритет</Th>
							<Th className='my-table__header__topic'>Тема</Th>
							<Th className='my-table__header__category'>Категория</Th>
							<Th className='my-table__header__technician'>Техник</Th>
							<Th className='my-table__header__reaction'>Реакция</Th>
							<Th className='my-table__header__decision'>Решение</Th>
							<Th className='my-table__header__status'>Статус</Th>
						</Tr>
					</Thead>
					<Tbody>
						{filteredRequests.map((request: Request) => {
							const [date, time] = request.createdAt.split(' ')

							return (
								<Tr key={request.id}>
									<Td className='my-table__cell__number' data-label='№'>
										{request.number}
									</Td>
									<Td className='my-table__cell__pharmacy' data-label='Аптека'>
										<div className='cell-container'>
											<span className='my-table__cell__pharmacy__number'>
												{request.pharmacy.number}
											</span>
											<span>{request.pharmacy.address}</span>
										</div>
									</Td>
									<Td
										className='my-table__cell__created-at'
										data-label='Создана'
									>
										<div className='cell-container'>
											<span>{date}</span>
											<span className='my-table__cell__created-at__time'>
												{' '}
												{time}
											</span>
										</div>
									</Td>
									<Td
										className='my-table__cell__priority'
										data-label='Приоритет'
									>
										<div className='cell-container'>
											<img
												src={getPriorityIcon(request.priority)}
												alt={request.priority}
											/>
											<span className='my-table__cell__priority'>
												{request.priority}
											</span>
										</div>
									</Td>
									<Td className='my-table__cell__topic' data-label='Тема'>
										{request.topic}
									</Td>
									<Td
										className='my-table__cell__category'
										data-label='Категория'
									>
										{request.category.name}
									</Td>
									<Td
										className='my-table__cell__technician'
										data-label='Техник'
									>
										{request.technician}
									</Td>
									<Td className='my-table__cell__reaction' data-label='Реакция'>
										<div className='cell-container'>
											{request.reactionIcon && (
												<img
													src={request.reactionIcon}
													alt={`Reaction ${request.reaction}`}
												/>
											)}
											{request.reaction}
										</div>
									</Td>
									<Td className='my-table__cell__decision' data-label='Решение'>
										<div className='cell-container'>
											{request.decisionIcon && (
												<img
													src={request.decisionIcon}
													alt={`Reaction ${request.decision}`}
												/>
											)}
											{request.decision}
										</div>
									</Td>
									<Td className='my-table__cell__status' data-label='Статус'>
										<div className='cell-container'>
											<span
												className={`my-table__cell__status ${statusClasses[request.status]}`}
											>
												{request.status}
											</span>
										</div>
									</Td>
								</Tr>
							)
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default MyTable
