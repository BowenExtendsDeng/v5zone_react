import React from 'react';
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


function Message(props) {
    const {name, message, date} = props
    return(
        <Box sx={{margin: 3,}}>
            <React.Fragment>
                <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                        {date}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
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

    const handleApply = () => {
        setOpen(false);
    };

    const messages = [
        {
            name: "张三",
            date: "2020-9-1",
            message: "当上帝关了这扇门，一定会为你打开另一扇门"
        },
        {
            name: "张三",
            date: "2020-9-1",
            message: "当上帝关了这扇门，一定会为你打开另一扇门"
        },
        {
            name: "张三",
            date: "2020-9-1",
            message: "当上帝关了这扇门，一定会为你打开另一扇门"
        }
    ]

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
                                <Message name={option.name} date={option.date} message={option.message}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                :
                <Stack>
                    {messages.map((option) => (
                        <Message name={option.name} date={option.date} message={option.message}/>
                    ))}
                </Stack>
            }
        </Box>
    );
}

export default MessageBoard;
