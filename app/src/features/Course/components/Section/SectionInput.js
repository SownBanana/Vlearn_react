import React, { useEffect, useState } from "react";
import {
	TextField,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Divider,
	makeStyles,
	Box,
	Hidden,
	Tooltip,
	IconButton,
	Typography,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import LessonList from "../Lesson/LessonList";
import uuidv4 from "commons/functions/uuidv4";
import { cloneDeep } from "lodash";
import ConfirmIconButton from "commons/components/Button/ConfirmIconButton";
import QuestionList from "../Question/QuestionList";
import SettingsIcon from '@material-ui/icons/Settings';
import SectionSettingDialog from './SectionSettingDialog'
import { CourseType } from "features/Course/constance";
import LiveLessonList from "../LiveLesson/LiveLessonList";
import { useSelector } from "react-redux";
import { fromTimeString } from "commons/functions/humanTime";
export default function SectionInput({
	section,
	handleChange,
	expanded,
	handleExpanded,
	handleDelete,
	setSection,
}) {
	const classes = useStyles();
	const type = useSelector((state) => state.editingCourse.course.type);
	const setLessons = (lessons) => {
		setSection({ ...section, lessons: lessons });
	};
	const setLiveLessons = (lessons) => {
		setSection({ ...section, live_lessons: lessons });
	};
	const deleteSection = () => {
		handleDelete(section);
	};
	const addLesson = (e) => {
		e.stopPropagation();
		console.log(e);
		console.log("Add Lesson");
		if (type === CourseType.LIVE) {
			var newLiveLessons = cloneDeep(section.live_lessons);
			newLiveLessons.push({ uuid: uuidv4(), order: newLiveLessons.length > 0 ? newLiveLessons[newLiveLessons.length - 1].order + 1 : 0 });
			setLiveLessons(newLiveLessons);
		} else {
			var newLessons = cloneDeep(section.lessons);
			newLessons.push({ uuid: uuidv4(), order: newLessons.length > 0 ? newLessons[newLessons.length - 1].order + 1 : 0 });
			setLessons(newLessons);
		}
	};
	const setQuestions = (questions) => {
		setSection({ ...section, questions: questions });
	};
	const addQuestion = (e) => {
		e.stopPropagation();
		console.log(e);
		console.log("Add Question");
		var newQuestions = cloneDeep(section.questions);
		newQuestions.push({ uuid: uuidv4(), answers: [], order: newQuestions.length > 0 ? newQuestions[newQuestions.length - 1].order + 1 : 0 });
		setQuestions(newQuestions);
		// setSection({ section, lessons: [...section.lessons, { uuid: uuidv4() }] });
	};
	const [open, setOpen] = useState(false)
	const openSetting = (e) => {
		e.stopPropagation();
		setOpen(true);
	}
	useEffect(() => {
		console.log("rerender section");
	});
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
							title="Th??m c??u h???i"
							placement="top"
							enterDelay={200}
							arrow
						>
							<IconButton
								// color="warning.main"
								onClick={addQuestion}
								classes={{ root: classes.warningBtn }}
							>
								<HelpRoundedIcon />
							</IconButton>
						</Tooltip>
						<Tooltip
							className="nav_btn"
							title="Th??m b??i h???c"
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
							title="X??a ch????ng"
							placement="top"
							enterDelay={200}
							arrow
						>
							<ConfirmIconButton
								color="secondary"
								onClick={deleteSection}
								edge="start"
								className="button"
								// title={"X??a ch????ng " + section.name}
								message={"B???n th???c s??? mu???n x??a ch????ng h???c n??y?"}
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
					<div className={classes.column}>
						<Typography className={classes.secondaryHeading}>{
							fromTimeString(section.start_time)
						}</Typography>
						<Typography className={classes.secondaryHeading}>{
							fromTimeString(section.end_time)
						}</Typography>
					</div>
					<IconButton onClick={openSetting}>
						<SettingsIcon color="action" />
					</IconButton>

				</AccordionSummary>
				<Divider />
				<AccordionDetails className={classes.details}>
					<LiveLessonList lessons={section.live_lessons} setLessons={setLiveLessons} />
					<LessonList lessons={section.lessons} setLessons={setLessons} />
					<Divider />
					<QuestionList questions={section.questions} setQuestions={setQuestions} />
				</AccordionDetails>
			</Accordion>
			<SectionSettingDialog
				open={open}
				handleClose={(e) => {
					setOpen(false)
				}}
				section={section}
				setSection={setSection}

			/>
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
		fontSize: theme.typography.pxToRem(13),
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
		display: "block",
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
