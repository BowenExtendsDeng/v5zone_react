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

function News(props) {
    const {imageUrl, title, fileLink, pubDate} = props;

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
                    <Grid xs={9}>
                        <Typography
                            sx={{fontSize: 24, fontWeight: "bold"}}
                        >{title}</Typography>

                    </Grid>
                    <Grid xs={3}>
                        <Typography
                            color="text.secondary"
                            sx={{fontSize: 14,marginTop:2}}
                        >{pubDate}</Typography>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

function CheckBoard() {

    const isDesktop = JudgeDevice()

    const [renderRows, setRenderRows] = useState([])

    function init() {
        post("/markdown/publish",
            localStorage.getItem("v5_id")).then(res => {
            console.log(res);
            if (res.status === 200){
                let temp = res.data.reverse();
                temp.map((option) => {
                    option.pubDate = option.pubDate.split("T")[0];
                })
                setRenderRows(temp);

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
                        {renderRows.map((option) => (
                            <Grid xs={4}>
                                <News imageUrl={option.imageLink}
                                      fileLink={option.fileLink}
                                      title={option.title}
                                      pubDate={option.pubDate}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                :
                <Stack>
                    {renderRows.map((option) => (
                        <News imageUrl={option.imageLink}
                              fileLink={option.fileLink}
                              title={option.title}
                              pubDate={option.pubDate}
                        />
                    ))}
                </Stack>
            }
        </Box>
    );
}

export default CheckBoard;
