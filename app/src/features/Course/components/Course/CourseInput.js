import React, { lazy, Suspense, useEffect, useState } from "react";
import {
	TextField,
	Grid,
	Container,
	Typography,
	makeStyles,
	MuiThemeProvider,
	Box,
	Chip,
	IconButton,
} from "@material-ui/core";
import EditorModal from "commons/components/EditorModal/EditorModal";
import SectionList from "../Section/SectionList";
import CKViewer from "commons/components/CKEditor/CKViewer";
// import Lazy from "react-lazyload";
import { DropzoneArea } from "material-ui-dropzone";
import uploadApi from "commons/api/upload/upload";
import dropZoneTheme from "theme/fullImageDropzone";
import { useDispatch, useSelector } from "react-redux";
import ContentEdit from "features/Course/components/ContentEdit";
import { Autocomplete, Skeleton } from "@material-ui/lab";
import { Code, Edit } from "@material-ui/icons";
import { attachTopic, detachTopic, setContentEditMode } from "features/Course/editingCourseSlice";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { CourseStatus } from "features/Course/constance";

const CKEditor = lazy(() => {
	const editor = new Promise((resolve) => {
		setTimeout(() => {
			return resolve(import("commons/components/CKEditor/CKEditor"));
		}, 100);
	});
	return editor;
});

// import Prism from "prismjs";

