import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackToPrevious from "../../../../commons/components/BackToPrevious";
import NewSocialAccount from "../../components/NewSocialAccount";
import { getSocialCallback } from "../../socialAuthSlices";
import { activeProgress } from "../../../../commons/SliceCommon";
import ExistSocialAccount from "features/Authenticate/components/ExistSocialAccount";
export default function Facebook({ location }) {
	const status = useSelector((state) => state.social.pendingSocial.status);
	const isAuthed = useSelector((state) => state.auth.isLoggedIn);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(activeProgress());
		dispatch(getSocialCallback({ social: "facebook", search: location.search }));
		return () => { };
	}, [dispatch, location.search]);
	return (
		<div>
			{/* <div> {location.search}</div> */}
			{isAuthed && <BackToPrevious />}
			{status === "existed" && <ExistSocialAccount />}
			{status === "new" && <NewSocialAccount />}
		</div>
	);
}
