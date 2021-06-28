import React from "react";
import {
    Chat as ChatIcon,
    ImportContacts as ImportContactsIcon,
    Home as HomeIcon,
    Person as PersonIcon,
    Group,
    Loyalty,
    NotificationsActive
} from "@material-ui/icons";

import ListItemLink from "commons/components/ListItemLink";
// import globalStyle from "style/GlobalStyles";
import { List, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import DashboardIcon from '@material-ui/icons/Dashboard';

export default function AdminDrawer({ handle }) {
    const classes = useStyles();
    // globalStyle();
    const username = useSelector(state => state.auth.user.username);
    return (
        <List onClick={handle} className={classes.root}>
            {[
                {
                    name: "Dashboard",
                    key: "dashboard",
                    icon: <DashboardIcon />,
                    link: "/dashboard",
                },
                {
                    name: "Quản lý khóa học",
                    key: "courses",
                    icon: <ImportContactsIcon />,
                    link: `/courses/a/manage`,
                },
                {
                    name: "Quản lý người dùng",
                    key: "users",
                    icon: <Group />,
                    link: `/users/manage`,
                },
                {
                    name: "Quản lý Topic",
                    key: "topics",
                    icon: <Loyalty />,
                    link: `/topics/manage`,
                },
                {
                    name: "Thông báo",
                    key: "announcements",
                    icon: <NotificationsActive />,
                    link: "/announcements/manage",
                },
                {
                    name: "Tin nhắn",
                    key: "message",
                    icon: <ChatIcon />,
                    link: "/message",
                },
                {
                    name: "Cá nhân",
                    key: "info",
                    icon: <PersonIcon />,
                    link: "/info",
                },
            ].map(({ name, key, icon, link }) => (
                <ListItemLink to={link} icon={icon} primary={name} key={key} />
            ))}
        </List>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 0
    },
}));
