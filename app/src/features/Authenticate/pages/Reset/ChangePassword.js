import {
    Box,
    Button,
    Collapse,
    Container,
    Grid,
    makeStyles,
    Paper,
    TextField, Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import globalStyles from "style/GlobalStyles";
import { verifyResetPassword } from "features/Authenticate/authSlices";
import checkPassword from "features/Authenticate/components/CheckPassword";

export default function ChangePassword({ location }) {
    globalStyles();
    const dispatch = useDispatch();
    const classes = useStyles();
    const { register, handleSubmit, errors, getValues } = useForm();
    const code = location.search.substr(6, location.search.length);

    const onSubmit = ({ password }) => {
        console.log("Error", errors);
        dispatch(
            verifyResetPassword({
                password,
                code
            })
        );
    };

    const [passwordErrorCheck, setPasswordErrorCheck] = useState({
        spe: false,
        cap: false,
        nor: false,
        num: false,
        timeOut: 0,
    });
    var timer = 0;
    const checkErrorPassword = (password) => {
        return checkPassword(password, setPasswordErrorCheck);
    };
    const checkErrorOnType = (password) => {
        // console.log(timer);
        clearTimeout(timer);
        timer = setTimeout(() => {
            checkPassword(password, setPasswordErrorCheck);
        }, 100);
    };


    return (
        <Box mt={10}>
            <Container maxWidth="sm" style={{ display: "flex", justifyContent: "center", margin: "auto" }}>
                <Paper style={{ padding: 30, width: "100%" }}>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid
                            container
                            spacing={1}
                            direction="column"
                            justify="center"
                        >

                            <Typography variant="h6" color="initial">Mật khẩu mới của bạn</Typography>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="password"
                                    label="Mật khẩu"
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
                                        Nhập địa mật khẩu của bạn
												</div>
                                </Collapse>
                                <Collapse
                                    in={
                                        "password" in errors &&
                                        errors.password.type === "minLength"
                                    }
                                >
                                    <div className="errorHelperText">
                                        Mật khẩu của bạn quá ngắn
												</div>
                                </Collapse>
                                <Collapse in={passwordErrorCheck.spe}>
                                    <div className="errorHelperText">
                                        Mật khẩu của bạn cần chứa ít nhất 1 ký tự đặc biệt
												</div>
                                </Collapse>
                                <Collapse in={passwordErrorCheck.cap}>
                                    <div className="errorHelperText">
                                        Mật khẩu của bạn cần chứa ít nhất 1 ký tự in hoa
												</div>
                                </Collapse>
                                <Collapse in={passwordErrorCheck.nor}>
                                    <div className="errorHelperText">
                                        Mật khẩu của bạn cần chứa ít nhất 1 ký tự thường
												</div>
                                </Collapse>
                                <Collapse in={passwordErrorCheck.num}>
                                    <div className="errorHelperText">
                                        Mật khẩu của bạn cần chứa ít nhất 1 số
												</div>
                                </Collapse>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="repassword"
                                    label="Nhập lại mật khẩu"
                                    type="password"
                                    id="repassword"
                                    autoComplete="password"
                                    inputRef={register({
                                        validate: (value) => value === getValues().password,
                                    })}
                                    error={"repassword" in errors}
                                />
                                <Collapse in={"repassword" in errors}>
                                    <div className="errorHelperText">
                                        Mật khẩu không khớp
								</div>
                                </Collapse>
                            </Grid>

                            <Grid item xs={12} container direction="row" justify="center" >
                                <Button
                                    className={classes.submit}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Xác nhận
								</Button>
                            </Grid>
                        </Grid>

                    </form>
                </Paper>
            </Container>
        </Box>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
    title: {
        marginBottom: "20px",
    },
    avatar: {
        height: "2.5em",
        width: "2.5em",
        margin: "auto",
    },
}));
