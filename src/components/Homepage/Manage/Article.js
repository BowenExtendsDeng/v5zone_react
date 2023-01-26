import React, {useState} from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Grid, MenuItem,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Typography
} from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import {post} from "../../../request";

function MarkdownTable() {

    const [renderRows, setRenderRows] = useState([]);
    const [methodState, setMethodState] = useState([]);
    const method = [
        {
            value: '发布',
            label: '发布',
        },
        {
            value: '不发布',
            label: '不发布',
        },
    ];

    function clickDelete() {

    }

    function onMethodChanged() {

    }

    return(
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">上传时间</TableCell>
                        <TableCell align="center">图片链接</TableCell>
                        <TableCell align="center">标题</TableCell>
                        <TableCell align="center">状态</TableCell>
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
                                <TableCell align="center">
                                    {row.name}</TableCell>
                                <TableCell
                                    align="center"
                                >{row.type}</TableCell>
                                <TableCell align="center">
                                    <TextField
                                        id="是否发布"
                                        select
                                        label="是否发布"
                                        defaultValue="公开上墙"
                                        size="small"
                                        sx={{
                                            margin: 2,
                                            width: 120,
                                        }}
                                        value={methodState}
                                        onChange={onMethodChanged}
                                    >
                                        {method.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </TableCell>
                                <TableCell align="center">

                                    <Button
                                        variant="outlined"
                                        value={row.fileLink}
                                        onClick={clickDelete}
                                    >
                                        修改封面图链接
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        value={row.fileLink}
                                        onClick={clickDelete}
                                    >
                                        删除
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function Article() {
    const type = [
        {
            value: '暂不发布',
            label: '暂不发布',
        },
        {
            value: '发布',
            label: '发布',
        },
    ];
    function upload(formData) {
        fetch(axios.defaults.baseURL + '/markdown/upload', {
            method: 'post',
            body: formData,
        }).then(response => response.json())
            .then(data => {
                console.log(data);
            });
    }

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const [file, setFile] = useState("null")
    const [title, setTitle] = useState("")
    const [imageLink, setImageLink] = useState("")
    const [applyType, setApplyType] = useState("暂不发布");


    function handleApply() {
        if(file === "none"){
            alert("请选择一个文件，再上传！");
            return;
        }

        const isPublished = applyType === "发布" ? "true" : "false";

        let formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("imageLink", imageLink);
        formData.append("isPublished", isPublished);

        upload(formData);

        handleClose();
    }

    const fileInputChange = (event) => {
        const newFile = event.target.files[0];
        if(newFile.size >= 1048576 * 10){
            alert("文件不能大于 10M ");
            return;
        }
        if(newFile.name.split('.').pop().toLowerCase() !== "md"){
            alert("上传的文件不是 markdown 形式，系统拒收");
            return;
        }

        setFile(event.target.files[0]);
    }

    const handleTitleChanged = (event) => {
        setTitle(event.target.value);
    }

    const handleImageLinkChanged = (event) => {
        setImageLink(event.target.value);
    }
    const handleTypeChanged = (event) => {
        setApplyType(event.target.value);
    }
    return (
        <Stack>
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
            <Grid container spacing={1}>
                <Grid xs={4}></Grid>
                <Grid xs={4}>
                    <Button
                        onClick={handleOpen}
                        variant={"contained"}
                    >上传新文档</Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle>新建文章</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                注意！文章必须是以 md 的形式上传，并且文件大小不得大于10Mb，
                                单次最多上传1个文件
                            </DialogContentText>
                            <Stack>
                                <TextField
                                    id="是否发布"
                                    select
                                    label="是否发布"
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
                                    label="文章标题（必填）"
                                    fullWidth
                                    variant="standard"
                                    value={title}
                                    onChange={handleTitleChanged}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="封面图链接（必填）"
                                    fullWidth
                                    variant="standard"
                                    value={imageLink}
                                    onChange={handleImageLinkChanged}
                                />
                                <Button
                                    variant="outlined"
                                    component="label"
                                    sx={{
                                        margin: 1,
                                        height: 160,
                                        fontSize: 24
                                    }}
                                >
                                    点击上传 <DriveFolderUploadIcon/>
                                    <input
                                        hidden accept="text/markdown"
                                        multiple type="file"
                                        onChange={fileInputChange}
                                    />
                                </Button>
                                <Typography
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: "bold",
                                    }}
                                >
                                    当前接收到的文件：{file.name}
                                </Typography>
                            </Stack>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} sx={{marginRight:3, marginBottom: 3}}>取消</Button>
                            <Button onClick={handleApply} sx={{marginRight:5, marginBottom: 3}}>上传</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                <Grid xs={4}></Grid>
            </Grid>
            <MarkdownTable></MarkdownTable>
        </Stack>
    );
}

export default Article;