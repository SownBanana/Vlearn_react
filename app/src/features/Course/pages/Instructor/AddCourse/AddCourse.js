import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setCourse as setCourseAction,
	setStateCourse,
	clearEditingCourse,
} from "features/Course/editingCourseSlice";
import {
	Box,
	Switch,
	Typography,
} from "@material-ui/core";
import BreadCrumbs from "commons/components/BreadCrumbs";
import { CourseStatus } from "features/Course/constance";
import CourseInput from "features/Course/components/Course/CourseInput";

export default function AddCourse() {
	const course = useSelector((state) => state.editingCourse.course);
	const status = useSelector((state) => state.editingCourse.status);
	const username = useSelector(state => state.auth.user.username);
	const dispatch = useDispatch();
	const setCourse = (course) => {
		dispatch(setStateCourse(course));
		dispatch(setCourseAction());
	};
	const handleStatusSwitch = () => {
		if (course.status === CourseStatus.PUBLISH) {
			setCourse({ ...course, status: CourseStatus.DRAFT });
		} else {
			setCourse({ ...course, status: CourseStatus.PUBLISH });
		}
	};
	useEffect(() => {
		dispatch(clearEditingCourse());
		return () => {
			dispatch(clearEditingCourse());
		};
	}, [dispatch]);

	return (
		<Box mt={2}>
			<BreadCrumbs
				links={[{ link: `/courses/i/${username}`, description: "Khóa học của tôi" }]}
				current="Thêm khóa học"
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
					<Typography
						style={{ marginRight: "10px" }}
						variant="subtitle2"
						color="secondary"
					>
						Bản nháp
					</Typography>
				) : course.status === CourseStatus.PUBLISH ? (
					<Typography
						style={{ marginRight: "10px" }}
						variant="subtitle2"
						color="secondary"
					>
						Công khai
					</Typography>
				) : (
					<Typography
						style={{ marginRight: "10px" }}
						variant="subtitle2"
						color="secondary"
					>
						Bản nháp
					</Typography>
				)}
			</BreadCrumbs>

			<Box mt={6}>
				<CourseInput course={course} setCourse={setCourse} />
			</Box>
		</Box>
	);
}
