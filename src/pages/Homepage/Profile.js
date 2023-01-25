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
                >我的个人信息</Typography>
            }


        </Box>
    );
}

export default Prize;
