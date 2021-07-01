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
import user from "./features/User/userSlice";
import notification from "./features/Notification/notificationSlice";
import lessonChat from "./features/Course/pages/Student/LearnCourse/lessonChatSlice";
import dashInstructor from "./features/Dashboard/pages/Instructor/instructorDashSlice";
import dashStudent from "./features/Dashboard/pages/Student/studentDashSlice";
import search from "./features/Home/pages/Search/searchSlice";
import announcement from "./features/Announcement/announcementSlice";
import home from "./features/Home/homeSlice";

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
	user,
	notification,
	lessonChat,
	dashInstructor,
	dashStudent,
	search,
	announcement,
	home
});
