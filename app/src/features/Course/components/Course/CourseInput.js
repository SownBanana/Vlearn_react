import React, { lazy, useEffect, useRef, useState, Suspense } from "react";
import {
	TextField,
	Grid,
	Container,
	Typography,
	makeStyles,
	withTheme,
	MuiThemeProvider,
	Button,
} from "@material-ui/core";
import EditorModal from "commons/components/EditorModal/EditorModal";
import SectionList from "../Section/SectionList";
import { useDispatch, useSelector } from "react-redux";
import CKViewer from "commons/components/CKEditor/CKViewer";
// import CKEditor from "commons/components/CKEditor/CKEditor";
// import Lazy from "react-lazyload";
import { DropzoneArea } from "material-ui-dropzone";
import uploadApi from "commons/api/upload/upload";
import dropZoneTheme from "theme/fullImageDropzone";
import { get } from "react-hook-form";
import { storeCourse } from "features/Course/editingCourseSlice";

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
	const dispatch = useDispatch();
	const setSections = (sections) => {
		setCourse({ ...course, sections: sections });
	};

	const introHandler = (data) => {
		setCourse({ ...course, introduce: data });
	};

	const handleKeySpace = (e) => {
		setTimeout(function () {
			// console.log(
			// evt.target
			// window.getSelection().getRangeAt(0).startOffset,
			// window.getSelection().baseNode.parentElement,
			// evt.keyCode,
			// evt.srcElement
			// );
			// console.log("===", window.getSelection().getRangeAt(0).startOffset);
			var parent = e.target.closest(".handleCKSpace");
			if (e.keyCode === 32 && parent != null) {
				console.log("parent", parent);
				var target = window.getSelection().focusNode;
				var element = target.parentElement;
				console.log(element);
				var index = window.getSelection().getRangeAt(0).startOffset;
				// var re = new RegExp(String.fromCharCode(160), "g");
				var content = element.innerHTML.replace("&nbsp;", " ");
				console.log(index, content);
				console.log("after replace|", content);
				if (index === 0) content = "&nbsp;" + content;
				else if (index === content.length && content[content.length - 1] != " ")
					content = content + "&nbsp;";
				else
					content =
						content.slice(0, index) +
						" " +
						content.slice(index, content.length);
				console.log("after change|", content);
				element.innerHTML = content;
				console.log(element);
				element.focus();
				var range = document.createRange();
				var sel = window.getSelection();

				range.setStart(target, index);
				// range.collapse(true);

				sel.removeAllRanges();
				sel.addRange(range);
				// element.selectionStart = index;
				// element.selectionEnd = index;
			}
		}, 0);
	};
	useEffect(() => {
		document.removeEventListener("keydown", handleKeySpace, false);
		document.addEventListener("keydown", handleKeySpace);
		return () => {
			document.removeEventListener("keydown", handleKeySpace, false);
		};
	}, []);

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
								<Suspense fallback={<TextField disabled variant="outlined" />}>
									{/* <Suspense fallback={<div>Loading...</div>}> */}
									<CKEditor content={course.introduce} handler={introHandler} />
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
									sections={course.sections}
									setSections={setSections}
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
							<img className={classes.loadedImage} src={course.thumbnail_url} />
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
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								dispatch(storeCourse({ course: course }));
							}}
						>
							Lưu Khóa học
						</Button>
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
