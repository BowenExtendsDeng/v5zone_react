import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import {Navigate} from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";
import ForgetPassword from "../components/Login/ForgetPassword";
import Registry from "../components/Login/Registry";
import CheckBoard from "../components/Homepage/CheckBoard"
import Contact from "../components/Homepage/Contact"
import MessageBoard from "../components/Homepage/MessageBoard"
import Prize from "../components/Homepage/Prize"
import Settings from "../components/Homepage/Settings"
import Album from "../components/Homepage/Album"
import MyAlbum from "../components/Homepage/MyAlbum"
import Budget from "../components/Homepage/Budget"
import Manage from "../components/Homepage/Manage"
// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        path:'/homepage',
        element:<Homepage/>,
        children: [
            {
                path: 'manage',
                element: <Manage/>
            },
            {
                path: '',
                element: <CheckBoard/>
            },
            {
                path: 'album',
                element: <Album/>,
            },
            {
                path: 'my_album',
                element: <MyAlbum/>,
            },
            {
                path: 'contact',
                element: <Contact/>
            },
            {
                path: 'message_board',
                element: <MessageBoard/>
            },
            {
                path: 'prize',
                element: <Prize/>
            },
            {
                path: 'settings',
                element: <Settings/>
            },
            {
                path: 'budget',
                element: <Budget/>
            },
        ]

    },
    {
        path:'/login',
        element: <Login/>,
        children:[
            {
                path:'auth',
                element:<LoginForm/>
            },
            {
                path: 'reset_password',
                element: <ForgetPassword/>
            },
            {
                path: 'registry',
                element: <Registry/>
            }
        ]
    },
    {
        path:"/",
        element: <Navigate to="/homepage"/>
    }
]
