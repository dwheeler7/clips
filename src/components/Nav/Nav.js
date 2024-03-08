import { Link } from 'react-router-dom'

export default function Nav() {
    return (
      <div>
        <Link to='/'>Home</Link>
        <Link to='/cart'>Cart</Link>
        <Link to='/clippings/add'>Post clipping</Link>
        <Link to='/login'>Login</Link>
        <Link to='/sign-up'>Signup</Link>
      </div>
    )
  }