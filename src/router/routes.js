import Login from '../pages/Login/Login'
import NewClip from '../pages/NewClip/NewClip'
import NewOrder from '../pages/NewOrder/NewOrder'
import OrderHistory from '../pages/OrderHistory/OrderHistory'
import Settings from '../pages/Settings/Settings'
import SignUp from '../pages/SignUp/SignUp'


const routes = [
        {
            Component: NewClip,
            key: 'NewClip',
            path: '/clippings/add',
            gated: true
        },
        {
            Component: NewOrder,
            key: 'NewOrder',
            path: '/orders/new',
            gated: true
        },
        {
            Component: OrderHistory,
            key: 'OrderHistory',
            path: '/orders',
            gated: true
        },
        {
            Component: Settings,
            key: 'Settings',
            path: '/settings',
            gated: true
        },
        {
            Component: Login,
            key: 'Login',
            path: '/login',
            gated: false
        },
        {
            Component: SignUp,
            key: 'SignUp',
            path: '/sign-up',
            gated: false
        }

    ]


export default routes