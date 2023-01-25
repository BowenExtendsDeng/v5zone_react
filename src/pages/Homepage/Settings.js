import React from 'react';
import {JudgeDevice} from "../../components/templates/JudgeDevice";
import {
    Box,
    Button, Divider,
    FormControl, Grid, IconButton, InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import {useNavigate} from "react-router-dom";
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';

function Retire(){
    return(
        <Box>
            <Box>
                <Typography
                    sx={{
                        margin: 3,
                        fontFamily: "黑体",
                        fontWeight: "bold",
                        fontSize: 20,
                    }}
                >
                    从 V5 退役
                </Typography>
                <Button
                    sx={{
                        margin:2,
                        textAlign: "center",
                        backgroundColor:"#e88b8b"
                    }}
                    variant="contained"
                    onClick={() => {
                        alert('bye')
                    }}>
                    退役<AccessibleForwardIcon/>
                </Button>
            </Box>
        </Box>
    )
}

function SetProfile(){
    return(
        <Box>
            <Box>
                <Typography
                    sx={{
                        margin: 3,
                        fontFamily: "黑体",
                        fontWeight: "bold",
                        fontSize: 20,
                    }}
                >
                    查看个人资料
                </Typography>
                <Button
                    sx={{
                        margin:2,
                        textAlign: "center",
                    }}
                    variant="contained"
                    onClick={() => {
                        alert('bye')
                    }}>
                    查看个人资料
                </Button>
            </Box>
        </Box>
    )
}
function ResetPassword(){
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPasswordAgain = () => setShowPasswordAgain((show) => !show);

    const handleMouseDownPasswordAgain = (event) => {
        event.preventDefault();
    };

    const onClickYes =()=>{

    }
    return (
        <Stack sx={{width: 360}}>
            <Typography
                sx={{
                    margin: 3,
                    fontFamily: "黑体",
                    fontWeight: "bold",
                    fontSize: 20,
                }}
            >Zone 重置密码
            </Typography>
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
            <Button
                sx={{
                    margin: 3,
                    textAlign: "center",
                }}
                variant="contained"
                onClick={onClickYes}
            >确认重置</Button>
        </Stack>
    )
}

function Logout(){
    const navigate = useNavigate()
    return(
        <Box>
            <Typography
                sx={{
                    margin: 3,
                    fontFamily: "黑体",
                    fontWeight: "bold",
                    fontSize: 20,
                }}
            >
                退出登录
            </Typography>
            <Button
                sx={{
                    margin:2,
                    textAlign: "center",
                    backgroundColor:"#e88b8b"
                }}
                variant="contained"
                onClick={() => {
                navigate('/login/auth');
            }}>
                退出登录<LogoutIcon/>
            </Button>
        </Box>
    )
}

function Settings() {
    const isDesktop = JudgeDevice()

    return (
        <Box>
            {isDesktop ? <div/> :
                <Typography
                    align="center"
                    sx={{
                        fontFamily: "黑体",
                        fontSize: 20,
                        fontWeight: "bold",
                        height: 32,
                        marginTop: 2
                    }}
                >Zone 设置</Typography>
            }
            {isDesktop ?
                <Grid container spacing={2} align={"center"}>
                    <Grid xs={3}></Grid>
                    <Grid xs={6} align={"center"}>
                        <ResetPassword/>
                    </Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={6} align={"center"}>
                        <SetProfile/>
                    </Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={6} align={"center"}>
                        <Retire/>
                    </Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={6} align={"center"}>
                        <Logout/>
                    </Grid>
                    <Grid xs={3}></Grid>
                </Grid>
                :
                <Stack align={"center"}>
                    <Divider/>
                    <ResetPassword/>
                    <Divider/>
                    <SetProfile/>
                    <Divider/>
                    <Retire/>
                    <Divider/>
                    <Logout/>
                </Stack>
            }
        </Box>
    );
}

export default Settings;
