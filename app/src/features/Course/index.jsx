import { React } from "react";
import { Switch } from "react-router-dom";
import AddCourse from "features/Course/pages/Instructor/AddCourse/AddCourse";
import EditCourse from "features/Course/pages/Instructor/EditCourse/EditCourse";
import CourseList from "features/Course/pages/Instructor/CourseList/CourseList";
import { PrivateRoute, Route } from "commons/routes/CustomRoute";

export default function Authenticate() {
	return (
		<Switch>
			<Route exact path="/courses" component={CourseList} />
			<PrivateRoute path="/courses/add" component={AddCourse} />
			<PrivateRoute path="/courses/edit/:id" component={EditCourse} />
		</Switch>
	);
}
