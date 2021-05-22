import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackToPrevious from "../../../../commons/components/BackToPrevious";
import NewSocialAccount from "../../components/NewSocialAccount";
import { getSocialCallback } from "../../socialAuthSlices";
import { activeProgress } from "../../../../commons/SliceCommon";
import ExistSocialAccount from "features/Authenticate/components/ExistSocialAccount";
import { attachSocial } from "features/Info/infoSlice";
import { useHistory } from "react-router";
import { Box, Typography } from "@material-ui/core";
export default function Google({ location }) {
	const status = useSelector((state) => state.social.pendingSocial.status);
	const isAuthed = useSelector((state) => state.auth.isLoggedIn);
	const [readyToRedirect, setReadyToRedirect] = useState(false)
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(activeProgress());
		// debugger
		if (isAuthed && !readyToRedirect) {
			console.log("Attaching Account")
			dispatch(attachSocial({ social: "google", search: location.search }));
			history.push("/info");
		} else {
			setReadyToRedirect(true);
			dispatch(getSocialCallback({ social: "google", search: location.search }));
		}
	}, [dispatch, location.search, isAuthed]);
	return (
		<Box mt={10}>
			{(isAuthed && readyToRedirect) && <BackToPrevious />}
			{status === "existed" ? <ExistSocialAccount /> :
				status === "new" ? <NewSocialAccount /> :
					status === "fail" ?
						<Typography variant="body1" color="error">Có lỗi xảy ra</Typography>
						:
						<Typography variant="body1" color="primary">Đang kiểm tra thông tin ... </Typography>
			}
		</Box>
	);
}
