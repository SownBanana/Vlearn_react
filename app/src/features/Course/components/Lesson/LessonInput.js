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
} from "@material-ui/core";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

export default function LessonInput({
	lesson,
	handleChange,
	expanded,
	handleExpanded,
}) {
	const classes = useStyles();
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
				<Typography className={classes.heading}>Accordion 1</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Typography>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
					malesuada lacus ex, sit amet blandit leo lobortis eget.
				</Typography>
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
}));
