import React, {useEffect, useState} from 'react';
import {JudgeDevice} from "../../components/templates/JudgeDevice";
import {
    Box,
    Button,
    CardContent,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Divider,
    Grid, MenuItem,
    Stack, TextField,
    Typography
} from "@mui/material";
import {post} from "../../request";
import {useNavigate} from "react-router-dom";


function Message(props) {
    const {name, message, date, isMine} = props

    const navigate = useNavigate();

    const onDelete = () =>{
        post("/message_board/delete",{
            uploader: localStorage.getItem("v5_id"),
            message: message,
            date: date,
        }).then(res => {
            console.log(res.data);
        })

        navigate(0);
    }

    return(
        <Box sx={{
            margin: 3,
            backgroundColor: "#f1f1f1",
            boxShadow: "0 0 15px 10px #FFFFFF",
        }}>
            <React.Fragment>
                <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        {date}
                    </Typography>
                    <Typography sx={{ fontSize: 18 }} variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography sx={{ fontSize: 20 }} variant="body1" color="text.secondary">
                        {message}
                    </Typography>
                    {isMine ?
                        <Button
                            size="small"
                            sx={{
                                backgroundColor:"#e69191"
                            }}
                            variant="contained"
                            onClick={onDelete}
                        >
                            删除
                        </Button>
                        :
                        <div/>
                    }
                </CardContent>
            </React.Fragment>
            <Divider/>
        </Box>

    );
}

function MessageBoard() {

    const isDesktop = JudgeDevice()

    const [open, setOpen] = React.useState(false);

    const [msg, setMsg] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleApply = () => {
        post("/message_board/add",{
            uploader: localStorage.getItem("v5_id"),
            message: msg,
        }).then(res => {
            console.log(res);
            if (res.status === 200){
                alert("添加成功");
                navigate(0);
            }
        })
        setOpen(false);
    };

    const navigate = useNavigate()
    const [messages,setMessages] = useState([]);
    const [nameFromId,setNameFromId] = useState("");

    function init(){
        setTimeout(function(){},500);
        post("/message_board/get_all",
            localStorage.getItem("v5_id")).then(res => {
            console.log(res);
            if (res.status === 200){
                setMessages(res.data.reverse());
                res.data.map((option)=>{console.log(option.uploader)});
            }
        });
        post("/member/name",
            localStorage.getItem("v5_id")).then(res => {
            console.log(res);
            if (res.status === 200){
                setNameFromId(res.data.msg);
                console.log(nameFromId);
            }
        })
    }

    useEffect(()=>{
        init();
    },[])

    const handleOnChange = (event) => {
        setMsg(event.target.value);
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
                >Zone 留言板</Typography>
            }
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{
                margin: 2,
                position: "absolute",
                right: 20,
            }}>新建留言</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>新建留言</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="你的留言"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleOnChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{fontSize:16,marginRight:3, marginBottom: 3}}>取消</Button>
                    <Button onClick={handleApply} sx={{fontSize:16,marginRight:5, marginBottom: 3}}>发布</Button>
                </DialogActions>
            </Dialog>
            <Box sx={{height: 50}}/>
            {isDesktop ?
                <Box>
                    <Grid container spacing={2}>
                        {messages.map((option) => (
                            <Grid xs={4}>
                                <Message name={option.uploader}
                                         date={option.date}
                                         message={option.message}
                                         isMine = {nameFromId === option.uploader}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                :
                <Stack>
                    {messages.map((option) => (
                        <Message name={option.uploader}
                                 date={option.date}
                                 message={option.message}
                                 isMine = {nameFromId === option.uploader}
                        />
                    ))}
                </Stack>
            }
        </Box>
    );
}

export default MessageBoard;
