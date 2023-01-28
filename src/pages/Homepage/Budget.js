import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
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
import {JudgeDevice} from "../../components/templates/JudgeDevice";
import Paper from "@mui/material/Paper";
import {post} from "../../request";
import {useNavigate} from "react-router-dom";
import BudgetRow from "../../components/Homepage/Budget/BudgetRow";

function Budget() {
    const [renderRows, setRenderRows] = useState([]);
    const [applyType, setApplyType] = useState([]);
    const [applyDescription, setApplyDescription] = useState([]);
    const [applyAmount, setApplyAmount] = useState([]);
    const [applyTele, setApplyTele] = useState([]);

    const navigate = useNavigate()
    const handleDescriptionChanged = (event) => {
        setApplyDescription(event.target.value);
    }

    const handleTypeChanged = (event) => {
        setApplyType(event.target.value);
    }

    const handleAmountChanged = (event) => {
        setApplyAmount(event.target.value);
    }

    function init() {
        post("/transaction/get_application_list",
            localStorage.getItem("v5_id")).then(res => {
            console.log(res);
            if (res.status === 200) {
                setRenderRows(res.data.records.reverse());
            }
        })
    }

    useEffect(() => {
        init();
        getTele();
    }, [])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleApply = () => {
        const data = {
            id: localStorage.getItem("v5_id"),
            description: applyDescription,
            type: applyType,
            amount: applyAmount,
            alipayTelephone: applyTele,
        }
        post('/transaction/apply', data).then((res) => {
            if (res.status === 200 && res.data.msg === "success") {
                alert("申请成功");
                navigate(0);
            } else {
                alert("申请失败，请检查网络状态");
            }
        })
        setOpen(false);
    };

    const isDesktop = JudgeDevice()

    const type = [
        {
            value: '支出',
            label: '支出',
        },
        {
            value: '收入',
            label: '收入',
        },
    ];

    const method = [
        {
            value: '全部',
            label: '全部',
        },
        {
            value: '进行中',
            label: '进行中',
        },
    ];

    const time = [
        {
            value: '全部',
            label: '全部',
        },
        {
            value: '一月内',
            label: '一月内',
        },
        {
            value: '三月内',
            label: '三月内',
        },

    ];

    function handleTeleChanged() {
        setApplyTele()
    }

    function getTele() {
        post("/member/tele",
            localStorage.getItem("v5_id")).then(res => {
            console.log(res);
            if (res.status === 200) {
                setApplyTele(res.data.msg);
            }
        }).catch(() => {
            alert("登录信息过期，请重新登录")
            navigate("/login/auth")
        })
    }

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
                >经费报销</Typography>
            }
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>新建申请</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        注意！ 支出项目金额大于100需要申请发票！
                    </DialogContentText>
                    <TextField
                        id="申请类型"
                        select
                        label="申请类型"
                        defaultValue="支出"
                        size="small"
                        sx={{
                            margin: 2,
                            width: 120,
                        }}
                        value={applyType}
                        onChange={handleTypeChanged}
                    >
                        {type.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="申请项说明"
                        fullWidth
                        variant="standard"
                        value={applyDescription}
                        onChange={handleDescriptionChanged}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="申请金额"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={applyAmount}
                        onChange={handleAmountChanged}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="支付宝绑定手机号"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={applyTele}
                        onChange={handleTeleChanged}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                            sx={{marginRight: 3, marginBottom: 3}
                            }>取消</Button>
                    <Button onClick={handleApply}
                            sx={{marginRight: 5, marginBottom: 3}
                            }>确认申请</Button>
                </DialogActions>
            </Dialog>
            <Grid container spacing={1} sx={{textAlign: "center", marginY: 3}}>
                <Grid xs={4}>
                    <TextField
                        disabled={true}
                        id="类型筛选"
                        select
                        label="类型筛选"
                        defaultValue="全部"
                        size="small"
                        sx={{}}
                    >
                        {method.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid xs={4}>
                    <TextField
                        disabled={true}
                        id="时间筛选"
                        select
                        label="时间筛选"
                        defaultValue="全部"
                        size="small"
                        sx={{}}
                    >
                        {time.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid xs={4}>
                    <Button
                        variant="contained"
                        sx={{}}
                        onClick={handleClickOpen}
                    >新建申请</Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            {isDesktop ? <TableCell align="center">交易编号</TableCell> : <div/>}
                            <TableCell align="center">申请项</TableCell>
                            <TableCell align="center">类型</TableCell>
                            <TableCell align="center">金额</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderRows.map((row) => (
                            <BudgetRow key={row.name} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );

}

export default Budget;
