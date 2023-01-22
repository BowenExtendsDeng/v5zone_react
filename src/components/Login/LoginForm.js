import React from 'react';
import {
    Box,
    Button, Checkbox,
    FormControl, FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {post} from "../../request";

function LoginForm() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigate = useNavigate()

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onClickYes = () =>{
        let data = new FormData();
        data.append("id" , username);
        data.append("password", password);
        post("/auth/authenticate", data).then(res=>{
            console.log(res)
        })
        //navigate('/homepage')
    }

    return (
        <Box
            sx={{
                width: 480,
                height: 400,
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
                        V5 Zone 登录
                    </Typography>
                </Box>
                <TextField
                    required
                    id="outlined-required"
                    label="学号"
                    sx={{
                        margin: 3,
                        height: 40
                    }}
                    value={username}
                    onChange={handleUsernameChange}
                />
                <FormControl
                    required={true}
                    sx={{
                        margin: 3,
                    }}
                    variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">密码</InputLabel>
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
                        label="密码"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </FormControl>
                <Box
                    sx={{
                        marginLeft: 4,
                    }}
                >
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="记住我"
                        sx={{
                            height: 30,
                            marginX: 5,
                        }}
                    />
                    <Button
                        sx={{
                            justifyContent: "left",
                            fontWeight: "bold",
                        }}
                        variant="text"
                        onClick={() => {
                            navigate('../registry')
                        }}
                    >是新队员？</Button>
                    <Button
                        sx={{
                            justifyContent: "right",
                            fontWeight: "bold",
                        }}
                        variant="text"
                        onClick={() => {
                            navigate('../reset_password')
                        }}
                    >
                        忘记密码？
                    </Button>
                </Box>
                <Box sx={{textAlign: "center"}}>
                    <Button
                        sx={{
                            margin: 3,
                            textAlign: "center",
                            width: 120
                        }}
                        variant="contained"
                        onClick={onClickYes}
                    >登录</Button>
                    <Button
                        sx={{
                            margin: 3,
                            textAlign: "center",
                            width: 120
                        }}
                        disabled={true}
                        variant="outlined"
                        onClick={onClickYes}
                    >Gitlab登录</Button>
                </Box>
            </Stack>
        </Box>
    );

}

export default LoginForm;
