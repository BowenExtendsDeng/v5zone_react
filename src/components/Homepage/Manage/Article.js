import {Box, Button, Typography} from "@mui/material";
import React from "react";

export default function Article(){
    return(
        <Box>
            <Box>
                <Typography
                    sx={{
                        margin: 3,
                        fontFamily: "黑体",
                        fontWeight: "bold",
                        fontSize: 20,
                    }}
                >
                    管理公告栏
                </Typography>
                <Button
                    sx={{
                        margin:2,
                        textAlign: "center",
                    }}
                    variant="contained"
                    onClick={() => {
                        alert('bye')
                    }}>
                    管理公告栏
                </Button>
            </Box>
        </Box>
    )
}