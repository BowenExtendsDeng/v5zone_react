import React from 'react';
import {JudgeDevice} from "../../components/templates/JudgeDevice";
import {Box, Typography} from "@mui/material";

function Prize() {
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
                >我的奖状</Typography>
            }

            <Box
                sx={{
                    margin: 10
                }}
            >
                <img src={require("../../assets/build.png")}
                     style={{
                         width: 240,
                         height: 240,
                         textAlign: "center",
                     }}
                     alt={'build'}>
                </img>
                <Typography>本版本暂不开放，搓搓手期待下吧</Typography>
            </Box>
        </Box>
    );
}

export default Prize;
