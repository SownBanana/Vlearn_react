import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Avatar, Box, makeStyles, Paper, Tooltip } from '@material-ui/core'
import { useSelector } from 'react-redux';
import moment from 'moment'
import 'moment/locale/vi'  // without this line it didn't work
import { AttachFile } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

function Message({
    user, content, assets, timestamp, isLargeScreen = false
}) {
    const HOUR = 3600000;
    const DAY = 86400000;
    const classes = useStyles();
    const id = useSelector(state => state.auth.user.id);
    const isMe = user === null || user.id === id;
    const history = useHistory()
    const goToInfoPage = () => {
        history.push(`/info/${user.username}`)
    }
    // console.log("Message: ", content);
    if (typeof timestamp === "string") {
        timestamp = new Date(timestamp) / 1000
    }
    const getURL = (text) => {
        if (text) {
            var urlRegex = /((http:\/\/|https:\/\/|ftp:\/\/|)(www.|)[a-zA-Z0-9]+(\.[a-zA-Z]+)+[^ ]+)/g;
            return text.replace(urlRegex, function (url) {
                var hrefUrl = url;
                if (!(url.substring(0, 4) === 'http' || url.substring(0, 3) === 'ftp')) {
                    hrefUrl = 'https://' + url
                }
                return '<a href="' + hrefUrl + '" target="_blank" rel="noreferrer">' + url + '</a>';
            })
        }
        return null;
    }
    const timePast = moment(Date.now()).diff(moment(timestamp * 1000));
    // console.log("Time past: ", timePast)
    const timeString =
        (timePast < 60000) ?
            "vừa xong" :
            (timePast < HOUR) ?
                Math.floor(moment.duration(timePast).asMinutes()) + " phút trước" :
                (timePast < DAY) ?
                    moment(timestamp * 1000).format("HH:mm") :
                    moment(timestamp * 1000).format("DD MMMM HH:mm")
    return !isMe ? (
        <Grid
            container
            spacing={0}
            direction="row"
            justify="flex-start"
            className={classes.body}
            wrap="nowrap"
        >
            <Tooltip title={`${user.name} @${user.username}`} placement="top">
                <Avatar alt={user.name} src={user.avatar_url} className={classes.smallAvatar} onClick={goToInfoPage} />
            </Tooltip>
            <Paper style={{ maxWidth: isLargeScreen ? "65%" : "unset" }} className={classes.message} elevation={3}>
                <div className={classes.timestamp}>
                    {timeString}
                </div>
                <Box display="flex" flexDirection="column" alignItems="flex-start">
                    {
                        assets &&
                        assets.map(asset => {
                            if (asset.type) {
                                if (asset.type.includes('image')) {
                                    return (
                                        <img style={{ maxWidth: "100%", marginBottom: 10 }} src={asset.url} />
                                    )
                                } else if (asset.type.includes('video')) {
                                    return (
                                        <video style={{ maxWidth: "100%", marginBottom: 10 }} controls>
                                            <source src={asset.url} type={asset.type} />
                                        </video>
                                    )
                                } else {
                                    return (
                                        <Tooltip title={asset.name} placement="top">
                                            <a href={asset.url} target="_blank" rel="noreferrer" >
                                                <Paper onClick={e => console.log(asset.url)} style={{ overflow: "hidden", padding: "5px", marginBottom: 10 }}>
                                                    <AttachFile fontSize="small" color="secondary" />
                                                </Paper>
                                            </a>
                                        </Tooltip>
                                    )
                                }
                            }
                            else {
                                return (
                                    <Tooltip title={asset.name} placement="top">
                                        <a href={asset.url} target="_blank" rel="noreferrer">
                                            <Paper style={{ width: "100%", overflow: "hidden", padding: "5px", marginBottom: 10 }}>
                                                <AttachFile fontSize="small" color="secondary" />
                                            </Paper>
                                        </a>
                                    </Tooltip>
                                )
                            }
                        })
                    }
                </Box>
                <div dangerouslySetInnerHTML={{ __html: getURL(content) }}>
                </div>
            </Paper>
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
                    <div style={{ textAlign: "right" }} className={classes.timestamp}>
                        {timeString}
                    </div>
                    <Box display="flex" flexDirection="column" alignItems="flex-end">
                        {
                            assets &&
                            assets.map(asset => {
                                if (asset.type) {
                                    if (asset.type.includes('image')) {
                                        return (
                                            <img style={{ maxWidth: "100%", marginBottom: 10 }} src={asset.url} />
                                        )
                                    } else if (asset.type.includes('video')) {
                                        return (
                                            <video style={{ maxWidth: "100%", marginBottom: 10 }} controls>
                                                <source src={asset.url} type={asset.type} />
                                            </video>
                                        )
                                    } else {
                                        return (
                                            <Tooltip title={asset.name} placement="top">
                                                <a href={asset.url} target="_blank" rel="noreferrer">
                                                    <Paper onClick={e => console.log(asset.url)} style={{ overflow: "hidden", padding: "5px", marginBottom: 10 }}>
                                                        <AttachFile fontSize="small" color="secondary" />
                                                    </Paper>
                                                </a>
                                            </Tooltip>
                                        )
                                    }
                                }
                                else {
                                    return (
                                        <Tooltip title={asset.name} placement="top">
                                            <a href={asset.url} target="_blank" rel="noreferrer">
                                                <Paper style={{ width: "100%", overflow: "hidden", padding: "5px", marginBottom: 10 }}>
                                                    <AttachFile fontSize="small" color="secondary" />
                                                </Paper>
                                            </a>
                                        </Tooltip>
                                    )
                                }
                            })
                        }
                    </Box>
                    <div style={{ textAlign: "right" }} dangerouslySetInnerHTML={{ __html: getURL(content) }}>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    )
}


const useStyles = makeStyles((theme) => ({
    body: {
        width: "100%"
    },
    smallAvatar: {
        cursor: "pointer",
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginRight: "5px",
        transition: "0.4s",
        "&:hover": {
            opacity: '0.8',
            borderRadius: "35%",
            transition: "0.25s",
        },
    },
    message: {
        width: "fit-content",
        padding: "3px 5px",
        fontSize: "0.9rem",
        whiteSpace: "pre-wrap",
        overflowWrap: "anywhere"
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