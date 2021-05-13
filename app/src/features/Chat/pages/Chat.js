import { Avatar, Box, Grid, IconButton, List, ListItem, makeStyles, TextField, useMediaQuery, Typography } from '@material-ui/core'
import BreadCrumbs from 'commons/components/BreadCrumbs'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import usePusher from "commons/PusherCommon";
import { sendChat, appendMessage, setCurrent, fetchChats } from 'features/Chat/chatSlice'
import Message from '../components/Message';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

export default function Chat() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const id = useSelector((state) => state.auth.user.id);
    const currentChat = useSelector(state => state.chat.current)
    const { users, messages } = currentChat;
    const thisRoomId = currentChat.id;
    const user = users.length === 0 ? {} : users[0].id !== id ? users[0] : users[1];
    const chats = useSelector(state => state.chat.chats);

    const isMobile = useMediaQuery("(max-width: 760px)");

    const [typingMessage, setTypingMessage] = useState("");
    const sendMessage = () => {
        if (typingMessage) {
            dispatch(sendChat({ sender_id: id, id: user.id, room_id: thisRoomId, content: typingMessage }));
            setTypingMessage("");
            console.log(messageArea);
        }
    }

    const openChat = (id) => {
        dispatch(setCurrent(id))
    }
    useEffect(() => {
        if (!chats) dispatch(fetchChats())
    }, [])
    const messageArea = useRef();
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
        <Box mt={2}>
            <BreadCrumbs current="Tin nhắn">
            </BreadCrumbs>
            <Box mx={2}>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="space-evenly"
                >
                    <Grid container item md={4} direction="column" justify="flex-start" className={classes.userList}>
                        {!isMobile && (
                            Object.keys(chats).map(key => {
                                const chat = chats[key];
                                const chatUser = chat.users[0].id !== id ? chat.users[0] : chat.users[1];
                                return (
                                    <ListItem onClick={() => openChat(key)} button>
                                        <Avatar alt={chatUser.name} src={chatUser.avatar_url} style={{ marginRight: 10 }} />
                                        <Typography variant="body1" color="initial">{chatUser.name}</Typography>
                                    </ListItem>
                                )
                            })
                        )}
                    </Grid>
                    <Grid direction="column" container item md={7} className={classes.chatSpace}>
                        <Grid ref={messageArea} item md={12} className={classes.messageSpace}>
                            <List className={classes.chatBackground} component="nav" aria-label="main mailbox folders">
                                {messages.map(mess => {
                                    return <ListItem button>
                                        <Message user={mess.sender_id !== id ? user : null}
                                            content={mess.content}
                                            files={mess.file}
                                            timestamp={mess.timestamp}
                                        />
                                    </ListItem>
                                })}
                            </List>
                        </Grid>
                        <Grid container direction="row" wrap="nowrap" alignItems="center"
                            alignContent="center" item md={12} spacing={2} className={classes.chatAction}>
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
                            <IconButton color="primary">
                                <SendRoundedIcon onClick={sendMessage} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}


const useStyles = makeStyles((theme) => ({
    chatBackground: {
        // backgroundColor: "aliceblue",
    },
    userList: {
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "black 1px 1px 6px -3px"
    },
    chatSpace: {
        // height: "70vh"
    },
    messageSpace: {
        backgroundColor: "aliceblue",
        borderRadius: "10px",
        boxShadow: "black 1px 1px 6px -3px",
        overflowY: "scroll",
        minHeight: "66vh",
        maxHeight: "66vh",
        marginBottom: theme.spacing(3)
    },
    chatAction: {
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "black 1px 1px 6px -3px",
        marginLeft: 0
    }
}));
