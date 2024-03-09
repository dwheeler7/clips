import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import routes from './routes'
import { useState, useEffect } from 'react'
import styles from './AppRouter.module.scss';
import { getUser } from '../utilities/users-service'
import { getClippings } from '../utilities/clippings-api';
import Footer from '../components/Footer/Footer'
import Nav from '../components/Nav/Nav'
import Container from '../components/Container/Container'

const AppRouter = () => {
    const [user, setUser] = useState(() => getUser())
    const [clippings, setClippings] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {
        if (user) {
            const fetchClippings = async () => {
                try {
                    const clippings = await getClippings()
                    setClippings(clippings)
                } catch (error) {
                    console.error("Failed to fetch clippings:", error)
                }
            }
            fetchClippings()
        }
    }, [user]) // Depend on `user` to re-run the effect when it changes

    return (
        <>
            <Router>
                <Nav user={user} setUser={setUser}/>
                <Container>
                    <Routes>
                        {user ? (
                            routes.authRoutes.map(({ Component, key, path }) => (
                                <Route key={key} path={path} element={
                                    <Component 
                                        user={user} 
                                        setUser={setUser} 
                                        clippings={clippings} 
                                        setClippings={setClippings} 
                                        cart={cart} 
                                        setCart={setCart} 
                                    />} 
                                />
                            ))
                        ) : (
                            routes.unauthRoutes.map(({ Component, key, path }) => (
                                <Route key={key} path={path} element={<Component user={user} setUser={setUser} />} />
                            ))
                        )}
                        <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
                    </Routes>
                </Container>
                <Footer user={user} />
            </Router>
        </>
    )
}

export default AppRouter
