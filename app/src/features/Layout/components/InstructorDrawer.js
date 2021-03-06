import React from "react";
import {
	Chat as ChatIcon,
	ImportContacts as ImportContactsIcon,
	Home as HomeIcon,
	Person as PersonIcon,
} from "@material-ui/icons";

import ListItemLink from "commons/components/ListItemLink";
// import globalStyle from "style/GlobalStyles";
import { List, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import DashboardIcon from '@material-ui/icons/Dashboard';

export default function InstructorDrawer({ handle }) {
	const classes = useStyles();
	// globalStyle();
	const username = useSelector(state => state.auth.user.username);
	return (
		<List onClick={handle} className={classes.root}>
			{[
				// {
				// 	name: "Trang chủ",
				// 	key: "home",
				// 	icon: <HomeIcon />,
				// 	link: "/",
				// },
				{
					name: "Dashboard",
					key: "dashboard",
					icon: <DashboardIcon />,
					link: "/dashboard",
				},
				{
					name: "Khóa học của tôi",
					key: "browser",
					icon: <ImportContactsIcon />,
					link: `/courses/i/${username}`,
				},
				{
					name: "Tin nhắn",
					key: "message",
					icon: <ChatIcon />,
					link: "/message",
				},
				// {
				// 	name: "Thông báo",
				// 	key: "notification",
				// 	icon: <NotificationsIcon />,
				// 	link: "/notification",
				// },
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
