import React from 'react';
import {JudgeDevice} from "../templates/JudgeDevice";
import {Box, Typography} from "@mui/material";

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
                >管理员界面</Typography>
            }
        </Box>
    );
}

export default Manage;
