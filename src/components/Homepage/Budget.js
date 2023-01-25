import React, {useEffect, useState} from 'react';
import {
    Box, Button,
    Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider,
    IconButton, MenuItem, Step, StepLabel, Stepper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Typography
} from "@mui/material";
import {JudgeDevice} from "../templates/JudgeDevice";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Paper from "@mui/material/Paper";
import {post} from "../../request";
import {useNavigate} from "react-router-dom";

const steps = [
    '发起预算申请',
    '项目款已发放',
    '发票已上传',
    '审核通过交易结束',
];

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row"  align="center">
                    {row.intention}
                </TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">{row.cost}</TableCell>
                <TableCell align="center">{row.stage}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                申请项细节
                            </Typography>
                            <Stepper activeStep={row.stage} alternativeLabel>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            <Divider/>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">操作时间</TableCell>
                                        <TableCell align="center">描述</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row" align="center">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell align="center">{historyRow.description}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

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

    function init(){
        setTimeout(function(){},500);
        post("/transaction/get_application_list",
            localStorage.getItem("v5_id")).then(res => {
            console.log(res);
            if (res.status === 200){
                setRenderRows(res.data.records);
            }
        })
    }

    useEffect(()=>{
        init();
        getTele();
    },[])

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
        post('/transaction/apply',data).then((res)=>{
            if(res.status === 200 && res.data.msg === "success"){
                alert("申请成功");
            }else{
                alert("申请失败，请检查网络状态");
            }
        })
        setOpen(false);
        navigate(0);
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

    function getTele(){
        post("/member/tele",
            localStorage.getItem("v5_id")).then(res => {
            console.log(res);
            if (res.status === 200){
                setApplyTele(res.data.msg);
            }
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
            <Button
                variant="contained"
                sx={{
                    margin: 2,
                    marginRight: 3,
                    float: "right",
                }}
                onClick={handleClickOpen}
            >新建申请</Button>
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
                    <Button onClick={handleClose} sx={{marginRight:3, marginBottom: 3}}>取消</Button>
                    <Button onClick={handleApply} sx={{marginRight:5, marginBottom: 3}}>确认申请</Button>
                </DialogActions>
            </Dialog>
            <TextField
                id="类型筛选"
                select
                label="类型筛选"
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
                id="时间筛选"
                select
                label="时间筛选"
                defaultValue= "全部"
                size="small"
                sx={{
                    margin: 2,
                    width: 100,
                }}
            >
                {time.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="center">申请项</TableCell>
                            <TableCell align="center">类型</TableCell>
                            <TableCell align="center">金额</TableCell>
                            <TableCell align="center">阶段</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderRows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );

}

export default Budget;
