import React, {useEffect, useState} from 'react';
import {JudgeDevice} from "../templates/JudgeDevice";
import {
    Box,
    Button,
    CardContent,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid, MenuItem,
    Stack, TextField,
    Typography
} from "@mui/material";
import {post} from "../../request";


function Message(props) {
    const {name, message, date} = props
    return(
        <Box sx={{margin: 3}}>
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
                </CardContent>
            </React.Fragment>
        </Box>

    );
}

function MessageBoard() {
    const isDesktop = JudgeDevice()

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleApply = (event) => {
        post("/message_board/add",{
            uploader: localStorage.getItem("v5_id"),
            message: event.target.value,
        }).then(res => {
            console.log(res);
            if (res.status === 200){
                alert("添加成功");
            }
        })
        setOpen(false);
    };

    const [messages,setMessages] = useState([]);

    useEffect(()=>{
        post("/message_board/get_all",
            localStorage.getItem("v5_id")).then(res => {
            console.log(res);
            if (res.status === 200){
                setMessages(res.data);
            }
        })
    },[])

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
                margin: 3,
                position: "absolute",
                right: 20,
            }}>新建留言</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                }}
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
                                <Message name={option.uploader} date={option.date} message={option.message}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                :
                <Stack>
                    {messages.map((option) => (
                        <Message name={option.uploader} date={option.date} message={option.message}/>
                    ))}
                </Stack>
            }
        </Box>
    );
}

export default MessageBoard;
