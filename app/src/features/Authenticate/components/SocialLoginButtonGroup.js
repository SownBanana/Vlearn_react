import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box } from "@material-ui/core/";
import {
	GoogleLoginButton,
	GithubLoginButton,
	FacebookLoginButton,
} from "react-social-login-buttons";
import { logout } from "../authSlices";
import { fetchFacebookLink, fetchGithubLink, fetchGoogleLink } from "../externalLinkSlices";

export default function SocialLoginButtonGroup() {
	const dispatch = useDispatch();
	const googleLoginLink = useSelector(
		(state) => state.externalLink.googleLoginLink
	);
	const facebookLoginLink = useSelector(state => state.externalLink.facebookLoginLink)
	const githubLoginLink = useSelector(state => state.externalLink.githubLoginLink)
	useEffect(() => {
		dispatch(fetchGoogleLink());
		dispatch(fetchFacebookLink());
		dispatch(fetchGithubLink());
		return () => { };
	}, [dispatch]);

	return (
		<div>
			<Grid container direction="row" justify="center" alignItems="center">
				<Box mx={1}>
					<GoogleLoginButton
						text=""
						// text={loginGoogleText}
						// onMouseEnter={() => {
						// 	setloginGoogleText("Đăng nhập với Google");
						// }}
						// onMouseLeave={() => {
						// 	setloginGoogleText("");
						// }}
						onClick={() => {
							dispatch(logout());
							window.location.href = googleLoginLink;
						}}
					/>
				</Box>
				<Box mx={1}>
					<FacebookLoginButton text="" onClick={() => {
						dispatch(logout());
						window.location.href = facebookLoginLink;
					}} />
				</Box>
				<Box mx={1}>
					<GithubLoginButton text="" onClick={() => {
						dispatch(logout());
						window.location.href = githubLoginLink;
					}} />
				</Box>
			</Grid>
		</div>
	);
}
