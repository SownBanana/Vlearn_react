import React, { useEffect, useRef } from "react";
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
} from "@material-ui/core";
import clsx from "clsx";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import LessonList from "../Lesson/LessonList";
import { setCourse } from "features/Course/editingCourseSlice";
import uuidv4 from "commons/uuidv4";
import _ from "lodash";
import ConfirmIconButton from "commons/components/Button/ConfirmIconButton";
export default function SectionInput({
	section,
	handleChange,
	expanded,
	handleExpanded,
	handleDelete,
	setSection,
}) {
	const classes = useStyles();

	const setLessons = (lessons) => {
		setSection({ ...section, lessons: lessons });
	};
	const deleteSection = () => {
		handleDelete(section);
	};
	const addLesson = (e) => {
		e.stopPropagation();
		console.log(e);
		console.log("Add Lesson");
		var newLessons = _.cloneDeep(section.lessons);
		newLessons.push({ uuid: uuidv4() });
		setLessons(newLessons);
		// setSection({ section, lessons: [...section.lessons, { uuid: uuidv4() }] });
	};

	return (
		<Box mb={1}>
			<Accordion
				expanded={expanded === section.uuid}
				onChange={handleExpanded(section.uuid)}
				className={classes.card}
			>
				<AccordionSummary
					classes={{ content: classes.root }}
					expandIcon={<ExpandMoreIcon />}
					className="section"
				>
					<div className="btn_nav_group">
						<Tooltip
							className="nav_btn"
							title="Thêm câu hỏi"
							placement="top"
							enterDelay={200}
							arrow
						>
							<IconButton
								// color="warning.main"
								classes={{ root: classes.warningBtn }}
							>
								<HelpRoundedIcon />
							</IconButton>
						</Tooltip>
						<Tooltip
							className="nav_btn"
							title="Thêm bài học"
							placement="top"
							enterDelay={200}
							arrow
						>
							<IconButton
								onClick={addLesson}
								classes={{ root: classes.successBtn }}
								aria-label="add lesson"
							>
								<AddCircleRoundedIcon />
							</IconButton>
						</Tooltip>
						<Tooltip
							className="nav_btn"
							title="Xóa chương"
							placement="top"
							enterDelay={200}
							arrow
						>
							<ConfirmIconButton
								color="secondary"
								onClick={deleteSection}
								edge="start"
								className="button"
								// title={"Xóa chương " + section.name}
								message={"Bạn thực sự muốn xóa chương học này?"}
							>
								<CancelRoundedIcon />
							</ConfirmIconButton>
						</Tooltip>
					</div>
					<Hidden mdUp>
						<DragIndicatorIcon color="action" data-movable-handle />
					</Hidden>
					<div className={classes.column2}>
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
							value={section.name}
							onClick={(e) => e.stopPropagation()}
							onChange={(e) => {
								const newSection = { ...section, name: e.target.value };
								handleChange(newSection);
							}}
						/>
					</div>
					{/* <div className={classes.column}>
						<Typography className={classes.secondaryHeading}>Select</Typography>
					</div> */}
				</AccordionSummary>
				<Divider />
				<AccordionDetails className={classes.details}>
					<LessonList lessons={section.lessons} setLessons={setLessons} />
				</AccordionDetails>
			</Accordion>
		</Box>
	);
}

const useStyles = makeStyles((theme) => ({
	card: {
		border: "1px solid #80808036",
	},
	root: {
		alignItems: "center",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
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
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
	icon: {
		verticalAlign: "bottom",
		height: 20,
		width: 20,
	},
	details: {
		alignItems: "center",
		padding: 0,
	},
	column: {
		flexBasis: "33.33%",
	},
	column2: {
		flexBasis: "66.66%",
	},
	helper: {
		borderLeft: `2px solid ${theme.palette.divider}`,
		padding: theme.spacing(1, 2),
	},
	link: {
		color: theme.palette.primary.main,
		textDecoration: "none",
		"&:hover": {
			textDecoration: "underline",
		},
	},
	warningBtn: {
		color: theme.palette.warning.main,
	},
	successBtn: {
		color: theme.palette.success.main,
	},
	errorBtn: {
		color: theme.palette.error.main,
	},
}));
