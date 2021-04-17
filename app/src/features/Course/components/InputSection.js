import React, { useEffect, useRef } from "react";
import {
	TextField,
	Grid,
	Container,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Chip,
	AccordionActions,
	Divider,
	Button,
	makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

export default function InputSection({ section, handleChange, handleDelete }) {
	const classes = useStyles();
	const sectionName = useRef();
	const sectionClone = { ...section };

	const changeValue = (e) => {
		console.log("======>", e);
	};
	var count = 0;

	const valueChange = (e) => {
		section.name = e.target.textContent;
		console.log("==>", count);
		handleChange(section);
	};
	useEffect(() => {
		console.log("Init section: ", section.name);
		sectionName.current.setAttribute("contentEditable", true);
		sectionName.current.addEventListener("input", valueChange);
		count += 1;
		return () => {
			sectionName.current.removeEventListener("input", valueChange, false);
		};
	});
	return (
		<div>
			<Accordion defaultExpanded className={classes.card}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1c-content"
					id="panel1c-header"
				>
					<div className={classes.column2}>
						<Typography
							ref={sectionName}
							component="div"
							className={clsx(classes.heading)}
						>
							{sectionClone.name}
						</Typography>
						<TextField
							required={true}
							value={section.name}
							onChange={(e) => {
								section.name = e.target.value;
								handleChange(section);
							}}
						/>
					</div>
					<div className={classes.column}>
						<Typography className={classes.secondaryHeading}>Select</Typography>
					</div>
				</AccordionSummary>
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
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	card: {
		border: "1px solid #80808036",
	},
	root: {
		width: "100%",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		textAlign: "left",
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
