import { Link } from 'react-router-dom'
import './Navigation.scss'

import arrowIcon from '/src/shared/assets/icons/arrow.svg'
import exitIcon from '/src/shared/assets/icons/exit.svg'
import profileImage from '/src/shared/assets/images/profile.svg'

const Navigation = () => {
	return (
		<nav className='navigation container-1840'>
			<ul className='navigation__menu'>
				{/* Предполагаю, что должен быть логотип */}
				<li>
					<Link to='/' className='navigation__menu__logo'></Link>
				</li>

				<li>
					<Link to='/requests'>Заявки</Link>
				</li>

				<li>
					<Link to='/reports'>Отчеты</Link>
				</li>

				<li>
					<span>Справочники</span>
					<img src={arrowIcon} alt='Раскрыть раздел' />
				</li>
			</ul>

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
