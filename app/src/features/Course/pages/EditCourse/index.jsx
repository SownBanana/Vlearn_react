import React from "react";
import InputCourse from "features/Course/components/Course/CourseInput";
import { Link } from "react-router-dom";
export default function index() {
	return (
		<div>
			<Link to="/courses/add">Add Course</Link>
			This is edit course
			<InputCourse />
		</div>
	);
}
