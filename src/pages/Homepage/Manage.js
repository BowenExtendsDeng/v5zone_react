import React from 'react';
import {JudgeDevice} from "../../components/templates/JudgeDevice";
import {
    Box,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import Admission from "../../components/Homepage/Manage/Admission"
import POI from "../../components/Homepage/Manage/POI"
import Article from "../../components/Homepage/Manage/Article"

function Manage() {
    const isDesktop = JudgeDevice()

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
                        <Admission/>
                    </Grid>
                    <Grid xs={1}></Grid>
                    <Grid xs={3}></Grid>
                    <Grid xs={6} align={"center"}>
                        <Article/>
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
                    <Admission/>
                    <Divider/>
                    <Article/>
                    <Divider/>
                    <POI/>
                    <Divider/>
                </Stack>
            }
        </Box>
    );
}

export default Manage;
