import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Grid, makeStyles, Typography, IconButton, Divider, useMediaQuery, FormControlLabel, Checkbox, TextField } from '@material-ui/core'
import BreadCrumbs from 'commons/components/BreadCrumbs'
import { useDispatch, useSelector } from 'react-redux'
import { detachSocial, fetchMyData, setNewInfo, updateMyData } from 'features/Info/infoSlice'
import ConfirmIconButton from "commons/components/Button/ConfirmIconButton";
import uploadApi from "commons/api/upload/upload";
import { UserRole } from 'features/Authenticate/constance'
import {  Close, Edit } from '@material-ui/icons'
import SocialLoginButtonGroup from 'features/Authenticate/components/SocialLoginButtonGroup'
import CKViewer from 'commons/components/CKEditor/CKViewer'
import CKEditor from 'commons/components/CKEditor/CKEditor'
import { resetPassword } from 'features/Authenticate/authSlices'

export default function PersonalInfo() {
    const classes = useStyles();
    const user = useSelector(state => state.info.myInfo);
    const newInfo = useSelector(state => state.info.newInfo);
    const dispatch = useDispatch();
    const isMobile = useMediaQuery("(max-width: 760px)");
    const [isEdit, setIsEdit] = useState({ introduce: false });
    const saveInfo = () => {
        dispatch(updateMyData(newInfo));
        setIsEdit({
            introduce: false,
        })
    }

    const handleFileUpload = async (e) => {
        const files = e.target.files;
        const resp = await uploadApi.upload({
            file: files[files.length - 1],
        });
        if (resp.uploaded === true)
            dispatch(setNewInfo({ ...newInfo, avatar_url: resp.url }));
    }
    const changeIntroduce = (introduce) => {
        dispatch(setNewInfo({ ...newInfo, introduce: introduce }));
    }

    const handleChangeSettings = (e) => {
        dispatch(setNewInfo({ ...newInfo, settings: { ...newInfo.settings, [e.target.name]: e.target.checked } }));
    }
    useEffect(() => {
        dispatch(fetchMyData())
    }, [dispatch])
    return (
        <Box mt={2}>
            <BreadCrumbs current="Th??ng tin c?? nh??n">
                <Button variant="contained" color="primary" onClick={saveInfo}>
                    L??u th??ng tin
                </Button>
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
                                        Thay ???nh
                                </Button>
                                </label>
                            </div>
                            <Box mb={3}>
                                <Grid container direction="column" justify="center">
                                    <Typography variant="h5" color="initial">{user.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">{`@${user.username}${user.role === UserRole.INSTRUCTOR ? "(Gi???ng vi??n)" : ""}`}</Typography>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid container spacing={1} direction="column" className={classes.space}>
                            <Typography style={{ marginBottom: 15 }} align="left" color="textSecondary" variant="h6">
                                C??i ?????t
                                </Typography>
                            {
                                user.role === UserRole.STUDENT ? (
                                    <Grid container spacing={1} direction="column">
                                        <FormControlLabel classes={{ label: classes.checkBoxLabel }}
                                            control={<Checkbox checked={newInfo.settings ? newInfo.settings.receive_course_change : 0} onChange={handleChangeSettings} name="receive_course_change" />}
                                            label="Nh???n th??ng b??o thay ?????i kh??a h???c"
                                        />
                                        <FormControlLabel classes={{ label: classes.checkBoxLabel }}
                                            control={<Checkbox checked={newInfo.settings ? newInfo.settings.receive_flower_new_course : 0} onChange={handleChangeSettings} name="receive_flower_new_course" />}
                                            label="Nh???n th??ng b??o t??? gi???ng vi??n follow"
                                        />
                                        <FormControlLabel classes={{ label: classes.checkBoxLabel }}
                                            control={<Checkbox checked={newInfo.settings ? newInfo.settings.receive_notification : 0} onChange={handleChangeSettings} name="receive_notification" />}
                                            label="Nh???n th??ng b??o qua email"
                                        />
                                        <TextField
                                            label="Mail nh???n th??ng b??o"
                                            value={user.settings.receive_email}
                                        //   onChange={}
                                        />
                                    </Grid>
                                ) : user.role === UserRole.INSTRUCTOR && (
                                    <Grid container spacing={1} direction="column">
                                        <FormControlLabel classes={{ label: classes.checkBoxLabel }}
                                            control={<Checkbox checked={newInfo.settings ? newInfo.settings.receive_bought_notification : 0} onChange={handleChangeSettings} name="receive_bought_notification" />}
                                            label="Nh???n th??ng b??o mua kh??a h???c"
                                        />
                                        <FormControlLabel classes={{ label: classes.checkBoxLabel }}
                                            control={<Checkbox checked={newInfo.settings ? newInfo.settings.receive_report : 0} onChange={handleChangeSettings} name="receive_report" />}
                                            label="Nh???n th??ng tin report qua email"
                                        />
                                        <TextField
                                            label="Mail nh???n th??ng b??o"
                                            value={user.settings.receive_email}
                                        //   onChange={}
                                        />
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Grid>
                    <Grid direction="column" container item xs={12} md={7}>
                        <Grid direction="column" container spacing={0} item xs={12} style={{ flexBasis: "0" }} className={classes.space}>
                            <Grid container spacing={0} item xs={12} alignItems="center">
                                <Typography style={{ marginRight: 10 }} align="left" alignItems="center" color="textSecondary" variant="h6">
                                    Gi???i thi???u
                                </Typography>
                                <IconButton size="small" onClick={() => setIsEdit({ ...isEdit, introduce: !isEdit.introduce })}>
                                    <Edit fontSize="small" />
                                </IconButton>
                            </Grid>
                            {
                                isEdit.introduce
                                    ? <CKEditor content={newInfo.introduce || user.introduce} handler={changeIntroduce} />
                                    : <CKViewer content={user.introduce} />
                            }
                        </Grid>
                        <Grid direction="column" container spacing={0} item xs={12} style={{ flexBasis: "0" }} className={classes.space}>
                            <Typography style={{ marginBottom: 15 }} align="left" color="textSecondary" variant="h6">
                                T??i kho???n x?? h???i
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
                                                    <Grid item xs={3}>
                                                        <Typography align="left">
                                                            {account.social_name}
                                                        </Typography>
                                                    </Grid>
                                                }
                                                <Grid item xs={8} md={6}>
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
                                                        title={"X??a c??u h???i"}
                                                        message={"B???n th???c s??? mu???n h???y li??n k???t?"}
                                                        size="small"
                                                    >
                                                        <Close fontSize="inherit" />
                                                    </ConfirmIconButton>
                                                </Grid>
                                            </Grid>
                                            <Divider />
                                        </Grid>
                                    )
                                })
                            }
                            <Typography style={{ marginTop: 15 }} align="left" color="textSecondary" variant="body2">
                                Th??m t??i kho???n
                            </Typography>
                            <Grid item xs={12} justify="flex-start" style={{ transform: "scale(0.8)" }}>
                                <SocialLoginButtonGroup isPersist={true} />
                            </Grid>
                            <Typography style={{ marginBottom: 15, marginTop: 20 }} align="left" color="textSecondary" variant="h6">
                                B???o m???t
                                </Typography>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => {
                                    dispatch(
                                        resetPassword({
                                            email: user.email,
                                        })
                                    );
                                }}
                            >
                                Thay ?????i m???t kh???u
                            </Button>
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