export default function CourseInput({ course, setCourse }) {
	const classes = useStyles();
	const status = useSelector((state) => state.editingCourse.status);
	const contentEditMode = useSelector((state) => state.editingCourse.contentEditMode);
	const dispatch = useDispatch();
	const topics = useSelector(state => state.topic.topics);
	const [editTitle, setEditTitle] = useState(false);
	const [courseTitle, setTitle] = useState("");
	const introHandler = (data) => {
		setCourse({ ...course, introduce: data });
	};

	useEffect(() => {
		return () => {
			dispatch(setContentEditMode(false));
		}
	}, [])
	useEffect(() => {
		setTitle(course.title);
	}, [course.title])

	return (

		<Container maxWidth="xl">
			<form>
				<Grid container spacing={4} direction="row" justify="space-around">
					{
						contentEditMode ?
							(
								<Grid
									item
									md={8}
									xs={12}
									spacing={2}
									className={classes.panel}
								>
									<ContentEdit />
								</Grid>
							) : (
								<Grid
									item
									md={8}
									sm={12}
									container
									spacing={2}
									justify="center"
									alignItems="center"
									className={classes.panel}
								>
									<Grid container item md={12} xs={10}>
										<Box display="flex">
											<Typography className={classes.headerText} variant="h6" color="textSecondary">
												Tên khóa học
											</Typography>
											<IconButton size="small" onClick={() => {
												if (editTitle) {
													setCourse({ ...course, title: courseTitle });
												}
												setEditTitle(!editTitle)
											}}>
												<Edit fontSize="small" />
											</IconButton>
										</Box>
										<TextField
											className={classes.textField}
											id="name"
											variant="outlined"
											fullWidth
											disabled={!editTitle}
											value={courseTitle}
											onChange={(e) =>
												// setCourse({ ...course, title: e.target.value })
												setTitle(e.target.value)
											}
										/>
									</Grid>
									<Grid container alignItems="stretch" item md={12} xs={10}>
										<Typography className={classes.headerText} variant="h6" color="textSecondary">
											Giới thiệu khóa học
										</Typography>
										<Grid item md={12} xs={12}>
											<Suspense
												fallback={<TextField disabled fullWidth variant="outlined" />}
											>
												{/* <Suspense fallback={<div>Loading...</div>}> */}
												{status !== "fetching" && status !== "fetchFailed" && (
													<CKEditor
														content={course.introduce}
														handler={introHandler}
													/>
												)}
											</Suspense>
										</Grid>
									</Grid>
									<Grid container alignItems="stretch" item md={12} xs={10}>
										<Typography className={classes.headerText} variant="h6" color="textSecondary">
											Thời gian
										</Typography>
										<Grid item md={12} xs={12}>
											<Box display="flex" mb={2}>
												<KeyboardDateTimePicker
													style={{ marginRight: 10 }}
													label="Bắt đầu"
													variant="inline"
													ampm={false}
													style={{ width: "100%" }}
													format="HH:mm DD/MM/yyy"
													value={new Date(course.start_time)}
													onChange={
														(date) => setCourse({ ...course, start_time: date.format("yyyy-MM-DD HH:mm") })
													} />

												<KeyboardDateTimePicker
													label="Kết thúc"
													variant="inline"
													ampm={false}
													style={{ width: "100%" }}
													format="HH:mm DD/MM/yyy"
													value={new Date(course.end_time)}
													onChange={
														(date) => setCourse({ ...course, end_time: date.format("yyyy-MM-DD HH:mm") })
													} />
											</Box>
										</Grid>
									</Grid>
									<Grid
										container
										alignItems="stretch"
										direction="column"
										item
										md={12}
										xs={10}
									>
										<Grid container direction="row" justify="space-between">
											<Typography align="left" className={classes.headerText} variant="h6" color="textSecondary">
												Chương học
											</Typography>
											<div style={{ display: "flex", alignItems: "center" }}>
												<Skeleton variant="rect" width="20px" height="20px" color="red" animation="wave" style={{ backgroundColor: "#147b02b0", marginRight: "5px", marginLeft: "10px" }}></Skeleton>
												<Typography variant="caption" color="textSecondary">Bài học</Typography>
												<Skeleton variant="rect" width="20px" height="20px" color="red" animation="wave" style={{ backgroundColor: "#e0a605b0", marginRight: "5px", marginLeft: "10px" }}></Skeleton>
												<Typography variant="caption" color="textSecondary">Câu hỏi</Typography>
											</div>
										</Grid>
										<Grid item container md={12} direction="column">
											<SectionList
											// sections={course.sections}
											// setSections={setSections}
											/>
										</Grid>
									</Grid>

								</Grid>
							)
					}
					<Grid
						item
						md={3}
						xs={12}
						className={classes.panel}
					>
						<Typography align="left" className={classes.headerText} variant="h6" color="textSecondary">
							Thumbnail
						</Typography>
						{course.thumbnail_url && (
							<img className={classes.loadedImage} src={course.thumbnail_url} alt={course.title} />
						)}
						<MuiThemeProvider theme={dropZoneTheme}>
							<DropzoneArea
								filesLimit={1}
								acceptedFiles={["image/*"]}
								dropzoneText={"Click hoặc thả ảnh bìa khoá học tại đây"}
								onChange={async (files) => {
									const resp = await uploadApi.upload({
										file: files[files.length - 1],
									});
									if (resp.uploaded === true)
										setCourse({ ...course, thumbnail_url: resp.url });
								}}
								onDelete={() => {
									setCourse({ ...course, thumbnail_url: "" });
								}}
							/>
						</MuiThemeProvider>
						<Typography align="left" className={classes.headerText} variant="h6" color="textSecondary">
							Chủ đề
						</Typography>
						<Autocomplete
							style={{ marginBottom: 10 }}
							options={topics}
							getOptionLabel={(option) => option.name}
							onChange={(event, newValue) => {
								console.log(newValue);
								if (newValue) {
									dispatch(attachTopic({
										course_id: course.id,
										topic_id: newValue.id
									}));
								}
							}}
							renderInput={(params) => <TextField {...params} variant="outlined" size="small" />}
						/>
						<Grid container direction="row" justify="flex-start">
							{
								course.topics && course.topics.map(topic => (
									<Chip
										key={topic.id}
										label={topic.name}
										size="small"
										onDelete={(e) => {
											dispatch(detachTopic({
												course_id: course.id,
												topic_id: topic.id
											}))
										}}
										onClick={(e) => console.log(e)}
										style={{ marginRight: "5px", marginBottom: "5px" }}
									/>
								))
							}
						</Grid>
						<Typography align="left" className={classes.headerText} variant="h6" color="textSecondary">
							Giá
						</Typography>
						<TextField
							className={classes.textField}
							id="price"
							variant="outlined"
							fullWidth
							type="number"
							value={course.price}
							onChange={(e) =>
								setCourse({ ...course, price: parseFloat(e.target.value) })
							}
							size="small"
						/>
						{
							course.status === CourseStatus.REJECTED &&
							<Box my={2} >
								<Box color="secondary.main">
									<Typography align="left" className={classes.headerText} variant="h6" >
										Lý do từ chối
									</Typography>
								</Box>
								<CKViewer content={course.reject_reason} />
							</Box>
						}
					</Grid>
				</Grid>
			</form>
			<Grid item md={12} xs={12}>
				<EditorModal />
			</Grid>
		</Container>
	);
}

const useStyles = makeStyles((theme) => ({
	textField: {
		backgroundColor: "white",
	},
	panel: {
		backgroundColor: "white",
		borderRadius: "5px",
		boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
	},
	loadedImage: {
		width: "100%",
		maxWidth: "300px",
		maxHeight: "170px",
		marginBottom: "5px",
	},
	headerText: {
		// fontWeight: "bold"
		fontSize: "18px"
	}
}));
