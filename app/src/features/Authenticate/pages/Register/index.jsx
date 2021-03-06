import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
    Typography,
    Grid,
    makeStyles,
    Avatar,
    TextField,
    Button,
    Container,
    Collapse,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core/";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register as reg } from "../../authSlices";
import { useForm } from "react-hook-form";
import globalStyles from "../../../../style/GlobalStyles";
import { useState } from "react";
import checkPassword from "../../components/CheckPassword";
import SocialLoginButtonGroup from "../../components/SocialLoginButtonGroup";
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
}));

export default function Register() {
    const dispatch = useDispatch();
    globalStyles();
    const classes = useStyles();
    const [role, setRole] = useState(3);
    const { register, handleSubmit, errors, getValues } = useForm();
    const onSubmit = ({ name, username, email, password }) => {
        dispatch(reg({ name, username, email, password, role }));
    };
    const [passwordErrorCheck, setPasswordErrorCheck] = useState({
        spe: false,
        cap: false,
        nor: false,
        num: false,
        timeOut: 0,
    });
    var timer = 0;
    const checkErrorOnType = (password) => {
        // console.log(timer);
        clearTimeout(timer);
        timer = setTimeout(() => {
            checkPassword(password, setPasswordErrorCheck);
        }, 100);
    };
    const checkErrorPassword = (password) => {
        return checkPassword(password, setPasswordErrorCheck);
    };

    return (
        <Container component="main" maxWidth="sm">
            <Grid container>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        ????ng k?? t??i kho???n
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    variant="outlined"
                                    fullWidth
                                    id="name"
                                    label="H??? t??n"
                                    autoFocus
                                    inputRef={register({ required: true })}
                                    error={"name" in errors}
                                />
                                <Collapse in={"name" in errors}>
                                    <div className="errorHelperText">
                                        Nh???p t??n c???a b???n
                                    </div>
                                </Collapse>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="username"
                                    label="T??n t??i kho???n"
                                    name="username"
                                    autoComplete="username"
                                    inputRef={register({ required: true })}
                                    error={"username" in errors}
                                />
                                <Collapse in={"username" in errors}>
                                    <div className="errorHelperText">
                                        Nh???p t??n t??i kho???n c???a b???n
                                    </div>
                                </Collapse>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="email"
                                    label="?????a ch??? Email"
                                    name="email"
                                    autoComplete="email"
                                    inputRef={register({
                                        required: true,
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        },
                                    })}
                                    error={"email" in errors}
                                />
                                <Collapse
                                    in={
                                        "email" in errors &&
                                        errors.email.type === "required"
                                    }
                                >
                                    <div className="errorHelperText">
                                        Nh???p ?????a ch??? email c???a b???n
                                    </div>
                                </Collapse>
                                <Collapse
                                    in={
                                        "email" in errors &&
                                        errors.email.type === "pattern"
                                    }
                                >
                                    <div className="errorHelperText">
                                        ?????a ch??? email kh??ng h???p l???
                                    </div>
                                </Collapse>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="password"
                                    label="M???t kh???u"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => {
                                        checkErrorOnType(e.target.value);
                                    }}
                                    inputRef={register({
                                        required: true,
                                        minLength: 6,
                                        validate: checkErrorPassword,
                                    })}
                                    error={"password" in errors}
                                />
                                <Collapse
                                    in={
                                        "password" in errors &&
                                        errors.password.type === "required"
                                    }
                                >
                                    <div className="errorHelperText">
                                        Nh???p ?????a m???t kh???u c???a b???n
                                    </div>
                                </Collapse>
                                <Collapse
                                    in={
                                        "password" in errors &&
                                        errors.password.type === "minLength"
                                    }
                                >
                                    <div className="errorHelperText">
                                        M???t kh???u c???a b???n qu?? ng???n
                                    </div>
                                </Collapse>
                                <Collapse in={passwordErrorCheck.spe}>
                                    <div className="errorHelperText">
                                        M???t kh???u c???a b???n c???n ch???a ??t nh???t 1 k??
                                        t??? ?????c bi???t
                                    </div>
                                </Collapse>
                                <Collapse in={passwordErrorCheck.cap}>
                                    <div className="errorHelperText">
                                        M???t kh???u c???a b???n c???n ch???a ??t nh???t 1 k??
                                        t??? in hoa
                                    </div>
                                </Collapse>
                                <Collapse in={passwordErrorCheck.nor}>
                                    <div className="errorHelperText">
                                        M???t kh???u c???a b???n c???n ch???a ??t nh???t 1 k??
                                        t??? th?????ng
                                    </div>
                                </Collapse>
                                <Collapse in={passwordErrorCheck.num}>
                                    <div className="errorHelperText">
                                        M???t kh???u c???a b???n c???n ch???a ??t nh???t 1 s???
                                    </div>
                                </Collapse>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="repassword"
                                    label="Nh???p l???i m???t kh???u"
                                    type="password"
                                    id="repassword"
                                    autoComplete="password"
                                    inputRef={register({
                                        validate: (value) =>
                                            value === getValues().password,
                                    })}
                                    error={"repassword" in errors}
                                />
                                <Collapse in={"repassword" in errors}>
                                    <div className="errorHelperText">
                                        M???t kh???u kh??ng kh???p
                                    </div>
                                </Collapse>
                            </Grid>
                            <Grid item md={8}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={role === 2}
                                            onChange={(e) => {
                                                if (e.target.checked)
                                                    setRole(2);
                                                else setRole(3);
                                            }}
                                            name="role"
                                            color="primary"
                                        />
                                    }
                                    label={"T???o t??i kho???n cho gi???ng vi??n"}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            ????ng k??
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="login" variant="body2">
                                    ???? c?? t??i kho???n? Click v??o ????y ????? ????ng nh???p.
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
                        <p>Ho???c ????ng k?? v???i</p>
                        <Grid
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
        </Container>
    );
}
