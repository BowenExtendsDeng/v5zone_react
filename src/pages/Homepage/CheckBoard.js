import React, {useEffect, useState} from 'react';
import {JudgeDevice} from "../../components/templates/JudgeDevice";

import {
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardMedia,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import {post} from "../../request";
import axios from "axios";

function News(props) {

    const {imageUrl, title, date} = props;

    function handleRead() {
        alert("click")
    }

    return (
        <Card
            onClick={handleRead}
            sx={{
                margin: 3,
            }}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    width="300"
                    image={imageUrl}
                />
            </CardActionArea>
            <CardActions
                sx={{
                    margin: 1,
                }}
                onClick={handleRead}
            >
                <Grid container spacing={1}>
                    <Grid xs={10}>
                        <Typography
                            sx={{fontSize: 20, fontWeight: "bold"}}
                        >{title}</Typography>

                    </Grid>
                    <Grid xs={2}></Grid>
                    <Grid xs={8}>
                    </Grid>
                    <Grid xs={4}>
                        <Typography
                            sx={{fontSize: 20, fontWeight: "bold"}}
                        >{date}</Typography>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

function CheckBoard() {

    const isDesktop = JudgeDevice()

    const [imageList, setImageList] = useState([])

    function init() {
        post("/album/get_mine",
            localStorage.getItem("v5_id")).then(res => {
            console.log(res);
            if (res.status === 200) {
                const list = res.data.reverse();
                console.log("test_base_url: " + axios.defaults.baseURL);
                list.map((item) => {
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

    useEffect(() => {
        init();
    }, [])

    return (
        <Box>
                <Typography
                    align="center"
                    sx={{
                        fontFamily: "黑体",
                        fontSize: 20,
                        fontWeight: "bold",
                        height: 32,
                        marginTop: 2
                    }}
                >公告栏</Typography>

            <Box sx={{height: 50}}/>
            {isDesktop ?
                <Box>
                    <Grid container spacing={2}>
                        {imageList.map((option) => (
                            <Grid xs={4}>
                                <News imageUrl={option.resourceLink}
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
                        <News imageUrl={option.resourceLink}
                              access={option.isPublic}
                              title={option.title}
                        />
                    ))}
                </Stack>
            }
        </Box>
    );
}

export default CheckBoard;
