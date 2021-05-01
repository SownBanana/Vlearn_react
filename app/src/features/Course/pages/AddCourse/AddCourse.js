import React, { useEffect, useState } from "react";
import CourseInput from "features/Course/components/Course/CourseInput";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { setCourse as setCourseAction } from "features/Course/editingCourseSlice";
import { Box } from "@material-ui/core";
import BreadCrumbs from "commons/components/BreadCrumbs";

export default function AddCourse() {
	const course = useSelector((state) => state.editingCourse.course);
	const dispatch = useDispatch();
	const setCourse = (course) => dispatch(setCourseAction(course));

	useEffect(() => {
		const savedCourse = localStorage.getItem("editingCourse.course");
		if (savedCourse) {
			dispatch(setCourseAction(JSON.parse(savedCourse)));
		}
	}, []);
	return (
		<Box mt={2}>
			<BreadCrumbs
				links={[{ link: "/courses", description: "Khóa học của tôi" }]}
			>
				Thêm khóa học
			</BreadCrumbs>
			<Box mt={6}>
				<Grid
					container
					spacing={1}
					direction="column"
					justify="center"
					alignItems="center"
					alignContent="center"
					wrap="nowrap"
					item
					md={12}
				>
					<CourseInput course={course} setCourse={setCourse} />
				</Grid>
			</Box>
		</Box>
	);
}
