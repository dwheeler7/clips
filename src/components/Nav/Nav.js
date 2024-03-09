import styles from './Nav.module.scss'
import { Link } from 'react-router-dom'
import NavItem from '../NavItem/NavItem'
import Button from '@mui/material/Button'
import UserLogOut from '../UserLogOut/UserLogOut'

export default function Nav({user, setUser}) {    
    return (
      <div className={styles.nav}>
        <NavItem>
          <Link to='/'><img src="/img/logo_new.svg" className={styles.nav__logo} /></Link>                    
        </NavItem>
        <NavItem>
          {user ? <><UserLogOut user={user} setUser={setUser} />
          <Button component={Link} to="/clippings/add" variant="contained">Post clippings</Button></> :  <><Button component={Link} to="/login" variant="outlined">Login</Button>
          <Button component={Link} to="/sign-up" variant="contained">Sign up</Button></> }
          
          
        </NavItem>        
      </div>
    )
  }