import { CloseIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormLabel,
	HStack,
	IconButton,
	Image,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Text,
	Textarea,
	VStack,
} from '@chakra-ui/react'

import type { Category, Pharmacy, Priority } from '@entities/request'
import { useRef, useState, type FC } from 'react'
import './CreateRequestModal.scss'

import { useRequestsStore } from '@entities/request'
import criticalPriorityIcon from '@shared/assets/icons/critical-priority.svg'
import highPriorityIcon from '@shared/assets/icons/high-priority.svg'
import imageIcon from '@shared/assets/icons/image.svg'
import lowPriorityIcon from '@shared/assets/icons/low-priority.svg'
import mediumPriorityIcon from '@shared/assets/icons/medium-priority.svg'

type CreateRequestModalProps = {
	isOpen: boolean
	onClose: () => void
}

export const CreateRequestModal: FC<CreateRequestModalProps> = ({
	isOpen,
	onClose,
}) => {
	const { pharmacies, categories, addRequest } = useRequestsStore()
	const fileInputRef = useRef<HTMLInputElement>(null)

	const [selectedPharmacy, setSelectedPharmacy] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('')
	const [isWarranty, setIsWarranty] = useState(false)
	const [topic, setTopic] = useState('')
	const [priority, setPriority] = useState<Priority>('Низкий')
	const [description, setDescription] = useState('')
	const [photos, setPhotos] = useState<File[]>([])
	const [photoPreviews, setPhotoPreviews] = useState<string[]>([])

	const handleSubmit = () => {
		if (!selectedPharmacy || !selectedCategory || !topic) return

		addRequest({
			pharmacyId: selectedPharmacy,
			categoryId: selectedCategory,
			isWarranty,
			topic,
			priority,
			description,
			photos,
		})

		setSelectedPharmacy('')
		setSelectedCategory('')
		setIsWarranty(false)
		setTopic('')
		setPriority('Низкий')
		setDescription('')
		setPhotos([])
		setPhotoPreviews([])

		onClose()
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || [])
		setPhotos(prev => [...prev, ...files])

		files.forEach(file => {
			const reader = new FileReader()
			reader.onloadend = () => {
				setPhotoPreviews(prev => [...prev, reader.result as string])
			}
			reader.readAsDataURL(file)
		})
	}

	const removePhoto = (index: number) => {
		setPhotos(prev => prev.filter((_, i) => i !== index))
		setPhotoPreviews(prev => prev.filter((_, i) => i !== index))
	}

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

	const getPriorityDisplayName = (priority: string) => {
		switch (priority) {
			case 'Критич.':
				return 'Критический'
			default:
				return priority
		}
	}

	const getPriorityDescription = (priority: string) => {
		switch (priority) {
			case 'Низкий':
				return 'не сильно влияет на эффективность'
			case 'Средний':
				return 'влияет на эффективность, но не стопорит'
			case 'Высокий':
				return 'сильно влияет на эффективность'
			case 'Критич.':
				return 'останавливает все процессы'
			default:
				return ''
		}
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} size='5xl'>
			<ModalOverlay />
			<ModalContent className='modal'>
				<ModalHeader className='modal__title'>Создание заявки</ModalHeader>
				<ModalCloseButton />
				<ModalBody className='container' width='100%'>
					<VStack spacing={10} align='stretch' width='100%'>
						<FormControl isRequired>
							<FormLabel className='modal__label'>Аптека</FormLabel>
							<Select
								className='modal__select'
								placeholder='Выберите аптеку от которой исходит заявка'
								value={selectedPharmacy}
								onChange={e => setSelectedPharmacy(e.target.value)}
							>
								{pharmacies.map((pharmacy: Pharmacy) => (
									<option key={pharmacy.id} value={pharmacy.id}>
										[{pharmacy.number}] {pharmacy.address}
									</option>
								))}
							</Select>
						</FormControl>

						<VStack spacing={4} align='stretch' width='100%'>
							<FormControl isRequired>
								<FormLabel className='modal__label'>Категория заявки</FormLabel>
								<Select
									className='modal__select'
									placeholder='Выберите категорию'
									value={selectedCategory}
									onChange={e => setSelectedCategory(e.target.value)}
								>
									{categories.map((category: Category) => (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									))}
								</Select>
							</FormControl>

							<FormControl>
								<Checkbox
									className='modal__checkbox'
									isChecked={isWarranty}
									onChange={e => setIsWarranty(e.target.checked)}
								>
									Гарантийный случай?
								</Checkbox>
							</FormControl>
						</VStack>
					</VStack>

					<VStack spacing={8} align='stretch' width='100%'>
						<FormControl isRequired>
							<FormLabel className='modal__label'>Тема заявки</FormLabel>
							<Textarea
								className='modal__select'
								value={topic}
								onChange={e => setTopic(e.target.value)}
								placeholder='Дайте заявке краткое название: например, сломался холодильник или не работает кондиционер'
							/>
						</FormControl>

						<FormControl isRequired>
							<FormLabel className='modal__label'>Приоритет</FormLabel>
							<Menu>
								<MenuButton as={Button} className='modal__select'>
									<HStack spacing={2}>
										<Image src={getPriorityIcon(priority)} alt={priority} />
										<Text className='modal__select__priority-level'>
											{getPriorityDisplayName(priority)}
										</Text>
										<Text className='modal__select__priority-addition'>
											— {getPriorityDescription(priority)}
										</Text>
									</HStack>
								</MenuButton>

								<MenuList>
									<MenuItem onClick={() => setPriority('Низкий')}>
										<HStack spacing={3} width='100%'>
											<Image
												src={getPriorityIcon('Низкий')}
												boxSize='15px'
												alt='Низкий'
											/>
											<Text className='modal__select__priority-level'>
												Низкий:
											</Text>
											<Text className='modal__select__priority-addition'>
												не сильно влияет на эффективность
											</Text>
										</HStack>
									</MenuItem>

									<MenuItem onClick={() => setPriority('Средний')}>
										<HStack spacing={3} width='100%'>
											<Image
												src={getPriorityIcon('Средний')}
												boxSize='15px'
												alt='Средний'
											/>
											<Text className='modal__select__priority-level'>
												Средний:
											</Text>
											<Text className='modal__select__priority-addition'>
												влияет на эффективность, но не стопорит
											</Text>
										</HStack>
									</MenuItem>

									<MenuItem onClick={() => setPriority('Высокий')}>
										<HStack spacing={3} width='100%'>
											<Image
												src={getPriorityIcon('Высокий')}
												boxSize='15px'
												alt='Высокий'
											/>
											<Text className='modal__select__priority-level'>
												Высокий:
											</Text>
											<Text className='modal__select__priority-addition'>
												сильно влияет на эффективность
											</Text>
										</HStack>
									</MenuItem>

									<MenuItem onClick={() => setPriority('Критич.')}>
										<HStack spacing={3} width='100%'>
											<Image
												src={getPriorityIcon('Критич.')}
												boxSize='15px'
												alt='Критический'
											/>
											<Text className='modal__select__priority-level'>
												Критический:
											</Text>
											<Text className='modal__select__priority-addition'>
												останавливает все процессы
											</Text>
										</HStack>
									</MenuItem>
								</MenuList>
							</Menu>
						</FormControl>

						<FormControl>
							<FormLabel className='modal__label'>Описание проблемы</FormLabel>
							<Textarea
								className='modal__select'
								value={description}
								onChange={e => setDescription(e.target.value)}
								placeholder={
									'Кратко опишите проблему:\n\n- что случилось?\n- дата и время произошедшего?\n- сколько длится проблема?\n- насколько она влияет на вашу работу?'
								}
								rows={4}
							/>
						</FormControl>

						<FormControl>
							<FormLabel className='modal__label'>Прикрепите файл</FormLabel>
							<Input
								type='file'
								multiple
								accept='image/*'
								onChange={handleFileChange}
								ref={fileInputRef}
								display='none'
							/>
							<button
								onClick={() => fileInputRef.current?.click()}
								className='modal__select__photo'
							>
								<Text>Выберите или перетащите фото или файл</Text>
								<Image src={imageIcon} alt='Загрузить' boxSize='20px' />
							</button>

							{photoPreviews.length > 0 && (
								<Box mt={4}>
									<VStack align='stretch'>
										{photoPreviews.map((preview, index) => (
											<HStack key={index} justifyContent='space-between'>
												<Image
													src={preview}
													boxSize='50px'
													objectFit='cover'
													alt={`Preview ${index + 1}`}
												/>
												<Text>{photos[index]?.name}</Text>
												<IconButton
													aria-label='Удалить фото'
													icon={<CloseIcon />}
													size='xs'
													onClick={() => removePhoto(index)}
												/>
											</HStack>
										))}
									</VStack>
								</Box>
							)}
						</FormControl>
					</VStack>
				</ModalBody>

				<ModalFooter className='modal__footer'>
					<button
						onClick={handleSubmit}
						className='modal__footer__create-btn'
						disabled={!selectedPharmacy || !selectedCategory || !topic}
					>
						Создать заявку
					</button>
					<button onClick={onClose} className='modal__footer__cancel-btn '>
						Отмена
					</button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
