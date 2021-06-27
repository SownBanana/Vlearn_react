import { React } from "react";
import { Switch } from "react-router-dom";
import AddCourse from "features/Course/pages/Instructor/AddCourse/AddCourse";
import EditCourse from "features/Course/pages/Instructor/EditCourse/EditCourse";
import InstructorCourseList from "features/Course/pages/Instructor/CourseList/CourseList";
import StudentCourseList from "features/Course/pages/Student/CourseList/CourseList";
import CourseSummary from "features/Course/pages/Student/CourseView/Summary/CourseSummary";
import {
    PrivateRoute,
    Route,
    InstructorRoute,
    AdminRoute,
} from "commons/routes/CustomRoute";
import LearnCourse from "features/Course/pages/Student/LearnCourse/LearnCourse";
import ManageCourse from "features/Course/pages/Admin/ManageCourse";
import PreviewCourse from "features/Course/pages/Admin/PreviewCourse";

export default function Course() {
    return (
        <Switch>
            <AdminRoute path="/courses/a/manage" component={ManageCourse} />
            <AdminRoute
                path="/courses/a/preview/:id"
                component={PreviewCourse}
            />
            <PrivateRoute path="/courses/learn/:id" component={LearnCourse} />
            <InstructorRoute
                path="/courses/i/:username/add"
                component={AddCourse}
            />
            <InstructorRoute
                path="/courses/i/:username/edit/:id"
                component={EditCourse}
            />
            <InstructorRoute
                path="/courses/i/:username"
                component={InstructorCourseList}
            />
            <Route path="/courses/:id" component={CourseSummary} />
            <Route path="/courses" component={StudentCourseList} />
        </Switch>
    );
}
