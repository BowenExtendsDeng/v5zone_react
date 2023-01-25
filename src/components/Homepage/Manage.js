import React, {useState} from 'react';
import {JudgeDevice} from "../templates/JudgeDevice";
import {
    Box,
    Button, Divider,
    FormControl, Grid, IconButton, InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import {useNavigate} from "react-router-dom";
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import Paper from "@mui/material/Paper";

function Admission(){
    const isDesktop = JudgeDevice();

    const [renderRows, setRenderRows] = useState([]);
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
                    管理经费审批
                </Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">申请项</TableCell>
                                <TableCell align="center">申请人</TableCell>
                                <TableCell align="center">申请类型</TableCell>
                                <TableCell align="center">申请金额</TableCell>
                                <TableCell align="center">操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                renderRows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row" align="center">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">{row.session}</TableCell>
                                        <TableCell align="center">{row.college}</TableCell>
                                        <TableCell align="center">{row.techTeam}</TableCell>
                                        <TableCell align="center">{row.home}</TableCell>
                                        <TableCell align="center">{row.telephone}</TableCell>
                                        <TableCell align="center">{row.email}</TableCell>
                                        <TableCell align="center">
                                            <Button>
                                                通过
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

function POI(){
    return(
            <Stack>
                <Typography
                    sx={{
                        margin: 3,
                        fontFamily: "黑体",
                        fontWeight: "bold",
                        fontSize: 20,
                    }}
                >
                    注意！队员隐私不得随意发给任何人！仅限比赛报名使用
                </Typography>
                <Button
                    size="large"
                    sx={{
                        margin:2,
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                    variant="outlined"
                    onClick={() => {
                        alert('bye')
                    }}>
                    导出队员信息excel
                </Button>
                <Typography
                    sx={{
                        margin: 3,
                        fontFamily: "黑体",
                        fontWeight: "bold",
                        fontSize: 20,
                    }}
                >
                    V5账单流水
                </Typography>
                <Button
                    size="large"
                    sx={{
                        margin:2,
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                    variant="outlined"
                    onClick={() => {
                        alert('bye')
                    }}>
                    导出V5账单
                </Button>
            </Stack>
    )
}

function Article(){
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
                    管理公告栏
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
                    管理公告栏
                </Button>
            </Box>
        </Box>
    )
}

function Manage() {
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
                        <Admission/>
                    </Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={6} align={"center"}>
                        <Article/>
                    </Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={6} align={"center"}>
                        <POI/>
                    </Grid>
                    <Grid xs={3}></Grid>
                </Grid>
                :
                <Stack align={"center"}>
                    <Divider/>
                    <Admission/>
                    <Divider/>
                    <Article/>
                    <Divider/>
                    <POI/>
                    <Divider/>
                </Stack>
            }
        </Box>
    );
}

export default Manage;
