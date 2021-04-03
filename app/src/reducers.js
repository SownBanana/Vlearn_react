import { combineReducers } from "redux";
import auth from "./features/Authenticate/authSlices";
import toast from "./features/Toast/toastSlices";
import common from "./commons/SliceCommon";
import externalLink from "./features/Authenticate/externalLinkSlice";
console.log(externalLink);
export default combineReducers({
	auth,
	toast,
	common,
	externalLink,
});
