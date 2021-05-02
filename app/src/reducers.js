import { combineReducers } from "redux";
import auth from "./features/Authenticate/authSlices";
import social from "./features/Authenticate/socialAuthSlices";
import toast from "./features/Toast/toastSlices";
import common from "./commons/SliceCommon";
import externalLink from "./features/Authenticate/externalLinkSlices";
import editingCourse from "./features/Course/editingCourseSlice";
import courseList from "./features/Course/courseListSlice";
import editorModal from "./commons/components/EditorModal/editorSlice";
// console.log(externalLink);
export default combineReducers({
	auth,
	social,
	toast,
	common,
	externalLink,
	editingCourse,
	courseList,
	editorModal,
});
