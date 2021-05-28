import React, { useEffect, useRef, useState } from "react";
import {
    makeStyles,
    Paper,
    List,
    ListItem,
    DialogContent,
    DialogActions,
    IconButton,
    TextField,
    Box,
    Tooltip,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import { sendChat, fetchLessonChats, fetchLiveLessonChats, clearChat } from './lessonChatSlice'
import Message from "features/Chat/components/Message";
import { LESSON, LIVE_LESSON } from "commons/enums/LearnView";
import upload from 'commons/api/upload/upload'
import { makeToast } from "features/Toast/toastSlices";
import { AttachFile } from "@material-ui/icons";

export default function ChatRoom() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const messageArea = useRef();
    const [assets, setAssets] = useState([]);
    const [uploadFiles, setUploadFiles] = useState([]);
    const isFile = assets.length > 0;
    const learnView = useSelector(state => state.learnCourse.learnView)
    const lesson = useSelector(state => state.learnCourse.lesson);
    const liveLesson = useSelector(state => state.learnCourse.liveLesson);

    const token = useSelector(state => state.auth.refresh_token);
    const user = useSelector((state) => state.auth.user);
    const currentChat = useSelector(state => state.lessonChat.current)
    const { messages } = currentChat;
    const thisRoomId = currentChat.id;

    const [typingMessage, setTypingMessage] = useState("");

    const TEN_GB = 10737418240;
    const handleFileUpload = async (e) => {
        console.log(e.target.files)
        const files = e.target.files;
        if (files.length > 100) {
            dispatch(makeToast("Vượt quá số file cho phép"));
        } else {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                console.log(file)
                if (file.size > TEN_GB) {
                    dispatch(makeToast("File vượt quá 10GB"));
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
            dispatch(sendChat(
                {
                    sender_id: user.id,
                    sender: user,
                    room_id: thisRoomId,
                    content: typingMessage,
                    type: learnView,
                    lesson_id: learnView === LESSON ? lesson.id : liveLesson.id,
                    assets: assets
                }));
            setAssets([]);
            setUploadFiles([]);
            setTypingMessage("");
            console.log(messageArea);
        }
    }

    useEffect(() => {
        if (learnView === LESSON && lesson.id) {
            dispatch(fetchLessonChats(lesson.id))
        } else if (learnView === LIVE_LESSON && liveLesson.id) {
            dispatch(fetchLiveLessonChats(liveLesson.id))
        }
        return () => {
            dispatch(clearChat())
        }
    }, [token, learnView, lesson, liveLesson])

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

    return (
        <Paper className={classes.chatBoxRoot}>
            <DialogContent ref={messageArea} dividers className={classes.chatBoxContent}>
                <List className={classes.chatBackground} component="nav" aria-label="main mailbox folders">
                    {messages?.map(mess => {
                        return <ListItem>
                            <Message
                                user={mess.sender}
                                content={mess.content}
                                assets={mess.assets}
                                timestamp={mess.timestamp || mess.created_at}
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
                                >
                                    {
                                        (file.type.includes('image')) ?
                                            < img width="30px" height="30px" src={url} /> :
                                            <Tooltip title={file.name} placement="top">
                                                <Paper style={{ width: "100%", overflow: "hidden", padding: "2px" }}>
                                                    <AttachFile style={{ fontSize: 14 }} color="secondary" />
                                                </Paper>
                                            </Tooltip>
                                    }
                                </Box>
                            )
                        })
                    }
                </DialogContent>}
            <DialogActions className={classes.chatBoxAction}>
                <input
                    accept="*/*"
                    style={{ display: "none" }}
                    id={"icon-button-file-chat-room"}
                    type="file"
                    onChange={handleFileUpload}
                    multiple />
                <IconButton color="primary" size="small" style={{ margin: 0 }}>
                    <label htmlFor={"icon-button-file"}>
                        <AttachFileRoundedIcon fontSize="small" />
                    </label>
                </IconButton>
                <TextField
                    fullWidth={true}
                    variant="outlined"
                    style={{ padding: 0, marginLeft: 10 }}
                    InputProps={{
                        classes: {
                            root: classes.chatRoot,
                            input: classes.chatInput
                        }
                    }}
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
                    <SendRoundedIcon fontSize="small" onClick={sendMessage} />
                </IconButton>
            </DialogActions>
        </Paper>
    )
}
const useStyles = makeStyles((theme) => ({
    chatBoxRoot: {
        marginTop: theme.spacing(2),
        height: "fit-content",
        width: "100%",
        overflow: "hidden",
        border: "1px solid #cecece90",
        // visibility: "hidden"
    },

    chatBoxContent: {
        height: "40vh",
        padding: 0,
    },
    chatBoxAction: {
        height: "6vh",
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
    chatRoot: {
        paddingTop: "5px !important",
        paddingBottom: "5px !important",
    },
    chatInput: {
        fontSize: 14
    }
}));
