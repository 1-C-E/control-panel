import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navigation.scss'

import arrowIcon from '/src/shared/assets/icons/arrow.svg'
import exitIcon from '/src/shared/assets/icons/exit.svg'
import menuIcon from '/src/shared/assets/icons/menu.svg'
import profileImage from '/src/shared/assets/images/profile.svg'

const Navigation = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const closeMenu = () => {
		setIsMenuOpen(false)
	}

	return (
		<nav className='navigation container-1840'>
			{/* Бургер меню для мобильной версии */}
			{!isMenuOpen && (
				<button
					className='navigation__burger'
					onClick={toggleMenu}
					aria-label='Открыть меню'
				>
					<img src={menuIcon} alt='Меню' />
				</button>
			)}

			{/* Затемнение фона при открытом меню */}
			{isMenuOpen && (
				<div className='navigation__overlay' onClick={closeMenu} />
			)}

			{/* Основное меню */}
			<ul
				className={`navigation__menu ${isMenuOpen ? 'navigation__menu--open' : ''}`}
			>
				{/* Предполагаю что должен быть логотип */}
				<li>
					<Link to='/' onClick={closeMenu}>
						<div className='navigation__menu__logo'></div>
					</Link>
				</li>

				<li>
					<NavLink
						to='/requests'
						onClick={closeMenu}
						className={({ isActive }) => (isActive ? 'active-link' : '')}
					>
						Заявки
					</NavLink>
				</li>

				<li>
					<NavLink
						to='/reports'
						onClick={closeMenu}
						className={({ isActive }) => (isActive ? 'active-link' : '')}
					>
						Отчеты
					</NavLink>
				</li>

				<li>
					<span>Справочники</span>
					<img src={arrowIcon} alt='Раскрыть раздел' />
				</li>
			</ul>

			{/* Профиль */}
			<div className='navigation__profile'>
				<Link to='/profile' className='navigation__profile-link'>
					<img src={profileImage} alt='Аватар пользователя' />
					<span>2</span>
				</Link>

				<button>
					<img src={exitIcon} alt='' />
					<span>Выйти</span>
				</button>
			</div>
		</nav>
	)
}

export default Navigation
