import React from 'react';
import {Outlet} from "react-router-dom";
import {JudgeDevice} from "../components/templates/JudgeDevice";
function Login() {

    const isDesktop = JudgeDevice()

    const DESKTOP_CSS = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: "url('https://img1.imgtp.com/2023/01/20/KLLvT9x1.jpeg')",
    }

    const MOBILE_CSS = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: "url('https://img1.imgtp.com/2023/01/20/fcwq9kLj.jpeg')",
    }

    return (
        <div>
            {isDesktop ?
                <div style={DESKTOP_CSS}>
                    <Outlet/>
                </div>
                :
                <div style={MOBILE_CSS}>
                    <Outlet/>
                </div>
            }
        </div>
    );
}

export default Login;
