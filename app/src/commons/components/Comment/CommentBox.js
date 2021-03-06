import React, { useEffect, useState } from 'react';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import {
    Grid,
    IconButton,
    makeStyles,
    TextField
} from '@material-ui/core';

export default function CommentBox({ content = null, sendComment }) {
    const classes = useStyles();
    const [typingMessage, setTypingMessage] = useState("");
    useEffect(() => {
        if (content) setTypingMessage(content);
    }, [content])
    return (
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
                rows={3}
                value={typingMessage}
                onChange={(e) => setTypingMessage(e.target.value)}
            />
            <IconButton color="primary">
                <SendRoundedIcon onClick={() => {
                    sendComment(typingMessage);
                    setTypingMessage("");
                }} />
            </IconButton>
        </Grid>
    )
}
const useStyles = makeStyles((theme) => ({
    chatAction: {
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "black 1px 1px 6px -3px",
        marginLeft: 0,
        padding: theme.spacing(1)
    }
}));
