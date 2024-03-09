import { logOut } from '../../utilities/users-service';
import Button from '@mui/material/Button'



export default function UserLogOut({ user, setUser }) {
    function handleLogOut() {
        logOut();
        setUser(null);
    }
    return <Button onClick={handleLogOut} variant="outlined">Log out</Button>          
    
}