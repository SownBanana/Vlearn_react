import React from "react";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from "@material-ui/icons/Home";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ListItemLink from "../../../commons/components/ListItemLink";
import globalStyle from "../../../style/GlobalStyles";
import {
	IconButton,
	List,
	makeStyles,
	useTheme,
	Hidden,
	Divider,
} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";

export default function MyDrawer({ handle, open }) {
	const classes = useStyles();
	const theme = useTheme();
	console.log("============> ", theme);
	globalStyle();
	const drawer = (
		<List onClick={handle}>
			{[
				{
					name: "Dashboard",
					key: "dashboard",
					icon: <HomeIcon />,
					link: "/",
				},
				{
					name: "Khám phá",
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
	return (
		<div>
			<Hidden xsDown>
				<Drawer
					anchor="left"
					variant="permanent"
					className={clsx(classes.drawer, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					})}
					classes={{
						paper: clsx({
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open,
						}),
					}}
				>
					<div className={classes.toolbar}>
						<IconButton onClick={handle}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					{drawer}
				</Drawer>
			</Hidden>
			<Hidden smUp>
				<Drawer
					anchor="left"
					open={open}
					ModalProps={{ onBackdropClick: handle }}
				>
					<div className={classes.toolbar}>
						<IconButton onClick={handle}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					{drawer}
				</Drawer>
			</Hidden>
		</div>
	);
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
	},
	drawerOpen: {
		boxShadow: "4px 4px 10px 6px #5c5c5c80",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		boxShadow: "-4px 4px 10px 3px #5c5c5c80",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		width: 0,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(7) + 1,
		},
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		// ...theme.mixins.toolbar,
	},
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
