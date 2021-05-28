import { combineReducers } from "redux";
import auth from "./features/Authenticate/authSlices";
import social from "./features/Authenticate/socialAuthSlices";
import toast from "./features/Toast/toastSlices";
import common from "./commons/SliceCommon";
import externalLink from "./features/Authenticate/externalLinkSlices";
import editingCourse from "./features/Course/editingCourseSlice";
import course from "./features/Course/courseSlice";
import courseList from "./features/Course/courseListSlice";
import editorModal from "./commons/components/EditorModal/editorSlice";
import chat from "./features/Chat/chatSlice";
import info from "./features/Info/infoSlice";
import learnCourse from "./features/Course/pages/Student/LearnCourse/learnSlice";
import topic from "./features/Topic/topicSlice";
import notification from "./features/Notification/notificationSlice";
import lessonChat from "./features/Course/pages/Student/LearnCourse/lessonChatSlice";

export default combineReducers({
	auth,
	social,
	toast,
	common,
	externalLink,
	editingCourse,
	courseList,
	editorModal,
	course,
	chat,
	info,
	learnCourse,
	topic,
	notification,
	lessonChat,
});
