import React from "react";
import {
	AppBar,
	IconButton,
	makeStyles,
	Toolbar,
	InputBase,
	fade,
	Badge,
	Menu,
	MenuItem,
	useMediaQuery,
	Button,
	Avatar,
	Typography,
	Divider,
	Box
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
// import MoreIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { checkPassport, logout } from "features/Authenticate/authSlices";
import { UserRole } from "features/Authenticate/constance";
import NotificationPane from "features/Notification/NotificationPane";

export default function MyAppBar({ handle, open }) {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const user = useSelector(state => state.auth.user)
	const unread = useSelector(state => state.notification.unread)
	const classes = useStyles();
	const keyPress = (e) => {
		if (e.keyCode === 13) {
			console.log("Search ", e.target.value);
			// put the login here
		}
	};

	const [notiEl, setNotiEl] = React.useState(null);

	const isMobile = useMediaQuery("(max-width: 760px)");
	const [anchorEl, setAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);

	const history = useHistory();
	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		handleMenuClose();
		console.log("Logout");
		dispatch(logout());
	};
	const handleLogin = () => {
		handleMenuClose();
		history.push("/auth/login");
	};
	const handleRegister = () => {
		handleMenuClose();
		history.push("/auth/register");
	};
	const handleCheckAuth = () => {
		handleMenuClose();
		dispatch(checkPassport());
	};

	const handleInfo = () => {
		handleMenuClose();
		history.push("/info");
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
			disableScrollLock={true}
		>

			<div>
				<MenuItem style={{ display: "block" }}>
					<Typography style={{ fontWeight: "bold" }} variant="body1" color="initial">{user.name}</Typography>
					{user.role === UserRole.INSTRUCTOR && <Typography style={{ fontSize: 13 }} variant="body1" color="initial">Giảng viên</Typography>}
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleInfo}>Tài khoản</MenuItem>
				<MenuItem onClick={handleCheckAuth}>Check Auth</MenuItem>
				<Divider />
				<MenuItem style={{ color: "red" }} onClick={handleLogout}>Đăng xuất</MenuItem>
			</div>
		</Menu >
	);
	const renderNoti = (
		<Menu
			anchorEl={notiEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={Boolean(notiEl)}
			onClose={() => setNotiEl(null)}
			disableScrollLock={true}
			classes={{ paper: classes.notiPaper }}
		>
			<Box
				id="notificationMenu"
				style={{
					overflowY: "scroll",
					height: "48vh"
				}}
			>
				<NotificationPane />
			</Box>
		</Menu >
	);


	return (
		<div className={classes.grow}>
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar variant="dense">
					{isLoggedIn && !isMobile && (
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handle}
							edge="start"
							className={clsx(classes.menuButton, {
								[classes.hide]: open,
							})}
						>
							<MenuIcon />
						</IconButton>
					)}
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							onKeyDown={keyPress}
							placeholder="Tìm kiếm... "
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ "aria-label": "search" }}
						/>
					</div>

					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						{isLoggedIn ? (
							<div>
								<IconButton
									aria-label="show 17 new notifications"
									color="inherit"
									onClick={(e) => setNotiEl(notiEl ? null : e.currentTarget)}
								>
									<Badge badgeContent={unread} color="secondary">
										<NotificationsIcon />
									</Badge>
								</IconButton>
								<IconButton
									edge="end"
									aria-label="account of current user"
									aria-controls={menuId}
									aria-haspopup="true"
									onClick={handleProfileMenuOpen}
									color="inherit"
								>
									<Avatar style={{ width: 24, height: 24 }} alt={user.name} src={user.avatar_url} />
								</IconButton>
							</div>
						) : (
							<div>
								<Button onClick={handleLogin} color="primary" variant="contained" size="small" style={{ marginRight: 10 }}>
									Đăng nhập
								</Button>
								<Button onClick={handleRegister} color="secondary" variant="contained" size="small">
									Đăng ký
								</Button>
							</div>
						)}

					</div>

					<div className={classes.sectionMobile}>
						{
							isLoggedIn
								?
								(
									<Box display="flex">
										<IconButton
											aria-label="show 17 new notifications"
											color="inherit"
											onClick={(e) => setNotiEl(notiEl ? null : e.currentTarget)}
										>
											<Badge badgeContent={unread} color="secondary">
												<NotificationsIcon />
											</Badge>
										</IconButton>
										<IconButton
											aria-label="show more"
											aria-haspopup="true"
											onClick={handleProfileMenuOpen}
											color="inherit"
										>
											<Avatar style={{ width: 24, height: 24 }} alt={user.name} src={user.avatar_url} />
										</IconButton>
									</Box>
								)
								:
								(
									<IconButton
										aria-label="show more"
										aria-haspopup="true"
										onClick={handleLogin}
										color="inherit"
									>
										<AccountCircle />
									</IconButton>
								)
						}

					</div>
				</Toolbar>
			</AppBar>
			{ isLoggedIn && renderMenu}
			{ isLoggedIn && renderNoti}
		</div >
	);
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		[theme.breakpoints.up("sm")]: {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: "none",
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "30ch",
			},
		},
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
	grow: {
		flexGrow: 1,
	},
	notificationPane: {
		zIndex: 1000
	},
	notiPaper: {
		width: "100vw",
		height: "50vh",
		overflow: "unset",
		[theme.breakpoints.up("sm")]: {
			width: "35vw",
		},
	}
}));
