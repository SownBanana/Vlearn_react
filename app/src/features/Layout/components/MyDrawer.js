import React from "react";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import globalStyle from "../../../style/GlobalStyles";
import { IconButton, makeStyles, Hidden, Divider } from "@material-ui/core";
import { UserRole } from "features/Authenticate/constance";
import InstructorDrawer from "./InstructorDrawer";
import StudentDrawer from "./StudentDrawer";
import { useSelector } from "react-redux";
export default function MyDrawer({ handle, open }) {
	const classes = useStyles();
	globalStyle();
	const role = useSelector((state) => state.auth.user.role);
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
					{role === UserRole.INSTRUCTOR ? (
						<InstructorDrawer handle={handle} />
					) : (
						<StudentDrawer handle={handle} />
					)}
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
					{role === UserRole.INSTRUCTOR ? (
						<InstructorDrawer handle={handle} />
					) : (
						<StudentDrawer handle={handle} />
					)}
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
