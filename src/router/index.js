import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes'
import { useState, useEffect } from 'react';
// import styles from './AppRouter.module.scss';
import { getUser } from '../utilities/users-service';
import Home from '../pages/Home/Home'

const AppRouter = () => {
    const [user, setUser] = useState(getUser())
    return (
        <Router>
            <main>
                <Routes>
                    <Route path="/" key='Home' element={<Home page='Home' user={user} setUser={setUser} />} />                    
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