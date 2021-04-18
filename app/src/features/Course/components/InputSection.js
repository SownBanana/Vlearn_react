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
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import clsx from "clsx";

export default function InputSection({
	section,
	handleChange,
	expanded,
	handleExpanded,
}) {
	const classes = useStyles();

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
				>
					<Hidden smUp>
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
							onChange={(e) => {
								section.name = e.target.value;
								handleChange(section);
							}}
						/>
					</div>
					{/* <div className={classes.column}>
						<Typography className={classes.secondaryHeading}>Select</Typography>
					</div> */}
				</AccordionSummary>
				<Divider />
				<AccordionDetails className={classes.details}>
					<div className={classes.column} />
					<div className={classes.column}>
						<Chip label="Barbados" onDelete={() => {}} />
					</div>
					<div className={clsx(classes.column, classes.helper)}>
						<Typography variant="caption">
							Select your destination of choice
							<br />
							<a href="#secondary-heading-and-columns" className={classes.link}>
								Learn more
							</a>
						</Typography>
					</div>
				</AccordionDetails>
				<Divider />
				<AccordionActions>
					<Button size="small">Cancel</Button>
					<Button size="small" color="primary">
						Save
					</Button>
				</AccordionActions>
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
}));
