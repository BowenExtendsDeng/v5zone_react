import React, {useEffect} from 'react';
import {
    Box,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import Paper from '@mui/material/Paper';
import {JudgeDevice} from "../templates/JudgeDevice";
import axios from "axios";
import {post} from "../../request";

function Contact() {
    const isDesktop = JudgeDevice();

    const method = [
        {
            value: '全部',
            label: '全部',
        },
        {
            value: '现役',
            label: '现役',
        },
        {
            value: '同届次',
            label: '同届次',
        },
    ];

    const school = [
        {
            value: '全部',
            label: '全部',
        },
        {
            value: '同学院',
            label: '同学院',
        },
    ];

    const techGroup = [
        {
            value: '全部',
            label: '全部',
        },
        {
            value: '软件组',
            label: '软件组',
        },
        {
            value: '硬件组',
            label: '硬件组',
        },
        {
            value: '机械组',
            label: '机械组',
        },
    ];


    const rows = post("/member/contact",
        localStorage.getItem("v5_id")).then(res => {
            console.log(res);
            if (res.status === 200){
                return res.data.contactInfo;
            }
    });



    return (
        <Box>
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
                    >组员联系方式</Typography>
                }
                <TextField
                    id="届次筛选"
                    select
                    label="届次筛选"
                    defaultValue="全部"
                    size="small"
                    sx={{
                        margin: 2,
                        width: 100,
                    }}
                >
                    {method.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="学院筛选"
                    select
                    label="学院筛选"
                    defaultValue="全部"
                    size="small"
                    sx={{
                        margin: 2,
                        width: 100,
                    }}
                >
                    {school.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="技术组别"
                    select
                    label="技术组别"
                    defaultValue="全部"
                    size="small"
                    sx={{
                        margin: 2,
                        width: 100
                    }}
                >
                    {techGroup.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">姓名</TableCell>
                            <TableCell align="center">届次</TableCell>
                            {isDesktop ? <TableCell align="center">学院</TableCell> : <div/>}
                            {isDesktop ? <TableCell align="center">技术组别</TableCell> : <div/>}
                            {isDesktop ? <TableCell align="center">常住地</TableCell> : <div/>}
                            <TableCell align="center">电话</TableCell>
                            {isDesktop ?
                                <TableCell align="center">邮箱</TableCell>
                                : <div/>}
                            <TableCell align="center">QQ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.session}</TableCell>
                                {isDesktop ? <TableCell align="center">{row.college}</TableCell> : <div/>}
                                {isDesktop ? <TableCell align="center">{row.techTeam}</TableCell> : <div/>}
                                {isDesktop ? <TableCell align="center">{row.home}</TableCell> : <div/>}
                                <TableCell align="center">{row.telephone}</TableCell>
                                {isDesktop ? <TableCell align="center">{row.email}</TableCell> : <div/>}
                                <TableCell align="center">{row.qq}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );

}

export default Contact;
