import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import routes from './routes'
import { useState } from 'react'
import styles from './AppRouter.module.scss'
import { getUser } from '../utilities/users-service'

const AppRouter = () => {
    const [user, setUser] = useState(getUser())
    return (
        <Router>
            <main>
                <>
                <Routes>
                    {routes.map(({ Component, key, path }) => (
                    <Route
						key={key}
						path={path}
						element={
						<Component 
							page={key} 
							user={user}
							setUser={setUser}
						/>
						}>
                    </Route>
                ))}				
			</Routes>
                </>
            </main>
        </Router>
    )
}