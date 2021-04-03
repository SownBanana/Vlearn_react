import React from "react";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from "@material-ui/icons/Home";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ListItemLink from "../../../commons/components/ListItemLink";

import {
	IconButton,
	List,
	makeStyles,
	useTheme,
	// ListItem,
	// ListItemIcon,
	// ListItemText,
	// Divider,
} from "@material-ui/core";
import MyAppBar from "./MyAppBar";

export default function SideBar() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<MyAppBar handle={handleDrawerOpen} open={open} />
			<Drawer
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
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</div>
				<List>
					{[
						{
							name: "Dashboard",
							key: "dashboard",
							icon: <HomeIcon />,
							link: "/home",
						},
						{
							name: "Khám phá",
							key: "browser",
							icon: <ImportContactsIcon />,
							link: "/auth",
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
				</List>
			</Drawer>
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
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 1,
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
}));
