import React from 'react'
import { useHistory } from 'react-router-dom';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Avatar,
    makeStyles,
    Tooltip,
    IconButton
} from '@material-ui/core'
import ChatIcon from '@material-ui/icons/ModeCommentOutlined';
import { chatWithUser } from 'features/Chat/chatSlice'
import { useDispatch } from 'react-redux';

export default function UserItem({ user }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory()
    const goToInfoPage = () => {
        history.push(`/info/${user.username}`)
    }
    return (
        <Paper>
            <Box px={2} py={1}>
                <Grid container>
                    <Grid xs={3}>
                        <Avatar
                            className={classes.avatar}
                            src={user.avatar_url}
                            alt={user.username}
                            onClick={goToInfoPage} />
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        spacing={1}
                        item
                        xs={7}
                    >
                        <Typography
                            align="left"
                            variant="subtitle1"
                            color="initial"
                            onClick={goToInfoPage}
                            className={classes.textLink}
                            style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '100%',
                                whiteSpace: 'nowrap',
                            }}
                        >{user.name}</Typography>
                        <Typography
                            align="left"
                            variant="subtitle2"
                            color="textSecondary"
                            style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '100%',
                                whiteSpace: 'nowrap',
                            }}
                        >@{user.username}</Typography>
                    </Grid>
                    <Grid xs={2}>
                        <Tooltip Tooltip title="Nhắn tin" placement="top">
                            <IconButton onClick={(e) => dispatch(chatWithUser(user.id))}>
                                <ChatIcon color="action" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
        </Paper >
    )
}

const useStyles = makeStyles((theme) => ({
    avatar: {
        cursor: "pointer",
        transition: "0.4s",
        "&:hover": {
            opacity: '0.8',
            borderRadius: "30%",
            transition: "0.25s",
        },
    },
    textLink: {
        fontWeight: 'bold',
        color: '#6b6b6b',
        cursor: "pointer",
        transition: "0.25s",
        "&:hover": {
            transition: "0.25s",
            textDecoration: "underline",
            color: "blue",
        },
    }
}))