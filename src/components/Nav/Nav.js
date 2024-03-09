import styles from './Nav.module.scss'
import { Link } from 'react-router-dom'
import NavItem from '../NavItem/NavItem'

export default function Nav({user}) {
    return (
      <div className={styles.nav}>
        <NavItem>
          <Link to='/'>Home</Link>
          <Link to='/cart'>Cart</Link>
          <Link to='/clippings/add'>Post clipping</Link>
        </NavItem>
        <NavItem>
          <Link to='/login'>Login</Link>
          <Link to='/sign-up'>Signup</Link>
        </NavItem>        
      </div>
    )
  }