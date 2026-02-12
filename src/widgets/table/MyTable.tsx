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
		<div className='my-table container-1840'>
			<TableContainer>
				<Table variant='simple'>
					<Thead>
						<Tr>
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
										<span className='pharmacy-number'>
											{request.pharmacy.number}
										</span>
										<span>{request.pharmacy.address}</span>
									</Td>
									<Td>
										<span>{date}</span>
										<span> {time}</span>
									</Td>
									<Td>
										<img
											src={getPriorityIcon(request.priority)}
											alt={request.priority}
										/>
										<span>{request.priority}</span>
									</Td>
									<Td>{request.topic}</Td>
									<Td>{request.category.name}</Td>
									<Td>{request.technician}</Td>
									<Td>
										{request.reactionIcon && (
											<img
												src={request.reactionIcon}
												alt={`Reaction ${request.reaction}`}
												style={{
													marginRight: '8px',
													width: '16px',
													height: '16px',
												}}
											/>
										)}
										{request.reaction}
									</Td>
									<Td>
										{request.decisionIcon && (
											<img
												src={request.decisionIcon}
												alt={`Reaction ${request.decision}`}
												style={{
													marginRight: '8px',
													width: '16px',
													height: '16px',
												}}
											/>
										)}
										{request.decision}
									</Td>
									<Td>{request.status}</Td>
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
