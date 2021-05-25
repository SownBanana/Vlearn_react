import React, { useEffect } from 'react'
import { Avatar, Box, Grid, makeStyles, Typography, IconButton, Divider, useMediaQuery, FormControlLabel, Checkbox, TextField, Tooltip } from '@material-ui/core'
import BreadCrumbs from 'commons/components/BreadCrumbs'
import { useDispatch, useSelector } from 'react-redux'
import { UserRole } from 'features/Authenticate/constance'
import CKViewer from 'commons/components/CKEditor/CKViewer'
import { useHistory, useParams } from 'react-router';
import { getUser } from 'features/Info/infoSlice';
import useCheckMobile from 'commons/hooks/useCheckMobile'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ChatIcon from '@material-ui/icons/Chat';
import { chatWithUser } from 'features/Chat/chatSlice'

export default function Info() {
    const classes = useStyles();
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.info.user);
    const me = useSelector(state => state.auth.user);
    const isMobile = useCheckMobile();
    const history = useHistory();
    useEffect(() => {
        if (id == me.id || id == me.username) {
            history.push('/info');
        } else {
            dispatch(getUser(id));
        }
    }, [id, dispatch])

    return (
        <Box mt={2}>
            <BreadCrumbs current="Thông tin cá nhân">
            </BreadCrumbs>
            <Box mx={2}>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    justify="space-evenly"
                >
                    <Grid container item xs={12} md={4} direction="column" justify="flex-start" >
                        <Grid container spacing={1} direction="column" alignItems="center" className={classes.space}>
                            <div className={classes.avatarContainer}>
                                <Avatar className={classes.loadedImage} src={user.avatar_url} alt={user.username} />
                            </div>
                            <Box mb={3}>
                                <Grid container direction="column" justify="center">
                                    <Typography variant="h5" color="initial">{user.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">{`@${user.username}${user.role === UserRole.INSTRUCTOR ? "(Giảng viên)" : ""}`}</Typography>
                                </Grid>
                            </Box>
                            <Box>
                                {
                                    user.role === UserRole.INSTRUCTOR &&
                                    <Tooltip Tooltip title="Theo dõi" placement="top">
                                        <IconButton>
                                            <GroupAddIcon color="action" />
                                        </IconButton>
                                    </Tooltip>
                                }
                                <Tooltip Tooltip title="Nhắn tin" placement="top">
                                    <IconButton onClick={(e) => dispatch(chatWithUser(user.id))}>
                                        <ChatIcon color="action" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Grid>
                        <Grid direction="column" container spacing={0} item xs={12} style={{ flexBasis: "0" }} className={classes.space}>
                            <Typography style={{ marginBottom: 15 }} align="left" color="textSecondary" variant="h6">
                                Tài khoản xã hội
                                </Typography>
                            {
                                user.social_accounts && user.social_accounts.map((account) => {
                                    return (
                                        <Grid item xs={12}>
                                            <Grid item xs={12} container direction="row" alignItems="center" spacing={1}>
                                                <Grid item xs={3} md={2}>
                                                    <img src={`/${account.social_provider}.svg`} style={{ width: 28, height: 28 }} alt={account.social_provider} />
                                                </Grid>
                                                {
                                                    !isMobile &&
                                                    <Grid item xs={3} >
                                                        <Typography align="left" variant="subtitle2">
                                                            {account.social_name}
                                                        </Typography>
                                                    </Grid>
                                                }
                                                <Grid item xs={6} md={5}>
                                                    <Typography align="left" variant="subtitle2">
                                                        {account.social_email}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Divider />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                    <Grid direction="column" container item xs={12} md={7}>
                        <Grid direction="column" container spacing={0} item xs={12} style={{ flexBasis: "0" }} className={classes.space}>
                            <Grid container spacing={0} item xs={12} alignItems="center">
                                <Typography style={{ marginRight: 10 }} align="left" alignItems="center" color="textSecondary" variant="h6">
                                    Giới thiệu
                                </Typography>
                            </Grid>
                            <CKViewer content={user.introduce} />
                        </Grid>

                    </Grid>
                </Grid>
            </Box>
        </Box >
    )
}
const useStyles = makeStyles((theme) => ({
    space: {
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "black 1px 1px 6px -3px",
        marginBottom: theme.spacing(2),
        padding: "15px 20px !important"
    },
    imageContainer: {
        width: "100%",
        marginBottom: "5px",
    },
    loadedImage: {
        width: "86px",
        height: "86px",
        margin: "auto",
    },
    avatarContainer: {
        width: "86px",
        height: "86px",
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
        "&:hover $hiddenButton": {
            opacity: 1,
        }
    },
    hiddenButton: {
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "#ffffff85",
        opacity: 0,
        transition: "0.3s"
    },
    checkBoxLabel: {
        fontSize: 13,

    }
}));