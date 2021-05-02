import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CourseEditPane from "features/Course/components/Course/CourseEditPane";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchCourse,
	setCourse as setCourseAction,
} from "features/Course/editingCourseSlice";
import {
	Box,
	FormControl,
	MenuItem,
	Select,
	withStyles,
} from "@material-ui/core";
import BreadCrumbs from "commons/components/BreadCrumbs";
import InputBase from "@material-ui/core/InputBase";
import { CourseStatus } from "features/Course/constance";

export default function EditCourse() {
	const course = useSelector((state) => state.editingCourse.course);
	const dispatch = useDispatch();
	const setCourse = (course) => dispatch(setCourseAction({ course: course }));
	let { id } = useParams();
	useEffect(() => {
		// console.log("fetch ", id);
		dispatch(fetchCourse(id));
	}, [dispatch]);
	return (
		<Box mt={2}>
			<BreadCrumbs
				links={[{ link: "/courses", description: "Khóa học của tôi" }]}
				current="Thêm khóa học"
			>
				<FormControl>
					<Select
						labelId="demo-customized-select-label"
						id="demo-customized-select"
						defaultValue={course.status ? course.status : CourseStatus.DRAFT}
						// value={age}
						// onChange={handleChange}
						input={<BootstrapInput />}
					>
						<MenuItem value={CourseStatus.DRAFT}>Bản nháp</MenuItem>
						<MenuItem value={CourseStatus.PUBLISH}>Công khai</MenuItem>
					</Select>
				</FormControl>
			</BreadCrumbs>

			<Box mt={6}>
				<CourseEditPane course={course} setCourse={setCourse} />
			</Box>
		</Box>
	);
}

const BootstrapInput = withStyles((theme) => ({
	root: {
		"label + &": {
			marginTop: theme.spacing(3),
		},
	},
	input: {
		borderRadius: 4,
		position: "relative",
		backgroundColor: theme.palette.background.paper,
		border: "1px solid #ced4da",
		fontSize: 16,
		padding: "10px 26px 10px 12px",
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
		"&:focus": {
			borderRadius: 4,
			borderColor: "#80bdff",
			boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
		},
	},
}))(InputBase);
