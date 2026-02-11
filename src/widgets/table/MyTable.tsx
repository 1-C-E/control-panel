import {
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
import './MyTable.scss'
import highPriorityIcon from '/src/shared/assets/icons/high-priority.svg'
import lowPriorityIcon from '/src/shared/assets/icons/low-priority.svg'

const MyTable = () => {
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
							<Th>Статус</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td>КС-001</Td>
							<Td>
								<span className='pharmacy-number'>065</span>
								<span>Геленджик Островского 7</span>
							</Td>
							<Td>
								<span>20.07.2025</span>
								<span>12:35:45</span>
							</Td>
							<Td>
								<img src={highPriorityIcon} />
								<span>Высокий</span>
							</Td>
							<Td>Поломка кассы</Td>
							<Td>Кассы</Td>

							<Td>Новая</Td>
						</Tr>

						<Tr>
							<Td>ХЛ-001</Td>
							<Td>
								<span className='pharmacy-number'>150</span>
								<span>Кореновск Красная 108</span>
							</Td>
							<Td>
								<span>21.08.2025</span>
								<span>13:35:45</span>
							</Td>
							<Td>
								<img src={lowPriorityIcon} />
								<span>Низкий</span>
							</Td>
							<Td>Холодильник сильно гудит</Td>
							<Td>Холодильники</Td>

							<Td>Новая</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default MyTable
