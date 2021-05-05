import React from "react";
import {
	Chat as ChatIcon,
	Notifications as NotificationsIcon,
	SupervisorAccount as SupervisorAccountIcon,
	ImportContacts as ImportContactsIcon,
	Home as HomeIcon,
} from "@material-ui/icons";

import ListItemLink from "commons/components/ListItemLink";
import globalStyle from "style/GlobalStyles";
import { List, makeStyles } from "@material-ui/core";

export default function InstructorDrawer({ handle }) {
	const classes = useStyles();
	globalStyle();

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
					link: "/courses",
				},
				{
					name: "Kết nối",
					key: "connect",
					icon: <SupervisorAccountIcon />,
					link: "/connect",
				},
			].map(({ name, key, icon, link }) => (
				<ListItemLink to={link} icon={icon} primary={name} key={key} />
			))}
			<div className={classes.sectionMobile}>
				{[
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
				].map(({ name, key, icon, link }) => (
					<ListItemLink to={link} icon={icon} primary={name} key={key} />
				))}
			</div>
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
	sectionMobile: {
		display: "block",
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
}));
