import React, { useEffect } from 'react'
import { Avatar, Box, Button, Grid, makeStyles, Typography, IconButton, Divider } from '@material-ui/core'
import BreadCrumbs from 'commons/components/BreadCrumbs'
import { useDispatch, useSelector } from 'react-redux'
import { detachSocial, fetchMyData, setNewInfo, updateMyData } from 'features/Info/infoSlice'
import ConfirmIconButton from "commons/components/Button/ConfirmIconButton";
import uploadApi from "commons/api/upload/upload";
import { UserRole } from 'features/Authenticate/constance'
import { Add, Close } from '@material-ui/icons'
import SocialLoginButtonGroup from 'features/Authenticate/components/SocialLoginButtonGroup'

export default function PersonalInfo() {
    const classes = useStyles();
    const user = useSelector(state => state.info.myInfo);
    const newInfo = useSelector(state => state.info.newInfo);
    const dispatch = useDispatch();

    const saveInfo = () => {
        dispatch(updateMyData(newInfo));
    }

    const handleFileUpload = async (e) => {
        const files = e.target.files;
        const resp = await uploadApi.upload({
            file: files[files.length - 1],
        });
        if (resp.uploaded === true)
            dispatch(setNewInfo({ ...newInfo, avatar_url: resp.url }));
    }
    useEffect(() => {
        dispatch(fetchMyData())
    }, [dispatch])
    return (
        <Box mt={2}>
            <BreadCrumbs current="Thông tin cá nhân">
                <Button variant="contained" color="primary" onClick={saveInfo}>
                    Lưu thông tin
                </Button>
            </BreadCrumbs>
            <Box mx={2}>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="space-evenly"
                >
                    <Grid container item md={4} direction="column" justify="flex-start" className={classes.space}>
                        <Grid container spacing={1} direction="column" alignItems="center">
                            <div className={classes.avatarContainer}>
                                {
                                    newInfo.avatar_url ? (
                                        <Avatar className={classes.loadedImage} src={newInfo.avatar_url} alt={user.name} />
                                    ) : user.avatar_url ? (
                                        <Avatar className={classes.loadedImage} src={user.avatar_url} alt={user.username} />
                                    ) : (<Avatar alt={user.name} />)
                                }
                                <input
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    id="contained-button-file"
                                    type="file"
                                    onChange={handleFileUpload}
                                />
                                <label htmlFor="contained-button-file" className={classes.hiddenButton}>
                                    <Button color="primary" component="span">
                                        Thay ảnh
                                </Button>
                                </label>
                            </div>
                            <Box mb={3}>
                                <Grid container direction="column" justify="center">
                                    <Typography variant="h5" color="initial">{user.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">{`@${user.username}${user.role === UserRole.INSTRUCTOR ? "(Giảng viên)" : ""}`}</Typography>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid direction="column" container item xs={12} md={7} className={classes.space}>
                        <Grid direction="column" container spacing={0} item xs={12} style={{ flexBasis: "0" }}>
                            <Grid container spacing={1} item xs={12} >
                                <Typography align="left" color="textSecondary" variant="h6">
                                    Tài khoản xã hội
                                    <IconButton onClick={(e) => console.log("Add social")}>
                                        <Add fontSize="small" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                            {
                                user.social_accounts && user.social_accounts.map((account) => {
                                    return (
                                        <Grid item xs={12}>

                                            <Grid item xs={12} container direction="row" alignItems="center" spacing={2} style={{ padding: 10 }}>
                                                <Grid item xs={2}>
                                                    <Typography align="left">
                                                        {account.social_provider}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography align="left">
                                                        {account.social_name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography align="left">
                                                        {account.social_email}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <ConfirmIconButton
                                                        onClick={() => {
                                                            dispatch(detachSocial({
                                                                social_id: account.id
                                                            }))
                                                        }}
                                                        edge="start"
                                                        className="button"
                                                        title={"Xóa câu hỏi"}
                                                        message={"Bạn thực sự muốn hủy liên kết?"}
                                                    >
                                                        <Close />
                                                    </ConfirmIconButton>
                                                </Grid>
                                            </Grid>
                                            <Divider />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                        <Typography align="left" color="textSecondary" variant="body2">
                            Thêm tài khoản
                        </Typography>
                        <Grid item xs={12} justify="flex-start" style={{ transform: "scale(0.8)" }}>
                            <SocialLoginButtonGroup isPersist={true} />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
const useStyles = makeStyles((theme) => ({
    space: {
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "black 1px 1px 6px -3px",
        marginBottom: theme.spacing(2),
        padding: "20px !important"
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
    }
}));