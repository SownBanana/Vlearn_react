import React, { lazy, Suspense, useEffect } from "react";
import {
	TextField,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Chip,
	AccordionActions,
	Divider,
	Button,
	makeStyles,
	Box,
	Hidden,
	Tooltip,
	IconButton,
	Grid,
} from "@material-ui/core";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { Movie } from "@material-ui/icons";
import CKViewer from "commons/components/CKEditor/CKViewer";
import VideoPlayer from "commons/components/VideoPlayer/VideoPlayer";
import ConfirmButton from "commons/components/Button/ConfirmIconButton";
import {
	setOpen,
	setTitle,
	setContent,
	setHandler,
} from "commons/components/EditorModal/editorSlice";
import { useDispatch } from "react-redux";
export default function LessonInput({
	lesson,
	handleChange,
	handleDelete,
	expanded,
	handleExpanded,
}) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const changeLessonContent = (content) => {
		handleChange({ ...lesson, content: content });
	};

	const deleteLesson = () => {
		handleDelete(lesson);
	};
	const openEditor = (e) => {
		e.stopPropagation();
		dispatch(setTitle("Bài " + lesson.name));
		dispatch(setContent(lesson.content));
		dispatch(setHandler(changeLessonContent));
		dispatch(setOpen(true));
	};

	return (
		<Accordion
			expanded={expanded === lesson.uuid}
			onChange={handleExpanded(lesson.uuid)}
			className={classes.root}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<DragIndicatorIcon color="action" data-movable-handle />
				<TextField
					className={classes.heading}
					fullWidth
					required={true}
					// InputProps={{ disableUnderline: true }}
					InputProps={{
						classes: {
							underline: classes.underline,
							input: classes.labelInput,
						},
					}}
					value={lesson.name}
					onClick={(e) => e.stopPropagation()}
					onChange={(e) => {
						handleChange({ ...lesson, name: e.target.value });
					}}
				/>
				<IconButton
					color="primary"
					onClick={openEditor}
					edge="start"
					className="button"
				>
					<EditRoundedIcon />
				</IconButton>
				<ConfirmButton
					color="secondary"
					onClick={deleteLesson}
					edge="start"
					className="button"
					title={"Xóa bài " + lesson.name}
					message={"Bạn thực sự muốn xóa bài học này?"}
				>
					<DeleteRoundedIcon />
				</ConfirmButton>
			</AccordionSummary>
			<AccordionDetails className={classes.content}>
				<Grid container spacing={1} direction="column">
					<Grid item md={12} xs={12}>
						{lesson.video_url && (
							<VideoPlayer width="inherit" url={lesson.video_url} />
						)}
					</Grid>
					<Grid
						style={{ cursor: "auto" }}
						item
						md={12}
						xs={12}
						className="handleCKSpace"
						container
						direction="row"
						alignItems="center"
						justify="space-between"
					>
						<Grid item md={8} xs={12}>
							<TextField
								id=""
								label=""
								value={lesson.video_url}
								fullWidth
								onChange={(e) =>
									handleChange({ ...lesson, video_url: e.target.value })
								}
							/>
						</Grid>
						<Grid item md={4} xs={12}>
							<input
								accept="image/*"
								className={classes.input}
								id="icon-button-file"
								type="file"
							/>
							<label htmlFor="icon-button-file">
								<Button
									variant="contained"
									color="primary"
									component="span"
									endIcon={<Movie />}
								>
									Upload
								</Button>
							</label>
						</Grid>
					</Grid>
					<Grid
						style={{ cursor: "auto" }}
						item
						md={12}
						xs={12}
						className="handleCKSpace"
					>
						<CKViewer content={lesson.content} />
					</Grid>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		padding: 0,
		borderBottom: "1px solid #d3d3d378",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	underline: {
		"&::before": {
			border: "none",
			transition: "3s",
		},
		"&::after": {
			// border: "2px solid red",
		},
	},
	labelInput: {
		// padding: 0,
		height: "auto",
	},
	input: {
		display: "none",
	},
	content: {
		backgroundColor: "#f0f0f0",
		padding: "15px",
	},
	// playerWrapper: {
	// 	position: "relative",
	// 	paddingTop: "56.25%" /* Player ratio: 100 / (1280 / 720) */,
	// },
	// reactPlayer: {
	// 	position: "absolute",
	// 	top: 0,
	// 	left: 0,
	// },
}));
