import React from 'react';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import {JudgeDevice} from "../../components/templates/JudgeDevice";

function News(props){

    const {imageUrl, title, newsLink} = props

    const onClick = () =>{
        window.location.href = newsLink
    }

    return(
        <Card
            onClick={onClick}
            sx={{
            margin: 3
        }}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={imageUrl}
                    alt={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

function CheckBoard() {
    const isDesktop = JudgeDevice()

    const news = [
        {
            newsLink: "https://baidu.com",
            title: "寒假备赛安排",
            imageUrl: "https://img1.imgtp.com/2023/01/20/kmaINWYT.png",
        }
    ]

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
            >Zone公告栏</Typography>
            {isDesktop?
                <Box>
                    <Grid container spacing={2}>
                        {news.map((option) => (
                            <Grid xs={4}>
                                <News imageUrl={option.imageUrl} newsLink={option.newsLink} title={option.title}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                :
                <Stack>
                    {news.map((option) => (
                        <News imageUrl={option.imageUrl} newsLink={option.newsLink} title={option.title}/>
                    ))}
                </Stack>
            }
        </Box>
    );
}

export default CheckBoard;
