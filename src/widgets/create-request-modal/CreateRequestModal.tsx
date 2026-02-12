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

import { useRequestsStore } from '@entities/request'
import highPriorityIcon from '@shared/assets/icons/high-priority.svg'
import lowPriorityIcon from '@shared/assets/icons/low-priority.svg'

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

	const getPriorityIcon = (priorityValue: Priority) => {
		return priorityValue === 'Высокий' ? highPriorityIcon : lowPriorityIcon
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} size='xl'>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Создание заявки</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack spacing={4} align='stretch'>
						<FormControl isRequired>
							<FormLabel>Адрес аптеки</FormLabel>
							<Select
								placeholder='Выберите аптеку'
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

						<FormControl isRequired>
							<FormLabel>Категория заявки</FormLabel>
							<Select
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
								isChecked={isWarranty}
								onChange={e => setIsWarranty(e.target.checked)}
							>
								Гарантийный случай?
							</Checkbox>
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Тема заявки</FormLabel>
							<Input
								value={topic}
								onChange={e => setTopic(e.target.value)}
								placeholder='Введите тему'
							/>
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Приоритет</FormLabel>
							<Select
								value={priority}
								onChange={e => setPriority(e.target.value as Priority)}
							>
								<option value='Низкий'>Низкий</option>
								<option value='Высокий'>Высокий</option>
							</Select>
							<HStack mt={2}>
								<Image src={getPriorityIcon(priority)} boxSize='20px' />
								<Text>{priority}</Text>
							</HStack>
						</FormControl>

						<FormControl>
							<FormLabel>Описание проблемы</FormLabel>
							<Textarea
								value={description}
								onChange={e => setDescription(e.target.value)}
								placeholder='Опишите проблему'
								rows={4}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Прикрепите фото</FormLabel>
							<Input
								type='file'
								multiple
								accept='image/*'
								onChange={handleFileChange}
								ref={fileInputRef}
								display='none'
							/>
							<Button onClick={() => fileInputRef.current?.click()}>
								Выбрать файлы
							</Button>

							{photoPreviews.length > 0 && (
								<Box mt={4}>
									<VStack align='stretch'>
										{photoPreviews.map((preview, index) => (
											<HStack key={index} justifyContent='space-between'>
												<Image src={preview} boxSize='50px' objectFit='cover' />
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

				<ModalFooter>
					<Button
						colorScheme='blue'
						mr={3}
						onClick={handleSubmit}
						isDisabled={!selectedPharmacy || !selectedCategory || !topic}
					>
						Создать заявку
					</Button>
					<Button onClick={onClose}>Отмена</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
