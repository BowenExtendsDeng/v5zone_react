import {JudgeDevice} from "../../templates/JudgeDevice";
import React, {useEffect, useState} from "react";
import {post} from "../../../request";
import {Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Admission() {

    const navigate = useNavigate();

    const isDesktop = JudgeDevice();

    const [renderRows, setRenderRows] = useState([]);

    const [isVice, setVice] = useState(false);

    function init() {
        post("/auth/is_monitor", localStorage.getItem("v5_id"))
            .then(res => {
                setVice(res.data === "VICE_CAPTAIN");
            })
        post("/transaction/get_admission_needed_list",
            localStorage.getItem("v5_id")).then(res => {
            console.log(res);
            if (res.status === 200) {
                if (res.data.records !== "") {
                    setRenderRows(res.data.records);
                }
            }
        })
    }

    useEffect(() => {
        init();
    }, [])

    const clickDeny = (event) => {
        post("/transaction/admin", {
            "id": event.target.value,
            "message": "interrupted",
        }).then(res => {
            if (res.status === 200) {
                alert("操作成功");
                navigate(0);
            }
        });

    }

    const clickPass = (event) => {
        post("/transaction/admin", {
            "id": event.target.value,
            "message": "forward",
        }).then(res => {
            if (res.status === 200) {
                alert("操作成功")
            }
            ;
            navigate(0);
        });
    }

    const openInNewTab = url => {
        // 👇️ setting target to _blank with window.open
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const clickDownload = (event) => {
        const url = axios.defaults.baseURL
            + "/transaction/download/"
            + event.target.value;
        openInNewTab(url);
    }

    return (
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
                                <TableCell align="center">下载发票</TableCell>
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
                                            {row.intention}
                                        </TableCell>
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell
                                            align="center"
                                        >{row.type}</TableCell>
                                        <TableCell align="center">{row.cost}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                disabled={row.stage === 1 || !isVice}
                                                variant="outlined"
                                                value={row.fileName}
                                                onClick={clickDownload}
                                            >
                                                下载发票
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                disabled={!isVice}
                                                variant="contained"
                                                sx={{
                                                    color: "#272727",
                                                    backgroundColor: "#7bce5a",
                                                }}
                                                value={row.id}
                                                onClick={clickPass}
                                            >
                                                通过
                                            </Button>
                                            <Button
                                                disabled={!isVice}
                                                variant="outlined"
                                                sx={{
                                                    color: "#ce5a5a",
                                                    fontWeight: "bold"
                                                }}
                                                value={row.id}
                                                onClick={clickDeny}
                                            >
                                                拒绝
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