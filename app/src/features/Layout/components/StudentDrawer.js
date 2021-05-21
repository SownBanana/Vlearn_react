import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
// import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ListItemLink from "../../../commons/components/ListItemLink";
import globalStyle from "../../../style/GlobalStyles";
import { List, makeStyles } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from '@material-ui/icons/Dashboard';

export default function StudentDrawer({ handle }) {
	const classes = useStyles();
	// globalStyle();

	return (
		<List onClick={handle} className={classes.root}>
			{[
				{
					name: "Trang chủ",
					key: "home",
					icon: <HomeIcon />,
					link: "/",
				},
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
					link: "/courses",
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
	root: {
		paddingTop: 0
	},
}));
