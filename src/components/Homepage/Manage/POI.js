import {Button, Stack, Typography} from "@mui/material";
import React from "react";
import axios from "axios";

export default function POI() {

    const openInNewTab = url => {
        // 👇️ setting target to _blank with window.open
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    function handleMembersDownload() {
        const url = axios.defaults.baseURL
            + "/poi/members/members.xlsx"
        openInNewTab(url);
    }

    function handleBillsDownload() {
        const url = axios.defaults.baseURL
            + "/poi/bills/bills.xlsx"
        openInNewTab(url);
    }

    const handleInvoiceDownload = (event) => {
        const url = axios.defaults.baseURL
            + "/poi/invoice/" + event.target.value + ".zip"
        openInNewTab(url);
    }

    return (
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
                    margin: 2,
                    textAlign: "center",
                    fontWeight: "bold",
                }}
                variant="outlined"
                onClick={handleMembersDownload}>
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
                    margin: 2,
                    textAlign: "center",
                    fontWeight: "bold",
                }}
                variant="outlined"
                onClick={handleBillsDownload}>
                导出V5账单
            </Button>
            <Typography
                sx={{
                    margin: 3,
                    fontFamily: "黑体",
                    fontWeight: "bold",
                    fontSize: 20,
                }}
            >
                V5发票
            </Typography>
            <Button
                size="large"
                sx={{
                    margin: 2,
                    textAlign: "center",
                    fontWeight: "bold",
                }}
                variant="outlined"
                value={new Date().getFullYear()}
                onClick={handleInvoiceDownload}>
                导出{new Date().getFullYear()}年发票
            </Button>
            <Button
                size="large"
                sx={{
                    margin: 2,
                    textAlign: "center",
                    fontWeight: "bold",
                }}
                variant="outlined"
                value={"all"}
                onClick={handleInvoiceDownload}>
                导出全部发票
            </Button>
        </Stack>
    )
}