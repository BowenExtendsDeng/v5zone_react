import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import {Navigate} from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";
import ForgetPassword from "../components/Login/ForgetPassword";
import Registry from "../components/Login/Registry";
import CheckBoard from "../pages/Homepage/CheckBoard"
import Contact from "../pages/Homepage/Contact"
import MessageBoard from "../pages/Homepage/MessageBoard"
import Prize from "../pages/Homepage/Prize"
import Settings from "../pages/Homepage/Settings"
import Album from "../pages/Homepage/Album"
import MyAlbum from "../pages/Homepage/MyAlbum"
import Budget from "../pages/Homepage/Budget"
import Manage from "../pages/Homepage/Manage"
import MdReader from "../pages/Homepage/MdReader"
// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        path: '/homepage',
        element: <Homepage/>,
        children: [
            {
                path: 'manage',
                element: <Manage/>
            },
            {
                path: 'md',
                element: <MdReader/>
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
                element: <Contact/>,
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
        path: '/login',
        element: <Login/>,
        children: [
            {
                path: 'auth',
                element: <LoginForm/>
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
        path: "/",
        element: <Navigate to="/homepage"/>
    }
]
