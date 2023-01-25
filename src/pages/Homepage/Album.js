import * as React from 'react';
import {Box, ImageList, ImageListItem, Typography} from "@mui/material";
import {JudgeDevice} from "../../components/templates/JudgeDevice";
import {post} from "../../request";
import {useEffect, useState} from "react";
import axios from "axios";

export default function ColorTabs() {

    const isDesktop = JudgeDevice()

    const [imageList, setImageList] = useState([])

    function init(){
        post("/album/get_public",
            localStorage.getItem("v5_id")).then(res => {
            console.log(res);
            if (res.status === 200){
                const list = res.data.reverse();
                console.log("test_base_url: " + axios.defaults.baseURL);
                list.map((item)=>{
                    item.title = item.resourceLink;
                    item.resourceLink = axios.defaults.baseURL
                        + "/album/download/"
                        + item.resourceLink
                });
                setImageList(list);
            }
        })
    }

    useEffect(()=>{
        init();
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
                >Zone 照片墙</Typography>
            }
            <ImageList variant="masonry" cols={3} gap={8}>
                {imageList.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={`${item.resourceLink}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.resourceLink}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>

    );
}
