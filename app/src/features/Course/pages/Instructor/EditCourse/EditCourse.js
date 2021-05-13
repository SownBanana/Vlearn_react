import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseEditPane from "features/Course/components/Course/CourseEditPane";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchCourse,
	setCourse as setCourseAction,
	setStateCourse,
	clearEditingCourse,
} from "features/Course/editingCourseSlice";
import {
	Box,
	Typography,
	Switch,
} from "@material-ui/core";
import BreadCrumbs from "commons/components/BreadCrumbs";
import { CourseStatus } from "features/Course/constance";

export default function EditCourse() {
	const course = useSelector((state) => state.editingCourse.course);
	const status = useSelector((state) => state.editingCourse.status);
	const username = useSelector(state => state.auth.user.username);
	const dispatch = useDispatch();
	const setCourse = (course) => {
		dispatch(setStateCourse(course));
		dispatch(setCourseAction());
	};
	let { id } = useParams();
	// const handleStatusChange = (e) => {
	// 	console.log("on change", e);
	// 	setCourse({ ...course, status: e.target.value });
	// };
	const handleStatusSwitch = () => {
		if (course.status === CourseStatus.PUBLISH) {
			setCourse({ ...course, status: CourseStatus.DRAFT });
		} else {
			setCourse({ ...course, status: CourseStatus.PUBLISH });
		}
	};
	useEffect(() => {
		// console.log("fetch ", id);
		dispatch(fetchCourse(id));
		return () => {
			dispatch(clearEditingCourse());
		};
	}, [dispatch, id]);
	return (
		<Box mt={2}>
			<BreadCrumbs
				links={[{ link: `/courses/i/${username}`, description: "Khóa học của tôi" }]}
				current={`Chỉnh sửa ${course.title}`}
			>
				{status === "saved" ? (
					<Typography
						style={{ marginRight: "10px", color: "green" }}
						variant="subtitle2"
					>
						Đã lưu
					</Typography>
				) : status === "saving" ? (
					<Typography
						style={{ marginRight: "10px" }}
						variant="subtitle2"
						color="primary"
					>
						Đang lưu ...
					</Typography>
				) : status === "failed" ? (
					<Typography
						style={{ marginRight: "10px" }}
						variant="subtitle2"
						color="secondary"
					>
						Có lỗi xảy ra !!!
					</Typography>
				) : status === "fetchFailed" ? (
					<Typography
						style={{ marginRight: "10px" }}
						variant="subtitle2"
						color="secondary"
					>
						Thất bại! F5 để thử lại.
					</Typography>
				) : status === "fetching" ? (
					<Typography
						style={{ marginRight: "10px" }}
						variant="subtitle2"
						color="primary"
					>
						Đang lấy dữ liệu ...
					</Typography>
				) : status === "fetched" ? (
					<Typography
						style={{ marginRight: "10px", color: "green" }}
						variant="subtitle2"
					>
						Đã lấy dữ liệu
					</Typography>
				) : (
					status
				)}

				<Switch
					checked={
						course.status ? course.status === CourseStatus.PUBLISH : false
					}
					onChange={handleStatusSwitch}
					name="checkedB"
					color="primary"
				/>
				{!course.status ? (
					<Typography variant="subtitle2" color="secondary">
						Bản nháp
					</Typography>
				) : course.status === CourseStatus.PUBLISH ? (
					<Typography variant="subtitle2" color="primary">
						Công khai
					</Typography>
				) : (
					<Typography variant="subtitle2" color="secondary">
						Bản nháp
					</Typography>
				)}
			</BreadCrumbs>

			<Box mt={6}>
				<CourseEditPane course={course} setCourse={setCourse} />
			</Box>
		</Box>
	);
}