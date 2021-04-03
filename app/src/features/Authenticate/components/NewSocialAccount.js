import {
	Avatar,
	Button,
	Checkbox,
	Collapse,
	Container,
	FormControlLabel,
	Grid,
	makeStyles,
	TextField,
	Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import globalStyles from "../../../style/GlobalStyles";
import checkPassword from "./CheckPassword";
import { createSocial } from "../authSlices";

export default function NewSocialAccount() {
	const dispatch = useDispatch();
	const pendingSocial = useSelector((state) => state.social.pendingSocial);
	const { register, handleSubmit, errors, getValues } = useForm();
	const classes = useStyles();
	globalStyles();

	const onSubmit = ({ username, email, password }) => {
		console.log("Submit");
		const social = pendingSocial.social_provider;
		const name = pendingSocial.social_name;
		const avatar = pendingSocial.social_avatar;
		dispatch(createSocial({ name, username, email, password, avatar, social }));
	};

	const [passwordErrorCheck, setPasswordErrorCheck] = useState({
		spe: false,
		cap: false,
		nor: false,
		num: false,
		timeOut: 0,
	});
	const [isUsePassword, setIsUsePassword] = useState(true);
	var timer = 0;
	const checkErrorPassword = (password) => {
		// console.log(timer);
		clearTimeout(timer);
		timer = setTimeout(() => {
			checkPassword(password, setPasswordErrorCheck);
		}, 200);
	};

	return (
		<div>
			<Container maxWidth="sm">
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
						alignItems="center"
						alignContent="center"
						wrap="nowrap"
						className={classes.paper}
					>
						<Typography className={classes.title} variant="h5" color="initial">
							Chào mừng {pendingSocial.social_name}
						</Typography>
						<Grid container spacing={2}>
							<Grid item xs={10}>
								<TextField
									disabled={true}
									variant="outlined"
									fullWidth
									id="email"
									// label="Địa chỉ Email"
									name="email"
									value={pendingSocial.social_email}
								/>
							</Grid>
							<Grid item xs={2}>
								<Avatar
									className={classes.avatar}
									variant="square"
									alt={pendingSocial.social_email}
									src={pendingSocial.social_avatar}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									value={pendingSocial.social_nickname}
									variant="outlined"
									fullWidth
									id="username"
									label="Tên tài khoản"
									name="username"
									autoComplete="username"
									inputRef={register({ required: true })}
									error={"username" in errors}
								/>
								<Collapse in={"username" in errors}>
									<div className="errorHelperText">
										Nhập tên tài khoản của bạn
									</div>
								</Collapse>
							</Grid>
							<Grid item xs={12} className="noPaddingTop">
								<Grid container>
									<FormControlLabel
										control={
											<Checkbox
												checked={isUsePassword}
												onChange={(e) => {
													setIsUsePassword(e.target.checked);
												}}
												name="usePassword"
												color="primary"
											/>
										}
										label={
											isUsePassword ? "Sử dụng mật khẩu" : "Không dùng mật khẩu"
										}
									/>
								</Grid>
								<Collapse in={isUsePassword}>
									<Grid container spacing={2}>
										<Grid item xs={6}>
											<TextField
												variant="outlined"
												fullWidth
												name="password"
												label="Mật khẩu"
												type="password"
												id="password"
												autoComplete="current-password"
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
										<Grid item xs={6}>
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
									</Grid>
								</Collapse>
							</Grid>
						</Grid>
						<Grid
							container
							justify="center"
							alignItems="center"
							alignContent="center"
							direction="row"
							spacing={3}
						>
							<Grid item xs={8}>
								<Button
									className={classes.submit}
									type="submit"
									variant="contained"
									color="primary"
									fullWidth
								>
									Xác nhận
								</Button>
							</Grid>
							<Grid item xs={3}>
								<Button
									className={classes.submit}
									variant="contained"
									color="secondary"
									fullWidth
								>
									Thoát
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</form>
			</Container>
		</div>
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
