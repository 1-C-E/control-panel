import HomePage from '@pages/home/HomePage'
import ProfilePage from '@pages/profile/ProfilePage'
import ReportsPage from '@pages/reports/ReportsPage'
import RequestsPage from '@pages/requests/RequestsPage'

import '@app/ui/styles/App.scss'
import { ChakraProvider } from '@chakra-ui/react'
import Navigation from '@widgets/navigation/Navigation'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function App() {
	return (
		<Router>
			<ChakraProvider>
				<header className=''>
					<Navigation />
				</header>

				<main>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/requests' element={<RequestsPage />} />
						<Route path='/reports' element={<ReportsPage />} />
						<Route path='/profile' element={<ProfilePage />} />
					</Routes>
				</main>
			</ChakraProvider>
		</Router>
	)
}

export default App
