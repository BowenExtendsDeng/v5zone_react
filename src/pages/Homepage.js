import React from 'react';
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import TaskIcon from '@mui/icons-material/Task';
import PhoneIcon from '@mui/icons-material/Phone';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import CollectionsIcon from '@mui/icons-material/Collections';
import {Outlet, useNavigate} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import {ArrowBack} from "@mui/icons-material";
import {JudgeDevice} from "../components/templates/JudgeDevice";
import GitHubIcon from '@mui/icons-material/GitHub';
import StorageIcon from '@mui/icons-material/Storage';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CoffeeIcon from '@mui/icons-material/Coffee';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const drawerWidth = 240;

function Homepage() {

    const [showDraw, setShowDraw] = React.useState(false);

    const navigate = useNavigate()

    const handleDrawerOpen = () => {
        setShowDraw(true);
    };

    const handleDrawerClose = () => {
        setShowDraw(false);
    };
    const judgePlatform = JudgeDevice()

    return (
        <div>
            {judgePlatform ? <div/> :
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar
                            sx={{
                                backgroundColor: '#FFFFFF',
                            }}
                        >
                            <IconButton
                                size="large"
                                edge="start"
                                color="#000000"
                                aria-label="menu"
                                sx={{mr: 2}}
                                onClick={() => {
                                    handleDrawerOpen();
                                }}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <img src={require("../assets/v5logo.png")}
                                 style={{
                                     width: 70,
                                     height: 30,
                                     marginRight: 10,
                                 }}
                                 alt={'v5logo'}>
                            </img>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    flexGrow: 1,
                                    color: "#000000"
                                }}>
                                V5 Zone
                            </Typography>
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    right: 20
                                }}
                                onClick={() => {
                                    navigate('/homepage/settings');
                                    handleDrawerClose();
                                }}
                            >
                                <SettingsIcon/>
                            </IconButton>
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    right: 60
                                }}
                                onClick={() => {
                                    navigate('/homepage/my_album');
                                    handleDrawerClose();
                                }}
                            >
                                <AddPhotoAlternateIcon/>
                            </IconButton>
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    right: 100
                                }}
                                onClick={() => {
                                    navigate('/homepage/manage');
                                    handleDrawerClose();
                                }}
                            >
                                <ManageAccountsIcon/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Box>
            }
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <Drawer
                    open={showDraw}
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant={judgePlatform ? "permanent" : "persistent"}
                    anchor="left"
                >
                    {judgePlatform ? <Toolbar
                            sx={{
                                margin: 1,
                                height: 100,
                            }}
                        >
                            <img
                                src={require('../assets/v5logo.png')}
                                alt={"v5_logo"}
                            />
                        </Toolbar>
                        : <div/>}
                    <List>
                        {judgePlatform ? <div/> :
                            <div>
                                <Divider/>
                                <ListItem
                                    sx={{
                                        height: 50
                                    }}
                                >
                                    <ListItemButton
                                        onClick={() => {
                                            handleDrawerClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <ArrowBack/>
                                        </ListItemIcon>
                                        <ListItemText primary={"返回"}/>
                                    </ListItemButton>
                                </ListItem>
                            </div>

                        }
                        <Divider/>
                        <ListItem key={'V5 Gitlab'} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    window.location.href = "https://git.npu5v5.cn"
                                }}
                            >
                                <ListItemIcon>
                                    <GitHubIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"V5 Gitlab"}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'V5 Gitea'} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    window.location.href = "https://gitea.npu5v5.cn"
                                }}
                            >
                                <ListItemIcon>
                                    <CoffeeIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"V5 Gitea"}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'V5 网盘'} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    window.location.href = "https://seafile.npu5v5.cn"
                                }}
                            >
                                <ListItemIcon>
                                    <StorageIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"V5 网盘"}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'V5 博客'} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    window.location.href = "https://docs.npu5v5.cn"
                                }}
                            >
                                <ListItemIcon>
                                    <CoPresentIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"V5 博客"}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'V5 学习资料'} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    window.location.href = "https://files.npu5v5.cn"
                                }}
                            >
                                <ListItemIcon>
                                    <CloudDownloadIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"V5 学习资料"}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                        <ListItem key={'公告栏'} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    navigate('/homepage/');
                                    handleDrawerClose();
                                }}
                            >
                                <ListItemIcon>
                                    <TaskIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"公告栏"}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'我的奖状'} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    navigate('/homepage/prize');
                                    handleDrawerClose();
                                }}
                            >
                                <ListItemIcon>
                                    <EmojiEventsIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"我的奖状"}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'经费报销'} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    navigate('/homepage/budget');
                                    handleDrawerClose();
                                }}
                            >
                                <ListItemIcon>
                                    {<MonetizationOnIcon/>
                                    }
                                </ListItemIcon>
                                <ListItemText primary={"经费报销"}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'组员联系方式'} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    navigate('/homepage/contact');
                                    handleDrawerClose();
                                }}
                            >
                                <ListItemIcon>
                                    {<PhoneIcon/>
                                    }
                                </ListItemIcon>
                                <ListItemText primary={"组员联系方式"}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem key={'V5留言板'} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    navigate('/homepage/message_board');
                                    handleDrawerClose();
                                }}
                            >
                                <ListItemIcon>
                                    <ChatIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"V5留言板"}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'V5照片墙'} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    navigate('/homepage/album');
                                    handleDrawerClose();
                                }}
                            >
                                <ListItemIcon>
                                    <CollectionsIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"V5照片墙"}/>
                            </ListItemButton>
                        </ListItem>

                    </List>
                </Drawer>
                {judgePlatform ?
                    <Box sx={{flexGrow: 1}}>
                        <Toolbar
                            sx={{
                                height: 80,
                                position: "relative",
                                display: "flex",
                            }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "#000000",
                                    fontFamily: "华文行楷",
                                    marginLeft: 5,
                                    fontSize: 25,
                                }}>
                                V5++ 无以复加
                            </Typography>
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    right: 20
                                }}
                                onClick={() => {
                                    navigate('/homepage/settings');
                                    handleDrawerClose();
                                }}
                            >
                                <SettingsIcon/>
                            </IconButton>
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    right: 60
                                }}
                                onClick={() => {
                                    navigate('/homepage/my_album');
                                    handleDrawerClose();
                                }}
                            >
                                <AddPhotoAlternateIcon/>
                            </IconButton>
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    right: 100
                                }}
                                onClick={() => {
                                    navigate('/homepage/manage');
                                    handleDrawerClose();
                                }}
                            >
                                <ManageAccountsIcon/>
                            </IconButton>
                        </Toolbar>
                        <Divider/>
                        <Outlet/>
                    </Box>
                    : <div/>}
            </Box>
            {judgePlatform ? <div/> : <Outlet/>}
        </div>
    );
}

export default Homepage;
