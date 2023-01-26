import React, {useEffect, useState} from 'react';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, coyWithoutShadows, darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {Box, Button, Stack} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";


const them = {
    dark: vscDarkPlus,
    light: coyWithoutShadows
}

function MdReader() {

    const [search, setSearch] = useSearchParams()

    const [textContent, setContent] = useState("")

    const [darkMode, setDarkMode] = useState(false)

    async function init() {
        const url = axios.defaults.baseURL
            + "/markdown/download/"
            + search.get("fileLink");
        fetch(url)
            .then(res => res.text())
            .then(text => setContent(text));

    }

    useEffect(()=>{
        init();
    },[])

    // String文本 boolean

    if (typeof darkMode === 'undefined') {
        them.light = darcula;
    }
    if (typeof darkMode === 'boolean') {
        them.light = coyWithoutShadows;
    }

    const navigate = useNavigate();

    return (
        <Stack sx={{margin: 2}}>
            <Box>
                <Button
                    variant={"outlined"}
                    onClick={()=>{
                        navigate('/homepage');
                    }}
                    sx={{
                        width:140,
                        margin:2,
                        fontWeight: "bold",
                    }}
                >返回公告栏</Button>
            </Box>
            <ReactMarkdown
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <SyntaxHighlighter
                                showLineNumbers={true}
                                style={darkMode ? them.dark : them.light}
                                language={match[1]}
                                PreTag='div'
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    }
                }}
            >
                {textContent}
            </ReactMarkdown>
        </Stack>

    );
}

export default MdReader;