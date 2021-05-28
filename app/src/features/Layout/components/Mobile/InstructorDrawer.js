import React from "react";
import {
	Chat as ChatIcon,
	Person as PersonIcon,
	ImportContacts as ImportContactsIcon,
	Home as HomeIcon,
	Dashboard,
} from "@material-ui/icons";

import { makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";

export default function InstructorDrawer() {
	const classes = useStyles();
	const history = useHistory();
	const username = useSelector(state => state.auth.user.username);
	const { pathname } = useLocation();
	const root = pathname.split("/")[1];
	const selected = root === "courses" ? "/" + root + "/i/" + username : "/" + root;
	// console.log(selected);
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
						name: "Dashboard",
						key: "dashboard",
						icon: <Dashboard />,
						link: "/dashboard",
					},
					{
						key: "courses",
						icon: <ImportContactsIcon />,
						link: `/courses/i/${username}`,
					},
					{
						key: "message",
						icon: <ChatIcon />,
						link: "/message",
					},
					// {
					// 	key: "notification",
					// 	icon: <NotificationsIcon />,
					// 	link: "/notification",
					// },
					{
						key: "info",
						icon: <PersonIcon />,
						link: "/info",
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
