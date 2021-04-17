import { React } from "react";
import { Switch } from "react-router-dom";
import AddCourse from "features/Course/pages/AddCourse/AddCourse";
import EditCourse from "features/Course/pages/EditCourse";
import CourseList from "features/Course/pages/CourseList";
import { PrivateRoute, Route } from "commons/routes/CustomRoute";

export default function Authenticate() {
	return (
		<Switch>
			<Route exact path="/courses" component={CourseList} />
			<PrivateRoute maxWidth="xl" path="/courses/add" component={AddCourse} />
			<PrivateRoute path="/courses/edit" component={EditCourse} />
		</Switch>
	);
}
