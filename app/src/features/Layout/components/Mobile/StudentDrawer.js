import React from "react";
import {
    Chat as ChatIcon,
    Notifications as NotificationsIcon,
    SupervisorAccount as SupervisorAccountIcon,
    ImportContacts as ImportContactsIcon,
    Home as HomeIcon,
} from "@material-ui/icons";

import { makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import { useHistory, useLocation } from "react-router";

export default function StudentDrawer() {
    const classes = useStyles();
    const history = useHistory();
    const { pathname } = useLocation();
    const selected = "/" + pathname.split("/")[1];
    // const [value, setValue] = React.useState(selected);

    const handleChange = (event, link) => {
        history.push(link);
        // setValue(link);
    };
    return (
        <Paper square className={classes.root}>
            <Tabs
                value={selected}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                aria-label="icon tabs example"
            >
                {[
                    {
                        key: "dashboard",
                        icon: <HomeIcon />,
                        link: "/",
                    },
                    {
                        key: "browser",
                        icon: <ImportContactsIcon />,
                        link: `/courses`,
                    },
                    {
                        key: "connect",
                        icon: <SupervisorAccountIcon />,
                        link: "/connect",
                    },
                    {
                        key: "message",
                        icon: <ChatIcon />,
                        link: "/message",
                    },
                    {
                        key: "notification",
                        icon: <NotificationsIcon />,
                        link: "/notification",
                    },
                ].map(({ key, icon, link }) => (
                    // <ListItemLink to={link} icon={icon} primary={name} key={key} />
                    <Tab icon={icon} aria-label={key} value={link} />
                ))}
            </Tabs>
        </Paper>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 1000,
        // height: 50,
    },
}));
