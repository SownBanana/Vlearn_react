import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackToPrevious from "../../../../commons/components/BackToPrevious";
import NewSocialAccount from "../../components/NewSocialAccount";
import { getSocialCallback } from "../../socialAuthSlices";
import { activeProgress } from "../../../../commons/SliceCommon";
export default function Google({ location }) {
	const status = useSelector((state) => state.social.pendingSocial.status);
	const isAuthed = useSelector((state) => state.auth.isLoggedIn);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(activeProgress());
		dispatch(getSocialCallback({ social: "google", search: location.search }));
		return () => {};
	}, [dispatch, location.search]);
	return (
		<div>
			{/* <div> {location.search}</div> */}
			{isAuthed && <BackToPrevious />}
			{status === "existed" && <div>Tai khoan da ton tai</div>}
			{status === "new" && <NewSocialAccount />}
		</div>
	);
}
