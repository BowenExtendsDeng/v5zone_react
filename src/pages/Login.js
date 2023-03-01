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
        backgroundImage: "url('https://www.npu5v5.cn:8849/album/download/back_desktop.jpg')",
    }

    const MOBILE_CSS = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: "url('https://www.npu5v5.cn:8849/album/download/back_mobile.jpg')",
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
