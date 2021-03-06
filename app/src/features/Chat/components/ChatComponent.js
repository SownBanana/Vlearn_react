import React, { useEffect, useRef, useState } from "react";
import {
	Fab,
	Hidden,
	makeStyles,
	Popper,
	Paper,
	List,
	ListItem,
	Box,
	Grid,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	TextField,
	Avatar,
	Badge,
	Zoom,
	Grow,
	Tooltip
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { ModeComment } from "@material-ui/icons";
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import Message from "./Message";
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import { sendChat, setCurrent, fetchChats, setForceOpenChat } from 'features/Chat/chatSlice'
import { useLocation } from "react-router";
import NavigationRoundedIcon from '@material-ui/icons/NavigationRounded';
import clsx from "clsx";
import upload from 'commons/api/upload/upload'
import { makeToast } from "features/Toast/toastSlices";
import { useHistory } from "react-router-dom";
import { UserRole } from "features/Authenticate/constance";

export default function ChatComponent() {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { pathname } = useLocation();
	const inMessagePath = pathname.split("/")[1] === "message";
	const ref = useRef(null);
	const messageArea = useRef();

	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};
	const open = Boolean(anchorEl);
	const type = open ? 'simple-popper' : undefined;

	const [isMiniumChatBox, setMiniumChatBox] = useState(false);

	const [assets, setAssets] = useState([]);
	const [uploadFiles, setUploadFiles] = useState([]);
	const isFile = assets.length > 0;

	const token = useSelector(state => state.auth.refresh_token);
	const id = useSelector((state) => state.auth.user.id);
	const currentChat = useSelector(state => state.chat.current)
	const { users, messages } = currentChat;
	const thisRoomId = currentChat.id;
	const user = users.length === 0 ? {} : users[0].id !== id ? users[0] : users[1];
	const chats = useSelector(state => state.chat.chats);
	const forceOpenChat = useSelector(state => state.chat.forceOpenChat);

	const history = useHistory()
	const goToInfoPage = (username) => {
		history.push(`/info/${username}`)
	}
	const openChat = (id) => {
		dispatch(setCurrent(id))
		setMiniumChatBox(false)
	}
	const [typingMessage, setTypingMessage] = useState("");


	const TEN_GB = 10737418240;
	const handleFileUpload = async (e) => {
		console.log(e.target.files)
		const files = e.target.files;
		if (files.length > 100) {
			dispatch(makeToast("V?????t qu?? s??? file cho ph??p"));
		} else {
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				console.log(file)
				if (file.size > TEN_GB) {
					dispatch(makeToast("File v?????t qu?? 10GB"));
				} else {
					const response = await upload.uploadDirect({ file: file });
					if (response) {
						setAssets((assets) => assets = [...assets, response.asset.id]);
						setUploadFiles((uploadFiles) => uploadFiles = [...uploadFiles, { file: file, url: response.url }]);
					}

				}
			}
		}
	}

	const sendMessage = () => {
		if (typingMessage) {
			dispatch(
				sendChat({
					sender_id: id,
					sender: user,
					id: user.id,
					room_id: thisRoomId,
					content: typingMessage,
					assets: assets,
					files: uploadFiles.map(f => {
						var asset = {};
						asset.url = f.url;
						asset.type = f.file.type;
						asset.name = f.file.name;
						return asset;
					})
				}));
			setAssets([]);
			setUploadFiles([]);
			setTypingMessage("");
		}
	}

	useEffect(() => {
		if (Object.keys(chats).length === 0) {
			dispatch(fetchChats())
		}
	}, [token])

	var scrollTimeOut = 0;
	useEffect(() => {
		clearTimeout(scrollTimeOut);
		scrollTimeOut = setTimeout(() => {
			if (messageArea.current)
				messageArea.current.scrollTop = messageArea.current.scrollHeight;
		}, 100)
	}, [currentChat]);
	useEffect(() => {
		if (messageArea.current)
			messageArea.current.scrollTop = messageArea.current.scrollHeight;
	}, [messages]);
	useEffect(() => {
		if (forceOpenChat) {
			dispatch(setForceOpenChat(false));
			setAnchorEl(ref.current);
		}
	}, [forceOpenChat])
	return (id !== null && !inMessagePath) && (
		<Hidden xsDown>

			<div className={classes.chatBubble}>
				<Badge color="primary" variant="dot" overlap="circle">
					<Fab ref={ref} color="secondary" aria-label="add" onClick={handleClick}>
						<ModeComment />
					</Fab>
					<NavigationRoundedIcon
						className={classes.scrollTop}
						onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}
					/>
				</Badge>
			</div>
			<Popper
				id={type}
				open={open}
				anchorEl={anchorEl}
				style={{ zIndex: 10 }}
			>
				<Grow in={open} style={{ transformOrigin: '100% 100%' }}>
					<Grid container spacing={1} direction="column" >
						{
							Object.keys(chats).map(key => {
								const chat = chats[key];
								// debugger
								if (chat.users && chat.users.length > 0) {
									const chatUser = chat.users[0].id !== id ? chat.users[0] : chat.users[1];
									return <Avatar onClick={() => openChat(key)} alt={chatUser.name} src={chatUser.avatar_url} style={{ marginBottom: 10 }} />
								}
							})
						}
					</Grid>
				</Grow>

			</Popper>
			<Popper
				id={type}
				open={open}
				anchorEl={anchorEl}
				placement="left-end"
				style={{ zIndex: 10 }}
			>
				<Zoom in={open && !isMiniumChatBox}  {...(open && !isMiniumChatBox ? { timeout: 300 } : {})} style={{ transformOrigin: '100% 100%' }}>
					<Box className={clsx({ [classes.hideComponent]: isMiniumChatBox })} mr={2}>
						<Paper className={classes.chatBoxRoot}>
							<DialogTitle className={classes.chatBoxTitle} disableTypography>
								<Grid container spacing={0} direction="row">
									<Grid md={10} xs={10}
										item container direction="row" alignItems="center"
										onClick={() => goToInfoPage(user.username)}
										className={classes.textLink}
									>
										<Avatar alt={user.name} src={user.avatar_url}
											style={{
												border: user.role === UserRole.INSTRUCTOR ? '3px solid #b3eaff' : '0px',
												marginRight: 4
											}}
											className={classes.avatarLink}
										/>
										{user.name}
									</Grid>
									<Grid item md={2} xs={2}>
										<IconButton onClick={() => setMiniumChatBox(true)}>
											<RemoveRoundedIcon />
										</IconButton>
									</Grid>
								</Grid>
							</DialogTitle>
							<DialogContent ref={messageArea} dividers className={classes.chatBoxContent}>
								<List className={classes.chatBackground} component="nav" aria-label="main mailbox folders">
									{messages.map(mess => {
										return <ListItem>
											<Message
												user={mess.sender_id !== id ? user : null}
												content={mess.content}
												assets={mess.assets}
												timestamp={mess.timestamp}
											/>
										</ListItem>
									})}
								</List>
							</DialogContent>
							{
								isFile &&
								<DialogContent
									style={{
										padding: 4,
										display: "flex",
										overflow: "auto"
									}}

									dividers>
									{
										uploadFiles.map((fileData, index) => {
											// debugger
											const { file, url } = fileData;
											// type: "image/png"
											return (
												<Box
													key={url}
													border={1}
													borderColor="grey.200"
													width="30px"
													height="30px"
													display="flex"
													justifyContent="center"
													alignItems="center"
													ml="10px"
													onClick={
														(e) => {
															var index = -1;
															setUploadFiles(
																uploadFiles.filter((u, i) => {
																	index = i
																	return u.url !== url
																})
															)
															setAssets(
																assets.filter((a, i) => i !== index)
															)
														}
													}
													className={classes.fileContainer}
												>
													{
														(file.type.includes('image')) ?
															< img width="30px" height="30px" src={url} /> :
															<Tooltip title={file.name} placement="top">
																<Paper style={{ width: "100%", overflow: "hidden", padding: "2px" }}>
																	<AttachFileRoundedIcon style={{ fontSize: 14 }} color="secondary" />
																</Paper>
															</Tooltip>
													}
													<div className={classes.hiddenButton}>x</div>
												</Box>
											)
										})
									}
								</DialogContent>}
							<DialogActions className={classes.chatBoxAction}>
								<input
									accept="*/*"
									style={{ display: "none" }}
									id={"icon-button-file"}
									type="file"
									onChange={handleFileUpload}
									multiple
								/>
								<IconButton color="primary" size="small" style={{ margin: 0 }}>
									<label htmlFor={"icon-button-file"}>
										<AttachFileRoundedIcon size="inherit" />
									</label>
								</IconButton>
								<TextField
									id=""
									label=""
									fullWidth={true}
									variant="outlined"
									style={{ padding: 0, marginLeft: 10 }}
									size="small"
									multiline
									rows={1}
									value={typingMessage}
									onChange={(e) => setTypingMessage(e.target.value)}
									onKeyUp={(e) => {
										if (e.code === 'Enter')
											if (!e.ctrlKey) sendMessage();
											else {
												console.log("Enter");
												setTypingMessage(typingMessage + '\n')
											}
									}}
								/>
								<IconButton color="primary" size="small">
									<SendRoundedIcon onClick={sendMessage} />
								</IconButton>
							</DialogActions>
						</Paper>
					</Box>
				</Zoom>
				<div hidden={!isMiniumChatBox} className={classes.expandButton}>
					<IconButton size="small" onClick={() => setMiniumChatBox(false)}>
						<ExpandLessRoundedIcon size="small" />
					</IconButton>
				</div>
			</Popper>
		</Hidden>
	);
}

