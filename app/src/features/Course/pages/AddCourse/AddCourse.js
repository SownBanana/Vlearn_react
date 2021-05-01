import React, { useEffect, useState } from "react";
import InputCourse from "features/Course/components/Course/CourseInput";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { setCourse as setCourseAction } from "features/Course/editingCourseSlice";
import { Box } from "@material-ui/core";

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
		<Box mt={8}>
			<Grid
				container
				spacing={1}
				direction="column"
				justify="center"
				alignItems="center"
				alignContent="center"
				wrap="nowrap"
			>
				<Grid container justify="center">
					<Grid item md={12}>
						<InputCourse course={course} setCourse={setCourse} />
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}
