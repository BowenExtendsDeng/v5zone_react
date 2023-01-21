import React from 'react';
import {JudgeDevice} from "../templates/JudgeDevice";
import copy from 'copy-to-clipboard';

import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardMedia,
    Grid, MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";

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
function Image(props){
    const {imageUrl, access} = props;
    const [isPublic, setIsPublic] = React.useState(access);

    const handleChange = () =>{

    }

    const onDelete = () =>{

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
                >
                    {imageType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
                </TextField>
                <Button
                    size="middle"
                    variant="contained"
                    onClick={()=>{
                        copy(imageUrl);
                    }}
                >
                    复制链接
                </Button>
                <Button
                    size="middle"
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
function MyAlbum() {
    const isDesktop = JudgeDevice()

    const imageList = [
        {
            url: "https://img1.imgtp.com/2023/01/20/KLLvT9x1.jpeg",
            access: true
        },
        {
            url: "https://img1.imgtp.com/2023/01/20/fZwJbiLr.jpeg",
            access: false
        },
        {
            url: "https://img1.imgtp.com/2023/01/20/3b6GB4J6.jpeg",
            access: true
        },
        {
            url: "https://img1.imgtp.com/2023/01/20/1XD979GB.jpeg",
            access: false
        },
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
                >我的图床</Typography>
            }
            {isDesktop?
                <Box>
                    <Grid container spacing={2}>
                        {imageList.map((option) => (
                            <Grid xs={4}>
                                <Image imageUrl={option.url} access={option.access}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                :
                <Stack>
                    {imageList.map((option) => (
                        <Image imageUrl={option.url} access={option.access}/>
                    ))}
                </Stack>
            }
        </Box>
    );
}

export default MyAlbum;
