import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import {
	Box,
	Typography,
	Button,
	Grid,
	useMediaQuery,
} from "@material-ui/core";
import BreadCrumbs from "commons/components/BreadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourse } from "features/Course/courseListSlice";
import CourseItem from "features/Course/components/Course/CourseItemInstructor";
import CourseItemFlat from "features/Course/components/Course/FlatCourseItem";

export default function CourseList() {
	console.log("course list");
	const id = useSelector((state) => state.auth.user.id);
	const courseList = useSelector((state) => state.courseList.data);
	const courses = courseList.data;
	const dispatch = useDispatch();
	const history = useHistory();
	const isMobile = useMediaQuery("(max-width: 760px)");
	const routeChange = () => {
		let path = `/courses/add`;
		history.push(path);
	};

	useEffect(() => {
		dispatch(
			fetchCourse({
				page: 1,
				perPage: 100,
				instructor_id: id,
			})
		);
	}, [dispatch, id]);
	return (
		<Box mt={2}>
			<BreadCrumbs current="Khóa học của tôi">
				<Button variant="contained" color="primary" onClick={routeChange}>
					Thêm khóa học
				</Button>
			</BreadCrumbs>

			<Box px={isMobile ? 2 : 5}>
				<Grid
					container
					spacing={1}
					direction="row"
					justify="center"
					alignItems="center"
					alignContent="center"
					wrap="nowrap"
				>
					<Grid
						item
						md={12}
						xl={10}
						container
						spacing={2}
						direction="row"
						justify="flex-start"
						alignItems="center"
						alignContent="center"
					>
						{courses &&
							courses.map((course) => {
								return (
									<Grid item md={6} xs={12}>
										<CourseItemFlat course={course} />
									</Grid>
								);
							})}
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
