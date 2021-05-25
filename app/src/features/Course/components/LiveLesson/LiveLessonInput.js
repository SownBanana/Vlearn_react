import React, { lazy, Suspense, useState } from "react";
import {
	TextField,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Button,
	makeStyles,
	IconButton,
	Grid,
	Box,
	Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { Movie, Refresh, Settings } from "@material-ui/icons";
import ConfirmButton from "commons/components/Button/ConfirmIconButton";
import {
	setOpen,
	setTitle,
	setContent,
	setHandler,
} from "commons/components/EditorModal/editorSlice";
import { useDispatch } from "react-redux";
import { setContentEditMode, uploadVideo } from 'features/Course/editingCourseSlice'
import { useHistory, useParams } from "react-router-dom";
import LiveLessonSettingDialog from "./LiveLessonSettingDialog";
import { fromTimeString } from "commons/functions/humanTime";
// import CKViewer from "commons/components/CKEditor/CKViewer";
const CKViewer = lazy(() => import("commons/components/CKEditor/CKViewer"));

export default function LiveLessonInput({
	lesson,
	handleChange,
	handleDelete,
	expanded,
	handleExpanded,
}) {
	const dispatch = useDispatch();
	const classes = useStyles();

	const [open, setOpen] = useState(false)
	const openSetting = (e) => {
		e.stopPropagation();
		setOpen(true);
	}

	const changeLessonContent = (content) => {
		handleChange({ ...lesson, content: content });
	};
	const deleteLesson = () => {
		handleDelete(lesson);
	};

	const history = useHistory();
	const params = useParams();
	const openLessonEdit = (e) => {
		e.stopPropagation();
		dispatch(setTitle("Bài " + lesson.name));
		dispatch(setContent(lesson.content));
		dispatch(setHandler(changeLessonContent));
		dispatch(setContentEditMode(true));
	}

	return (
		<Box width="100%">

			<Accordion
				expanded={expanded === lesson.uuid}
				onChange={handleExpanded(lesson.uuid)}
				className={classes.root}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					classes={{ root: classes.summary, content: classes.summaryContent }}
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
						value={lesson.name || ""}
						onClick={(e) => e.stopPropagation()}
						onChange={(e) => {
							handleChange({ ...lesson, name: e.target.value });
						}}
					/>
					<Box width="100%" >
						<Typography className={classes.secondaryHeading}>{
							fromTimeString(lesson.start_time)
						}</Typography>
						<Typography className={classes.secondaryHeading}>{
							fromTimeString(lesson.end_time)
						}</Typography>
					</Box>
					<IconButton
						color="primary"
						// onClick={openEditor}
						onClick={openLessonEdit}
						edge="start"
						className="button"
					>
						<EditRoundedIcon />
					</IconButton>
					<IconButton onClick={openSetting}>
						<Settings color="action" />
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
						<Grid
							style={{ cursor: "auto" }}
							item
							md={12}
							xs={12}
							className="handleCKSpace"
						>
							<Suspense fallback={<div>Loading ...</div>}>
								<CKViewer content={lesson.content} highlightTrigger={expanded} reHighlight={true} />
							</Suspense>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>
			<LiveLessonSettingDialog
				open={open}
				handleClose={(e) => {
					setOpen(false)
				}}
				lesson={lesson}
				setLesson={handleChange}
			/>
		</Box>
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
		backgroundColor: "#f0f0f050",
		padding: "15px",
	},
	summary: {
		height: "70px",
		borderBottom: "1px solid #cecece60"
	},
	summaryContent: {
		alignItems: "center",
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(12),
		color: theme.palette.text.secondary,
	},
}));
