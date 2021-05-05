import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Grid, useMediaQuery } from "@material-ui/core";
import BreadCrumbs from "commons/components/BreadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourse } from "features/Course/courseListSlice";
import CourseItemFlat from "features/Course/components/Course/FlatCourseItem";
import { Pagination } from "@material-ui/lab";
import SearchPane from "./SearchPane";
import { CourseStatus } from "features/Course/constance";
export default function CourseList() {
	console.log("course list");
	const id = useSelector((state) => state.auth.user.id);
	const courseList = useSelector((state) => state.courseList.data);
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
	// const [perPage, setPerPage] = useState(8);
	// const [nameQuery, setNameQuery] = useState("");
	const [filter, setFilter] = useState({
		status: "null",
	});
	const routeChange = () => {
		let path = `/courses/add`;
		history.push(path);
	};
	const setPage = (e, value) => {
		// dispatch(
		// 	fetchCourse({
		// 		page: value,
		// 		perPage: perPage,
		// 		instructor_id: id,
		// 	})
		// );
		e.preventDefault();
		setNav({ ...nav, page: value });
	};

	var queryTimeOut = 0;
	const handleSearch = (e) => {
		clearTimeout(queryTimeOut);
		queryTimeOut = setTimeout(() => {
			// console.log("query");
			// setNameQuery(e.target.value);
			setNav({ ...nav, search: e.target.value });
		}, 300);
	};

	useEffect(() => {
		dispatch(
			fetchCourse({
				// page: 1,
				// perPage: perPage,
				// instructor_id: id,
				// search: nameQuery,
				// status: filter.status,
				...nav,
			})
		);
		// }, [dispatch, id, perPage, nameQuery, filter]);
	}, [dispatch, nav]);
	useEffect(() => {
		// isMobile ? setPerPage(5) : setPerPage(8);
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
