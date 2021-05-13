import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Avatar, makeStyles, Paper, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux';
import moment from 'moment'
import 'moment/locale/vi'  // without this line it didn't work

function Message({
    user, content, files, timestamp
}) {
    const HOUR = 3600000;
    const DAY = 86400000;
    const classes = useStyles();
    const id = useSelector(state => state.auth.user.id);
    const isMe = user === null || user.id === id;
    // console.log("Message: ", content);
    const timePast = moment(Date.now()).diff(moment(timestamp * 1000));
    console.log("Time past: ", timePast)
    const timeString =
        (timePast < 60000) ?
            "vừa xong" :
            (timePast < HOUR) ?
                moment(timePast).format("m ") + "phút trước" :
                (timePast < DAY) ?
                    moment(timePast).format("HH ") + "giờ trước" :
                    moment(timestamp * 1000).format("DD MMMM MM:mm")
    return !isMe ? (
        <Grid
            container
            spacing={0}
            direction="row"
            justify="flex-start"
            className={classes.body}
            wrap="nowrap"
        >
            <Grid item md={2}>
                <Avatar alt={user.name} src={user.avatar_url} className={classes.smallAvatar} />
            </Grid>
            <Grid item md={9}>
                <Paper className={classes.message} elevation={3}>
                    <div className={classes.timestamp}>
                        {timeString}
                    </div>
                    <div>
                        {content}
                    </div>
                </Paper>
            </Grid>
        </Grid>
    ) : (
        <Grid
            container
            spacing={0}
            direction="row"
            justify="flex-end"
            className={classes.body}
            wrap="nowrap"
        >
            <Grid item md={9} className={classes.myMessageBounder}>
                <Paper className={classes.message} elevation={3}>
                    <div className={classes.timestamp}>
                        {timeString}
                    </div>
                    <div>
                        {content}
                    </div></Paper>
            </Grid>
        </Grid>
    )
}


const useStyles = makeStyles((theme) => ({
    body: {
        width: "100%"
    },
    smallAvatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginRight: "5px"
    },
    message: {
        width: "fit-content",
        padding: "3px 5px",
        fontSize: "0.9rem",
        whiteSpace: "pre-wrap",
    },
    myMessageBounder: {
        display: "flex",
        justifyContent: "flex-end",
    },
    timestamp: {
        fontSize: "12px",
        color: "gray"
    }
}))

export default Message;