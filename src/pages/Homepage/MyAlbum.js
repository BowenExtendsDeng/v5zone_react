import React, {useEffect, useState} from 'react';
import {JudgeDevice} from "../../components/templates/JudgeDevice";
import copy from 'copy-to-clipboard';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {post} from "../../request";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const imageType = [
    {
        value: '公开上墙',
        label: '公开上墙',
    },
    {
        value: '私有',
        label: '私有',
    },
];

function upload(formData) {
    fetch(axios.defaults.baseURL + '/album/upload', {
        method: 'post',
        body: formData,
    }).then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

function Image(props){

    const navigate = useNavigate()
    const {imageUrl, access, title} = props;
    const [isPublic, setIsPublic] = useState(access === true);

    const handleChange = (event) =>{
        setIsPublic(event.target.value === "公开上墙")
        post("/album/set_public",{
            uploader: localStorage.getItem("v5_id"),
            isPublic: !isPublic,
            resourceLink: title,
        }).then(res => {
            console.log(res);
            if (res.status === 200){
                console.log(res.data);
            }
        })
    }

    const onDelete = () =>{

        post("/album/delete",{
            uploader: localStorage.getItem("v5_id"),
            isPublic: isPublic,
            resourceLink: title,
        }).then(res => {
            console.log(res.data);
        })

        navigate(0);
    }

    return(
        <Card sx={{
            margin: 3,
        }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="100%"
                    width="100%"
                    image={imageUrl}
                />
            </CardActionArea>
            <CardActions
                sx={{
                    margin:1,
                }}
            >
                <TextField
                    id="访问类型"
                    select
                    label="访问类型"
                    defaultValue={isPublic ? "公开上墙" : "私有"}
                    size="small"
                    sx={{
                        margin: 2,
                        width: 120,
                    }}
                    onChange={handleChange}
                >
                    {imageType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
                </TextField>
                <Button
                    size="small"
                    variant="contained"
                    onClick={()=>{
                        copy(imageUrl);
                    }}
                >
                    复制链接
                </Button>
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
            </CardActions>
        </Card>
    )
}

const method = [
    {
        value: '公开上墙',
        label: '公开上墙',
    },
    {
        value: '私有',
        label: '私有',
    },
];

function MyAlbum() {
    const [methodState, setMethodState] = useState("公开上墙")
    const fileInputChange = (event) => {
        const newFile = event.target.files[0];
        if(newFile.size >= 1048576 * 10){
            alert("文件不能大于 10M ");
            return;
        }
        setFile(event.target.files[0]);
    }

    const isDesktop = JudgeDevice()

    const [imageList, setImageList] = useState([])

    function init(){
        post("/album/get_mine",
            localStorage.getItem("v5_id")).then(res => {
            console.log(res);
            if (res.status === 200){
                const list = res.data.reverse();
                console.log("test_base_url: " + axios.defaults.baseURL);
                list.map((item)=>{
                    item.title = item.resourceLink;
                    item.resourceLink =
                        axios.defaults.baseURL
                        + "/album/download/"
                        + item.resourceLink;
                });
                setImageList(list);
            }
        })
    }

    useEffect(()=>{
        init();
    },[])

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const [file, setFile] = useState("null")

    function handleApply() {
        if(file === "none"){
            alert("请选择一个文件，再上传！");
            return;
        }

        const isPublic = (methodState === "公开上墙") ? "true" : "false";

        let formData = new FormData();
        formData.append("id", localStorage.getItem("v5_id"));
        formData.append("isPublic", isPublic);
        formData.append("file", file);

        upload(formData);

        init();
        handleClose();
    }

    const onMethodChanged = (event) => {
        setMethodState(event.target.value);
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
                >我的图床</Typography>
            }
            <Button
                variant="contained"
                component="label"
                sx={{
                    margin: 1,
                    position: "absolute",
                    right: 20,
                }}
                onClick={handleClickOpen}
            >
                上传新文件
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>新建上传</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        注意！ 图片的大小不得大于10Mb，单次最多上传1张照片
                    </DialogContentText>
                    <Stack>
                        <TextField
                            id="访问限制"
                            select
                            label="访问限制"
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
                                hidden accept="image/*"
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
            <Box sx={{height: 50}}/>
            {isDesktop?
                <Box>
                    <Grid container spacing={2}>
                        {imageList.map((option) => (
                            <Grid xs={4}>
                                <Image imageUrl={option.resourceLink}
                                       access={option.isPublic}
                                       title={option.title}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                :
                <Stack>
                    {imageList.map((option) => (
                        <Image imageUrl={option.resourceLink}
                               access={option.isPublic}
                               title={option.title}
                        />
                    ))}
                </Stack>
            }
        </Box>
    );
}

export default MyAlbum;
