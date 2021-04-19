import React from "react";
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

import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

import Editor from "commons/components/CKEditor/CKEditor";

export default function LessonInput({
	lesson,
	handleChange,
	expanded,
	handleExpanded,
}) {
	const classes = useStyles();
	const changeLessonContent = (content) => {
		handleChange({ ...lesson, content: content });
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
				{/* <DragIndicatorIcon color="action" data-movable-handle /> */}
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
			</AccordionSummary>
			<AccordionDetails>
				{/* <Typography></Typography> */}
				<Grid item md={12} xs={12}>
					<Editor content={lesson.content} handler={changeLessonContent} />
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
}));
