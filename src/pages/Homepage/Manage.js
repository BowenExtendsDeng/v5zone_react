import React, {useEffect, useState} from 'react';
import {JudgeDevice} from "../../components/templates/JudgeDevice";
import {Box, Divider, Grid, Stack, Typography} from "@mui/material";
import Admission from "../../components/Homepage/Manage/Admission"
import POI from "../../components/Homepage/Manage/POI"
import Article from "../../components/Homepage/Manage/Article"
import Invite from "../../components/Homepage/Manage/Invite"
import {post} from "../../request";

function Manage() {
    const isDesktop = JudgeDevice()

    const [isVice, setVice] = useState(false);


    function init() {
        post("/auth/is_monitor", localStorage.getItem("v5_id"))
            .then(res => {
                setVice(res.data === "VICE_CAPTAIN");
            })
    }

    useEffect(() => {
        init();
    }, [])

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
                >Zone 设置</Typography>
            }
            {isDesktop ?
                <Grid container spacing={2} align={"center"}>
                    <Grid xs={1}></Grid>
                    <Grid xs={10} align={"center"}>
                        {isVice ? <Admission/> : <div/>}
                    </Grid>
                    <Grid xs={1}></Grid>
                    <Grid xs={1}></Grid>
                    <Grid xs={10} align={"center"}>
                        <Article/>
                    </Grid>
                    <Grid xs={1}></Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={6}>
                        <Invite></Invite>
                    </Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={6} align={"center"}>
                        <POI/>
                    </Grid>
                    <Grid xs={3}></Grid>
                </Grid>
                :
                <Stack align={"center"}>
                    <Divider/>
                    {isVice ? <Admission/> : <div/>}
                    <Divider/>
                    <Article/>
                    <Divider/>
                    <Invite/>
                    <Divider/>
                    <POI/>
                    <Divider/>
                </Stack>
            }
        </Box>
    );
}

export default Manage;
