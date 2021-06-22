import {
	Avatar,
	Button,
	Container,
	Grid,
	makeStyles,
	Typography,
} from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import globalStyles from "../../../style/GlobalStyles";
import { attachSocial } from "../authSlices";

export default function ExistSocialAccount() {
	const dispatch = useDispatch();
	const pendingSocial = useSelector((state) => state.social.pendingSocial);
	const { handleSubmit } = useForm();
	const classes = useStyles();
	globalStyles();

	const onSubmit = () => {
		const social = pendingSocial.social_provider;
		const email = pendingSocial.social_email;
		const social_id = pendingSocial.social_id;
		dispatch(
			attachSocial({
				social,
				email,
				social_id
			})
		);
	};

	return (
		<div>
			<Container maxWidth="md">
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

						<Grid
							container
							spacing={1}
							direction="column"
							justify="center"
							alignItems="center"
							alignContent="center">
							<Avatar
								className={classes.avatar}
								variant="square"
								alt={pendingSocial.social_email}
								src={pendingSocial.social_avatar}
							/>
							<Typography className={classes.title} variant="h5" color="initial">
								Chào mừng {pendingSocial.social_name}
							</Typography>
							<Typography variant="h6" color="initial">
								{pendingSocial.social_email}
							</Typography>
							<Typography variant="h6" color="initial">
								Email này đã được tài khoản <b>{pendingSocial.name}</b> đăng ký. Bạn có muốn liên kết với tài khoản đã tồn tại?
							</Typography>
						</Grid>
						<Grid
							container
							justify="center"
							alignItems="center"
							alignContent="center"
							direction="row"
							spacing={1}
						>
							<Grid item xs={12} md={3}>
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
							<Grid item xs={12} md={3}>
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
		</div >
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		margin: theme.spacing(8, 4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "white",
		padding: 10,
		borderRadius: 10,
		boxShadow: "black 1px 1px 6px -3px",
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
		height: "3.5em",
		width: "3.5em",
		margin: "auto",
		borderRadius: "50%",
		boxShadow: "black 1px 1px 6px -3px",
	},
}));
