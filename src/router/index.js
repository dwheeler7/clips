import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import routes from './routes'
import { useState, useEffect } from 'react'
// import styles from './AppRouter.module.scss';
import { getUser } from '../utilities/users-service'
import { getClippings } from '../utilities/clippings-service'
import Home from '../pages/Home/Home'
import Footer from '../components/Footer/Footer'

const AppRouter = () => {
    const [user, setUser] = useState(getUser())
    const [clippings, setClippings] = useState([]); // Ensure this is an array
    const [cart, setCart] = useState(null)

    useEffect(() => {        
        const fetchClippings = async () => {
            const clippings = await getClippings()
            setClippings(clippings)
        };        
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
                <Footer />       
            </Router>
        </main>
        
    );
};

export default AppRouter;