import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import routes from './routes'
import { useState, useEffect } from 'react'
// import styles from './AppRouter.module.scss';
import { getUser } from '../utilities/users-service'
import { getClippings } from '../utilities/clippings-service'
import Footer from '../components/Footer/Footer'
import Nav from '../components/Nav/Nav'

const AppRouter = () => {
    const [user, setUser] = useState(() => getUser())
    const [clippings, setClippings] = useState([])
    const [cart, setCart] = useState([])
    return (
        <>
            <Router>
                <Nav />
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
                <Footer cart={cart} />
            </Router>
        </>
    )
}

export default AppRouter