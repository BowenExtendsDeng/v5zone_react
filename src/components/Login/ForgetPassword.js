import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {post} from "../../request";

function CountDown(props) {
    const { mss } = props;

    const [time, setTime] = useState(mss);

    useEffect(() => {
        const tick = setInterval(() => {
            setTime(time - 1);
        }, 1000);

        console.log("tick", tick);

        return () => clearInterval(tick);
    });

    return (
        <Typography sx={{
            fontSize:14,
        }}>{time.toString().padStart(2, "0")}</Typography>
    );
}
function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = useState(false);
    const [sendButtonState, setSendButtonState] = useState(false);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    const onClickSend = () => {
        localStorage.setItem("v5_token", "undefined")
        post("/auth/send_code", {
            id: email,
            message: "重置密码",
        }).then((res=>{
            if(res.status === 200){
                alert("发送成功，请注意查收");
            }
        })).catch(()=>{
            alert("发送失败，请注意学号的有效性以及当前网络状态");
        })
        setSendButtonState(true);
        setTimeout(function(){
            setSendButtonState(false);
        },30 * 1000)

    };

    const navigate = useNavigate();
    const handleClickShowPassword = () =>
        setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPasswordAgain = () =>
        setShowPasswordAgain((show) => !show);

    const handleMouseDownPasswordAgain = (event) => {
        event.preventDefault();
    };

    const onClickYes =()=>{
        localStorage.setItem("v5_token", "undefined")
        post("/auth/external_reset_password", {
            id: email,
            password: password,
            code: code,
        }).then((res=>{
            if(res.status === 200){
                alert("修改成功");
                navigate('../auth');
            }
        })).catch(()=>{
            alert("修改失败，请检查网络状态或者验证码是否正确");
        })
    }

    return (
        <Box
            sx={{
                width: 480,
                height: 500,
                backgroundColor: '#b7bcc3',
                opacity: 0.90,
                borderRadius: 5,
            }}
        >
            <Stack>
                <Box sx={{
                    marginRight: 2
                }}>
                    <Typography
                        sx={{
                            margin: 3,
                            textAlign: "center",
                            fontFamily: "黑体",
                            fontWeight: "bold",
                            fontSize: 24,
                        }}
                    >
                        <img src={require("../../assets/v5logo.png")}
                             style={{
                                 width: 70,
                                 height: 30,
                                 marginRight: 10,
                             }}
                             alt={'v5logo'}>
                        </img>
                        Zone 重置密码
                    </Typography>
                </Box>

                    <TextField
                        required
                        id="outlined-required"
                        label="你的学号"
                        sx={{
                            margin: 3,
                            height: 30,
                        }}
                        value={email}
                        onChange={(event)=>{
                            setEmail(event.target.value)
                        }}
                    />
                <Box>
                    <TextField
                        required
                        id="outlined-required"
                        label="邮箱验证码"
                        sx={{
                            margin: 3,
                            height: 30,
                            width: 150
                        }}
                        value={code}
                        onChange={(event)=>{
                            setCode(event.target.value)
                        }}
                    />
                    {sendButtonState ?
                        <Button
                            sx={{
                                margin: 3,
                                marginTop: 4
                            }}
                            disabled="true"
                            variant="contained"
                            onClick={onClickSend}
                        ><CountDown mss={30}/>s后再试</Button>
                        :
                        <Button
                            sx={{
                                margin: 3,
                                marginTop: 4,
                            }}
                            variant="contained"
                            onClick={onClickSend}
                        >发送验证码</Button>
                    }
                </Box>
                <FormControl
                    required={true}
                    value={password}
                    onChange={(event)=>{
                        setPassword(event.target.value)
                    }}
                    sx={{
                        margin: 3,
                        height: 30,
                    }}
                    variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">新密码</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >{showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="新密码"
                    />
                </FormControl>
                <FormControl
                    required={true}
                    value={passwordAgain}
                    onChange={(event)=>{
                        setPasswordAgain(event.target.value)
                    }}
                    sx={{
                        margin: 3,
                        height: 30,
                    }}
                    variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">再次输入密码</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPasswordAgain ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPasswordAgain}
                                    onMouseDown={handleMouseDownPasswordAgain}
                                    edge="end"
                                >{showPasswordAgain ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="再次输入密码"
                    />
                </FormControl>
                <Box sx={{textAlign: "center"}}>
                    <Button
                        sx={{
                            margin: 3,
                            textAlign: "center",
                        }}
                        variant="contained"
                        onClick={onClickYes}
                    >确认</Button>
                    <Button
                        sx={{
                            margin: 3,
                            textAlign: "center",
                        }}
                        variant="outlined"
                        onClick={()=>{
                            navigate('../auth')
                        }}
                    >返回
                    </Button>
                </Box>
            </Stack>
        </Box>
    );

}

export default LoginForm;
