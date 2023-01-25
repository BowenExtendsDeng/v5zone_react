import {Button, Stack, Typography} from "@mui/material";
import React from "react";

export default function POI(){
    return(
        <Stack>
            <Typography
                sx={{
                    margin: 3,
                    fontFamily: "黑体",
                    fontWeight: "bold",
                    fontSize: 20,
                }}
            >
                注意！队员隐私不得随意发给任何人！仅限比赛报名使用
            </Typography>
            <Button
                size="large"
                sx={{
                    margin:2,
                    textAlign: "center",
                    fontWeight: "bold",
                }}
                variant="outlined"
                onClick={() => {
                    alert('bye')
                }}>
                导出队员信息excel
            </Button>
            <Typography
                sx={{
                    margin: 3,
                    fontFamily: "黑体",
                    fontWeight: "bold",
                    fontSize: 20,
                }}
            >
                V5账单流水
            </Typography>
            <Button
                size="large"
                sx={{
                    margin:2,
                    textAlign: "center",
                    fontWeight: "bold",
                }}
                variant="outlined"
                onClick={() => {
                    alert('bye')
                }}>
                导出V5账单
            </Button>
        </Stack>
    )
}