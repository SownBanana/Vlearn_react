import React, { lazy, Suspense } from "react";
import {
	TextField,
	Grid,
	Container,
	Typography,
	makeStyles,
	MuiThemeProvider,
} from "@material-ui/core";
import EditorModal from "commons/components/EditorModal/EditorModal";
import SectionList from "../Section/SectionList";
// import CKEditor from "commons/components/CKEditor/CKEditor";
// import Lazy from "react-lazyload";
import { DropzoneArea } from "material-ui-dropzone";
import uploadApi from "commons/api/upload/upload";
import dropZoneTheme from "theme/fullImageDropzone";
import { useSelector } from "react-redux";
// import { storeCourse } from "features/Course/editingCourseSlice";

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
	// const setSections = (sections) => {
	// 	setCourse({ ...course, sections: sections });
	// };

	const introHandler = (data) => {
		setCourse({ ...course, introduce: data });
	};

	return (
		<Container maxWidth="xl">
			<form>
				<Grid container spacing={5} direction="row" justify="space-around">
					<Grid
						item
						md={7}
						sm={12}
						container
						spacing={2}
						justify="center"
						alignItems="center"
						className={classes.panel}
					>
						<Grid container item md={12} xs={10}>
							<Typography variant="subtitle1" color="initial">
								Tên khóa học
							</Typography>
							<TextField
								className={classes.textField}
								id="name"
								variant="outlined"
								fullWidth
								value={course.title}
								onChange={(e) =>
									setCourse({ ...course, title: e.target.value })
								}
							/>
						</Grid>
						<Grid container alignItems="stretch" item md={12} xs={10}>
							<Typography variant="subtitle1" color="initial">
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
						<Grid
							container
							alignItems="stretch"
							direction="column"
							item
							md={12}
							xs={10}
						>
							<Typography align="left" variant="subtitle1" color="initial">
								Chương học
							</Typography>
							<Grid item container md={12} direction="column">
								<SectionList
								// sections={course.sections}
								// setSections={setSections}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						item
						md={4}
						sm={12}
						container
						spacing={1}
						className={classes.panel}
					>
						<Typography align="left" variant="subtitle1" color="initial">
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
						<Typography align="left" variant="subtitle1" color="initial">
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
						/>
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
		marginBottom: "5px",
	},
}));
