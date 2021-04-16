import React from "react";
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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5/build/ckeditor";

export default function InputCourse({ course }) {
	const classes = useStyles();

	return (
		<Container maxWidth="md">
			<form>
				<Grid container spacing={1} direction="row" justify="space-around">
					<Grid
						item
						md={8}
						sm={12}
						container
						spacing={2}
						justify="center"
						alignItems="center"
					>
						<Grid container item md={12}>
							<Typography variant="subtitle1" color="initial">
								Tên khóa học
							</Typography>
							<TextField
								id="name"
								variant="outlined"
								fullWidth
								//   value={}
								//   onChange={}
							/>
						</Grid>
						<Grid
							container
							direction="column"
							alignItems="flex-start"
							item
							md={12}
						>
							<Grid item>
								<Typography variant="subtitle1" color="initial">
									Giới thiệu khóa học
								</Typography>
							</Grid>
							<Grid item sm={8} md={12}>
								<CKEditor
									editor={Editor}
									config={editorConfiguration}
									data="<p>Hello from CKEditor 5!</p>"
									onReady={(editor) => {
										// You can store the "editor" and use when it is needed.
										console.log("Editor is ready to use!", editor);
									}}
									onChange={(event, editor) => {
										const data = editor.getData();
										console.log({ event, editor, data });
									}}
									onBlur={(event, editor) => {
										console.log("Blur.", editor);
									}}
									onFocus={(event, editor) => {
										console.log("Focus.", editor);
									}}
								/>
							</Grid>
						</Grid>
						<Grid item md={12}>
							<Grid item>Chương học</Grid>
							<Grid item>
								<Accordion defaultExpanded>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1c-content"
										id="panel1c-header"
									>
										<div className={classes.column}>
											<Typography className={classes.heading}>
												Location
											</Typography>
										</div>
										<div className={classes.column}>
											<Typography className={classes.secondaryHeading}>
												Select trip destination
											</Typography>
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
												<a
													href="#secondary-heading-and-columns"
													className={classes.link}
												>
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
							</Grid>
						</Grid>
					</Grid>
					<Grid item md={4} sm={12} container spacing={1}>
						Right Bar
					</Grid>
				</Grid>
			</form>
		</Container>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
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
const editorConfiguration = {
	toolbar: [
		"heading",
		"fontFamily",
		"fontSize",
		"fontColor",
		"bold",
		"italic",
		"|",
		"alignment",
		"bulletedList",
		"numberedList",
		"|",
		"outdent",
		"indent",
		"|",
		"link",
		"imageUpload",
		"insertTable",
		"mediaEmbed",
		"|",
		"blockQuote",
		"codeBlock",
		"code",
		"|",
		"undo",
		"redo",
	],
};
