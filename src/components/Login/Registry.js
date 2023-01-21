import React from 'react';
import {useNavigate} from "react-router-dom";
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import colleges from "../templates/colleges";

function Registry() {
    const navigate = useNavigate()
    const college = colleges;
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordAgain = () => setShowPasswordAgain((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseDownPasswordAgain = (event) => {
        event.preventDefault();
    };

    return (
        <Box
            sx={{
                width: 1160,
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
                        V5 Zone 注册
                    </Typography>
                </Box>
                <Box>
                    <TextField
                        required
                        id="outlined-required"
                        label="姓名"
                        sx={{
                            margin: 3,
                            height: 30
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="录取验证码"
                        sx={{
                            margin: 3,
                            height: 30
                        }}
                    />
                    <FormControl
                        required={true}
                        sx={{
                            margin: 3,
                            height: 30,
                        }}
                        variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">设置密码</InputLabel>
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
                            label="设置密码"
                        />
                    </FormControl>
                    <FormControl
                        required={true}
                        sx={{
                            margin: 3,
                            height: 30
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
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <TextField
                        required
                        id="outlined-required"
                        label="电话"
                        sx={{
                            margin: 3,
                            height: 30
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="邮箱"
                        sx={{
                            margin: 3,
                            height: 30
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="QQ"
                        sx={{
                            margin: 3,
                            height: 30
                        }}
                    />
                    <TextField
                        id="outlined-required"
                        label="身份证号（用于报名比赛）"
                        sx={{
                            margin: 3,
                            height: 30
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        defaultValue="计算机学院"
                        sx={{
                            marginTop: 3,
                            width: 220,
                            marginLeft: 3,
                        }}
                    >
                        {college.map((option) => (
                            <MenuItem
                                key={option.value}
                                value={option.value}
                                sx = {{
                                    overflow: true,
                                }}
                            >
                                {option.label}

                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        required
                        id="outlined-required"
                        label="专业（没有填DL）"
                        sx={{
                            margin: 3,
                            height: 30,
                            marginLeft: 6.5,
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="籍贯"
                        sx={{
                            margin: 3,
                            height: 30
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="常住地"
                        sx={{
                            margin: 3,
                            height: 30
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <TextField
                        required
                        id="outlined-required"
                        label="届次"
                        sx={{
                            margin: 3,
                            height: 30
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="学号"
                        sx={{
                            margin: 3,
                            height: 30
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="生源高中"
                        sx={{
                            margin: 3,
                            height: 30
                        }}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="饮食习惯"
                        sx={{
                            margin: 3,
                            height: 30
                        }}
                    />
                </Box>

                <Box sx={{textAlign: "center"}}>
                    <Button
                        sx={{
                            margin: 3,
                            textAlign: "center",
                        }}
                        variant="contained"
                    > 确认
                    </Button>

                    <Button
                        sx={{
                            margin: 3,
                            textAlign: "center",
                        }}
                        variant="outlined"
                        onClick={() => {
                            navigate("../auth");
                        }}
                    >返回
                    </Button>
                </Box>
            </Stack>
        </Box>
    );

}

export default Registry;