const useStyles = makeStyles((theme) => ({
	chatBubble: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(2),
		zIndex: 10000,
		color: "orange",

	},
	scrollTop: {
		position: "absolute",
		bottom: -5,
		right: -15,
		cursor: "pointer"
	},
	chatBoxRoot: {
		height: "fit-content",
		width: "50vh",
		overflow: "hidden",
		border: "1px solid #cecece90",
		// visibility: "hidden"
	},
	chatBoxTitle: {
		height: "8vh",
		padding: "5px 5px 5px 12px",
		fontSize: "1rem"
	},
	chatBoxContent: {
		height: "40vh",
		padding: 0,
	},
	chatBoxAction: {
		height: "9vh",
	},
	chatBackground: {
		backgroundColor: "#cecece25",
	},
	expandButton: {
		background: "white",
		borderRadius: "30%",
		opacity: "0.8",
		marginBottom: theme.spacing(2),
		marginRight: theme.spacing(1)
	},
	hideComponent: {
		display: "none"
	},
	fileContainer: {
		position: "relative",
		"&:hover $hiddenButton": {
			opacity: 1,
		}
	},
	hiddenButton: {
		position: "absolute",
		bottom: 0,
		left: 0,
		backgroundColor: "#00000085",
		color: "white",
		textAlign: "center",
		width: "100%",
		height: "100%",
		cursor: "pointer",
		opacity: 0,
		transition: "0.3s"
	},
	avatarLink: {
		opacity: '1',
		"&:hover": {
			opacity: '0.7',
			filter: 'hue-rotate(90deg)',
		},
	},
	textLink: {
		cursor: "pointer",
		"&:hover": {
			textDecoration: "underline",
		},
	}
}));
