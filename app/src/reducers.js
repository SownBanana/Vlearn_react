import { combineReducers } from "redux";
import auth from "./features/Authenticate/authSlices";
import social from "./features/Authenticate/socialAuthSlices";
import toast from "./features/Toast/toastSlices";
import common from "./commons/SliceCommon";
import externalLink from "./features/Authenticate/externalLinkSlices";
// console.log(externalLink);
export default combineReducers({
	auth,
	social,
	toast,
	common,
	externalLink,
});
