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
							<Th>№</Th>
							<Th>Аптека</Th>
							<Th>Создана</Th>
							<Th>Приоритет</Th>
							<Th>Тема</Th>
							<Th>Категория</Th>
							<Th>Техник</Th>
							<Th>Реакция</Th>
							<Th>Решение</Th>
							<Th>Статус</Th>
						</Tr>
					</Thead>
					<Tbody>
						{filteredRequests.map((request: Request) => {
							const [date, time] = request.createdAt.split(' ')

							return (
								<Tr key={request.id}>
									<Td>{request.number}</Td>
									<Td>
										<div className='my-table__cell'>
											<span className='my-table__cell__pharmacy-number'>
												{request.pharmacy.number}
											</span>
											<span>{request.pharmacy.address}</span>
										</div>
									</Td>
									<Td>
										<div className='my-table__cell'>
											<span>{date}</span>
											<span className='my-table__cell__time'> {time}</span>
										</div>
									</Td>
									<Td>
										<div className='my-table__cell'>
											<img
												src={getPriorityIcon(request.priority)}
												alt={request.priority}
											/>
											<span className='my-table__cell__priority'>
												{request.priority}
											</span>
										</div>
									</Td>
									<Td>{request.topic}</Td>
									<Td>{request.category.name}</Td>
									<Td>{request.technician}</Td>
									<Td>
										<div className='my-table__cell'>
											{request.reactionIcon && (
												<img
													src={request.reactionIcon}
													alt={`Reaction ${request.reaction}`}
												/>
											)}
											{request.reaction}
										</div>
									</Td>
									<Td>
										<div className='my-table__cell'>
											{request.decisionIcon && (
												<img
													src={request.decisionIcon}
													alt={`Reaction ${request.decision}`}
												/>
											)}
											{request.decision}
										</div>
									</Td>
									<Td>
										<div className='my-table__cell'>
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
