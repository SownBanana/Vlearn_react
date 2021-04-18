import React, { useEffect, useRef, useState } from "react";
import {
	TextField,
	Grid,
	Container,
	Typography,
	makeStyles,
	withTheme,
} from "@material-ui/core";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5/build/ckeditor";
import CKViewer from "commons/components/CKViewer";

import Prism from "prismjs";
// import "prismjs/themes/prism.css";
import "prismjs/themes/prism-okaidia.css";
import SectionList from "./SectionList";

export default function InputCourse({ course, setCourse }) {
	const classes = useStyles();
	const [intro, setIntro] = useState(
		'<pre><code class="language-javascript">const i = 12;</code></pre><p><code>dasdsad</code></p><figure class="table"><table><tbody><tr><td style="border-bottom:solid hsl(240, 75%, 60%);border-left:solid hsl(240, 75%, 60%);border-right:solid hsl(240, 75%, 60%);border-top:solid hsl(240, 75%, 60%);">&nbsp;</td><td style="border-bottom:solid hsl(240, 75%, 60%);border-left:solid hsl(240, 75%, 60%);border-right:solid hsl(240, 75%, 60%);border-top:solid hsl(240, 75%, 60%);">&nbsp;</td><td>&nbsp;</td></tr><tr><td style="border-bottom:solid hsl(240, 75%, 60%);border-left:solid hsl(240, 75%, 60%);border-right:solid hsl(240, 75%, 60%);border-top:solid hsl(240, 75%, 60%);">&nbsp;</td><td style="border-bottom:solid hsl(240, 75%, 60%);border-left:solid hsl(240, 75%, 60%);border-right:solid hsl(240, 75%, 60%);border-top:solid hsl(240, 75%, 60%);">&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure>'
	);
	// const checkLoaded =
	// useEffect(() => {
	// 	console.log("====", intro);
	// 	for (let el of introDis.current.children) {
	// 		if (el.nodeName == "PRE" && el.children[0].nodeName == "CODE")
	// 			Prism.highlightElement(el.children[0]);
	// 	}
	// 	// Prism.highlightAll();
	// }, [intro]);

	const setSections = (sections) => {
		setCourse({ ...course, sections: sections });
	};
	return (
		<Container>
			<form>
				<Grid container spacing={1} direction="row" justify="space-around">
					<Grid
						item
						md={9}
						sm={12}
						container
						spacing={2}
						justify="center"
						alignItems="center"
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
								value={course.name}
								onChange={(e) => setCourse({ ...course, name: e.target.value })}
							/>
						</Grid>
						<Grid container alignItems="stretch" item md={12} xs={10}>
							<Typography variant="subtitle1" color="initial">
								Giới thiệu khóa học
							</Typography>

							<CKEditor
								editor={Editor}
								config={editorConfiguration}
								data={course.intro}
								onReady={(editor) => {
									// You can store the "editor" and use when it is needed.
									console.log("Editor is ready to use!", editor);
								}}
								onChange={(event, editor) => {
									const data = editor.getData();
									// setIntro((intro) => (intro = data));
									setCourse({ ...course, intro: data });
									// console.log({ event, editor, data });
								}}
								onBlur={(event, editor) => {
									console.log("Blur.", editor);
								}}
								onFocus={(event, editor) => {
									console.log("Focus.", editor);
								}}
							/>

							{/* <Grid item xs={12} md={12} id="markThis" ref={introPre}>
								<CKEditor
									editor={Editor}
									data={intro}
									disabled={true}

									//  {
									// allowedCommands: [ 'bold' ]
									// }
								/>
							</Grid> */}
							<Grid item xs={12}>
								<CKViewer content={intro} />
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
							<Grid item>
								<SectionList
									sections={course.sections}
									setSections={setSections}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid
						item
						md={3}
						sm={12}
						container
						spacing={1}
						className={classes.panel}
					>
						Right Bar
					</Grid>
				</Grid>
			</form>
		</Container>
	);
}

const useStyles = makeStyles((theme) => ({
	textField: {
		backgroundColor: "white",
	},
	panel: {
		backgroundColor: "#cfe8fc",
	},
}));
const editorConfiguration = {
	toolbar: [
		"heading",
		"|",
		"undo",
		"redo",
		"fontFamily",
		"fontColor",
		"fontSize",
		"|",
		"bulletedList",
		"numberedList",
		"outdent",
		"indent",
		"italic",
		"bold",
		"|",
		"insertTable",
		"link",
		"imageUpload",
		"blockQuote",
		"mediaEmbed",
		"alignment",
		"CKFinder",
		"code",
		"codeBlock",
		"htmlEmbed",
		"MathType",
		"ChemType",
		"superscript",
		"subscript",
	],
	language: "vi",
	image: {
		toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
	},
	table: {
		contentToolbar: [
			"tableColumn",
			"tableRow",
			"mergeTableCells",
			"tableCellProperties",
			"tableProperties",
		],
	},
};
