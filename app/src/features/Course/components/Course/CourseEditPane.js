import React from "react";
import CourseInput from "features/Course/components/Course/CourseInput";
import Grid from "@material-ui/core/Grid";

export default function AddCourse({ course, setCourse }) {
	return (
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
	);
}
