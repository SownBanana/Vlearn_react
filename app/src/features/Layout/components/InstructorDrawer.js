import React from "react";
import {
	Chat as ChatIcon,
	Notifications as NotificationsIcon,
	ImportContacts as ImportContactsIcon,
	Home as HomeIcon,
	Person as PersonIcon
} from "@material-ui/icons";

import ListItemLink from "commons/components/ListItemLink";
import globalStyle from "style/GlobalStyles";
import { List, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function InstructorDrawer({ handle }) {
	const classes = useStyles();
	globalStyle();
	const username = useSelector(state => state.auth.user.username);
	return (
		<List onClick={handle}>
			{[
				{
					name: "Trang chủ",
					key: "dashboard",
					icon: <HomeIcon />,
					link: "/",
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
				{
					name: "Thông báo",
					key: "notification",
					icon: <NotificationsIcon />,
					link: "/notification",
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
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
}));
