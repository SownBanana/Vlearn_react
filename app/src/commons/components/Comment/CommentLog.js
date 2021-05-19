import { Grid, List, ListItem, makeStyles } from '@material-ui/core'
import { Message } from '@material-ui/icons'
import React from 'react'

export default function CommentLog({ messageArea, user, comments }) {
    const classes = useStyles();
    return (
        <Grid ref={messageArea} item md={12} className={classes.commentSpace}>
            <List className={classes.chatBackground} component="nav" aria-label="main mailbox folders">
                {comments.map(comment => {
                    return <ListItem button>
                        <Message
                            style={{ marginTop: 10 }}
                            user={user}
                            content={comment.content}
                            files={comment.file}
                            timestamp={comment.timestamp}
                        />
                    </ListItem>
                })}
            </List>
        </Grid>
    )
}
const useStyles = makeStyles((theme) => ({
    chatBackground: {
        // backgroundColor: "aliceblue",
    },
    commentSpace: {
        backgroundColor: "white",
        borderRadius: "2px",
        boxShadow: "black 1px 1px 6px -3px",
        overflowY: "auto",
        minHeight: "10vh",
        maxHeight: "66vh",
        marginBottom: theme.spacing(0)
    },
}));
