import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, Snackbar,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

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
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [sendState, setSendState] = React.useState(false);
    const [sendButtonState, setSendButtonState] = React.useState(false);

    const onClickSend = () => {
        setSendState(() => true);
        setOpen(true);
        setSendButtonState(() => true);
        setTimeout(function(){
            setSendButtonState(() => false);
        },30 * 1000)

    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPasswordAgain = () => setShowPasswordAgain((show) => !show);

    const handleMouseDownPasswordAgain = (event) => {
        event.preventDefault();
    };

    const onClickYes =()=>{
        navigate('../auth');
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
                        label="你的邮箱"
                        sx={{
                            margin: 3,
                            height: 30,
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
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        <Alert severity={sendState ? "success" : "error"} sx={{ width: '100%' }}>
                            {sendState ? "邮件已发送到你的邮箱" : "邮件发送失败"}
                        </Alert>
                    </Snackbar>
                </Box>
                <FormControl
                    required={true}
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
