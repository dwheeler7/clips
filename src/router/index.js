import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import routes from './routes'
import { useState, useEffect } from 'react'
// import styles from './AppRouter.module.scss';
import { getUser } from '../utilities/users-service'
import { getClippings } from '../utilities/clippings-service'
import Home from '../pages/Home/Home'
import Footer from '../components/Footer/Footer'

const AppRouter = () => {
    const [user, setUser] = useState(() => getUser())
    const [clippings, setClippings] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {        
        const fetchClippings = async () => {
            try {
                const clippings = await getClippings()
                setClippings(clippings)
            } catch (error) {
                console.error("Failed to fetch clippings:", error)
            }
        }
        fetchClippings()
    }, [])    

    return (
        <main>
            <Router>            
                <Routes>
                    <Route path="/" key='Home' element={<Home page='Home' user={user} setUser={setUser} clippings={clippings} setClippings={setClippings} cart={cart} setCart={setCart}/>} />
                    {routes.map(({ Component, key, path, gated }) => {
                        if (gated === !!user) {
                            return <Route key={key} path={path} element={<Component page={key} user={user} setUser={setUser} clippings={clippings} setClippings={setClippings} cart={cart} setCart={setCart} />} />
                        } else {
                            return <Route key={key} path={path} element={<Navigate replace to="/" />} />
                        }
                    })}
                </Routes> 
                <Footer cart={cart} />       
            </Router>
        </main>
        
    );
};

export default AppRouter;