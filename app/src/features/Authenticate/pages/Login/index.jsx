import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
    Typography,
    Grid,
    makeStyles,
    Paper,
    Avatar,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@material-ui/core/";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    authFail,
    login as postLogin,
    resendVerify,
    resetPassword,
} from "../../authSlices";
import { enqueueSnackbar } from "../../../Toast/toastSlices";
import SnackButton from "../../../Toast/SnackButton";
import BackToPrevious from "../../../../commons/components/BackToPrevious";
import { headShake } from "react-animations";
import { StyleSheet, css } from "aphrodite";
import {
    // activeProgress,
    deactiveProgress,
    activeProgressWithTimeOut,
} from "../../../../commons/SliceCommon";

import SocialLoginButtonGroup from "../../components/SocialLoginButtonGroup.js";

function Login() {
    const isAuthed = useSelector((state) => state.auth.isLoggedIn);
    const wrongLogin = useSelector((state) => state.auth.error.wrongLogin);
    const wrongPass = useSelector((state) => state.auth.error.wrongPass);
    const notConfirm = useSelector((state) => state.auth.error.notConfirm);
    const tryEffort = useSelector((state) => state.auth.tryEffort);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [shakeLogin, setShakeLogin] = useState(false);
    const [shakePassword, setShakePassword] = useState(false);

    const [resetEmail, setResetEmail] = useState("");
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();
    const dispatch = useDispatch();

    const loginRef = useRef();
    const passwordRef = useRef();

    const handleChange = (e, func) => {
        func(e.target.value);
    };

    useEffect(() => {
        if (isAuthed) {
            const key = new Date().getTime() + Math.random();
            dispatch(
                enqueueSnackbar({
                    key: key,
                    message: "B???n ???? ????ng nh???p.",
                    options: {
                        key: key,
                        // preventDuplicate: true,
                        variant: "success",
                        autoHideDuration: 1000,
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "center",
                        },
                        action: (key) => <SnackButton notifyKey={key} />,
                    },
                })
            );
        }
    }, [isAuthed, dispatch]);

    useEffect(() => {
        if (wrongLogin || notConfirm !== "") {
            console.log("Shake Login");
            setShakeLogin(true);
            setTimeout(() => {
                setShakeLogin(false);
            }, 300);
            loginRef.current.focus();
        } else if (wrongPass) {
            console.log("Shake Password");
            setShakePassword(true);
            setTimeout(() => {
                setShakePassword(false);
            }, 300);
            passwordRef.current.focus();
        }
        dispatch(deactiveProgress());
    }, [wrongLogin, wrongPass, notConfirm, tryEffort]); // eslint-disable-line react-hooks/exhaustive-deps

    return isAuthed ? (
        // <Redirect to="/" />
        <BackToPrevious />
    ) : (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <div className={classes.paper}>
                    {/* <Avatar className={classes.avatar}> */}
                    <div
                        className={
                            shakeLogin || shakePassword
                                ? css(styles.headShake)
                                : ""
                        }
                        style={{ alignItems: "center" }}
                    >
                        <Avatar
                            className={classes.avatar}
                            style={{ margin: "auto" }}
                        >
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            ????ng nh???p
                        </Typography>
                    </div>
                    <form
                        className={classes.form}
                        onSubmit={(e) => {
                            e.preventDefault();
                            dispatch(activeProgressWithTimeOut(1000));
                            // setTryEffort((tryEffort) => tryEffort + 1);
                            dispatch(postLogin({ login, password }));
                        }}
                    >
                        <TextField
                            inputRef={loginRef}
                            className={shakeLogin ? css(styles.headShake) : ""}
                            error={wrongLogin || notConfirm !== ""}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email/T??n ????ng nh???p"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={login}
                            onChange={(e) => handleChange(e, setLogin)}
                            helperText={
                                notConfirm !== "" && (
                                    <p className={classes.noMargin}>
                                        B???n ch??a x??c th???c Email. Nh???n v??o{" "}
                                        <a
                                            onClick={(e) => {
                                                e.preventDefault();
                                                dispatch(
                                                    resendVerify(notConfirm)
                                                );
                                                dispatch(authFail());
                                            }}
                                            href={`${process.env.REACT_APP_BACKEND_URL}/api/resend-confirm/${notConfirm}`}
                                        >
                                            ????y
                                        </a>{" "}
                                        ????? g???i l???i.
                                    </p>
                                )
                            }
                        />
                        {/* <a href="#">here</a> */}
                        <TextField
                            inputRef={passwordRef}
                            className={
                                shakePassword ? css(styles.headShake) : ""
                            }
                            error={wrongPass}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="M???t kh???u"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => handleChange(e, setPassword)}
                        />
                        {/* <FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            ????ng nh???p
                        </Button>
                        <Grid container>
                            <Grid item xs={6} className={classes.textLeft}>
                                <Link
                                    to="#"
                                    variant="body2"
                                    onClick={handleClickOpen}
                                >
                                    Qu??n m???t kh???u
                                </Link>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="form-dialog-title"
                                >
                                    <DialogTitle id="form-dialog-title">
                                        Qu??n m???t kh???u
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Nh???p email ho???c username c???a b???n,
                                            ch??ng t??i s??? g???i email reset m???t
                                            kh???u cho b???n.
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Email ho???c Username"
                                            type="email"
                                            fullWidth
                                            onChange={(e) => {
                                                setResetEmail(e.target.value);
                                            }}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            onClick={handleClose}
                                            color="primary"
                                        >
                                            Tho??t
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                dispatch(
                                                    resetPassword({
                                                        email: resetEmail,
                                                    })
                                                );
                                                handleClose();
                                            }}
                                            color="primary"
                                        >
                                            G???i
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                            <Grid item xs={6} className={classes.textRight}>
                                <Link to={`register`}>
                                    Nh???n v??o ????y ????? ????ng k??
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <p>Ho???c ????ng nh???p v???i</p>
                        <Grid
                            item
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <SocialLoginButtonGroup />
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
}

const styles = StyleSheet.create({
    headShake: {
        animationName: headShake,
        animationDuration: "1s",
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    image: {
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textLeft: {
        textAlign: "left",
    },
    textRight: {
        textAlign: "right",
    },
    noMargin: {
        margin: 0,
    },
    whiteButton: {
        color: "white",
    },
    shake: {
        animationName: headShake,
        animationDuration: "1s",
    },
}));

export default Login;
