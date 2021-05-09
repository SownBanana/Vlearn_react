import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Grid, useMediaQuery } from "@material-ui/core";
import BreadCrumbs from "commons/components/BreadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "features/Course/courseListSlice";
import CourseItemFlat from "features/Course/components/Course/FlatCourseItem";
import { Pagination } from "@material-ui/lab";
import SearchPane from "./SearchPane";
import { CourseStatus } from "features/Course/constance";
export default function CourseList() {
	console.log("course list");
	const id = useSelector((state) => state.auth.user.id);
	const courseList = useSelector((state) => state.courseList.data);
	const username = useSelector(state => state.auth.user.username);
	const courses = courseList.data;
	const dispatch = useDispatch();
	const history = useHistory();
	const isMobile = useMediaQuery("(max-width: 760px)");
	const [nav, setNav] = useState({
		page: 1,
		perPage: 8,
		instructor_id: id,
		search: "",
	});
	const [filter, setFilter] = useState({
		status: CourseStatus.ALL,
		time: "desc",
	});
	const routeChange = () => {
		let path = `/courses/i/${username}/add`;
		history.push(path);
	};
	const setPage = (e, value) => {
		e.preventDefault();
		setNav({ ...nav, page: value });
	};

	var queryTimeOut = 0;
	const handleSearch = (e) => {
		clearTimeout(queryTimeOut);
		queryTimeOut = setTimeout(() => {
			setNav({ ...nav, search: e.target.value });
		}, 300);
	};

	useEffect(() => {
		dispatch(
			fetchCourses({
				...nav,
				...filter,
			})
		);
	}, [dispatch, nav, filter]);
	useEffect(() => {
		isMobile ? setNav({ ...nav, perPage: 5 }) : setNav({ ...nav, perPage: 8 });
	}, [isMobile]);

	return (
		<Box mt={2}>
			<BreadCrumbs current="Khóa học của tôi">
				<Button variant="contained" color="primary" onClick={routeChange}>
					Thêm khóa học
				</Button>
			</BreadCrumbs>
			<SearchPane
				handleSearch={handleSearch}
				handleFilter={setFilter}
				filter={filter}
			/>
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
						spacing={4}
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
			<Box mt={4} mb={3} style={{ display: "flex", justifyContent: "center" }}>
				<Pagination
					count={courseList.last_page}
					shape="rounded"
					color="primary"
					onChange={setPage}
					page={courseList.current_page}
				/>
			</Box>
		</Box>
	);
}
