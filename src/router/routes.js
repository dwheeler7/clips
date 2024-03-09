import Login from '../pages/Login/Login'
import NewClip from '../pages/NewClip/NewClip'
import NewOrder from '../pages/NewOrder/NewOrder'
import OrderHistory from '../pages/OrderHistory/OrderHistory'
import Settings from '../pages/Settings/Settings'
import SignUp from '../pages/SignUp/SignUp'
import ShowClip from '../pages/ShowClip/ShowClip'
import Cart from '../pages/Cart/Cart'
import Home from '../pages/Home/Home'

const routes = {
    authRoutes : [
        {
            Component: Home,
            key: 'Home',
            path: '/'            
        },
        {
            Component: NewClip,
            key: 'NewClip',
            path: '/clippings/add'            
        },
        {
            Component: NewOrder,
            key: 'NewOrder',
            path: '/orders/new'            
        },
        {
            Component: OrderHistory,
            key: 'OrderHistory',
            path: '/orders'            
        },
        {
            Component: Settings,
            key: 'Settings',
            path: '/settings'            
        },
        {
            Component: ShowClip,
            key: 'ShowClip',
            path: '/clipping/:id'            
        },
        {
            Component: Cart,
            key: 'Cart',
            path: '/cart'            
        }
    ],
    unauthRoutes : [
        {
            Component: Login,
            key: 'Login',
            path: '/login'            
        },
        {
            Component: SignUp,
            key: 'SignUp',
            path: '/sign-up'            
        }
    ]
}

export default routes