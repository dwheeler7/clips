import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import routes from './routes'
import { useState, useEffect } from 'react'
// import styles from './AppRouter.module.scss';
import { getUser } from '../utilities/users-service'
import { getClippings } from '../utilities/clippings-service'
import Home from '../pages/Home/Home'

const AppRouter = () => {
    const [user, setUser] = useState(getUser())
    const [clippings, setClippings] = useState([]); // Ensure this is an array

    useEffect(() => {        
        const fetchClippings = async () => {
            const clippings = await getClippings()
            setClippings(clippings)
        };        
        fetchClippings()
    }, [])

    return (
        <Router>
            <main>
                <Routes>
                    <Route path="/" key='Home' element={<Home page='Home' user={user} setUser={setUser} clippings={clippings} setClippings={setClippings} />} />
                    {routes.map(({ Component, key, path, gated }) => {
                        if (gated === !!user) {
                            return <Route key={key} path={path} element={<Component page={key} user={user} setUser={setUser} />} />
                        } else {
                            return <Route key={key} path={path} element={<Navigate replace to="/" />} />
                        }
                    })}
                </Routes>
            </main>
        </Router>
    );
};

export default AppRouter;