import React, { useEffect, useRef, useState } from "react";
import {
	TextField,
	Grid,
	Container,
	Typography,
	makeStyles,
	withTheme,
} from "@material-ui/core";

import CKViewer from "commons/components/CKViewer";
import CKEditor from "commons/components/CKEditor";

// import Prism from "prismjs";
// import "prismjs/themes/prism.css";
// import "prismjs/themes/prism-okaidia.css";
import SectionList from "./SectionList";

export default function InputCourse({ course, setCourse }) {
	const classes = useStyles();
	const [intro, setIntro] = useState(
		'<pre><code class="language-javascript">const i = 12;</code></pre><p><code>dasdsad</code></p><figure class="table"><table><tbody><tr><td style="border-bottom:solid hsl(240, 75%, 60%);border-left:solid hsl(240, 75%, 60%);border-right:solid hsl(240, 75%, 60%);border-top:solid hsl(240, 75%, 60%);">&nbsp;</td><td style="border-bottom:solid hsl(240, 75%, 60%);border-left:solid hsl(240, 75%, 60%);border-right:solid hsl(240, 75%, 60%);border-top:solid hsl(240, 75%, 60%);">&nbsp;</td><td>&nbsp;</td></tr><tr><td style="border-bottom:solid hsl(240, 75%, 60%);border-left:solid hsl(240, 75%, 60%);border-right:solid hsl(240, 75%, 60%);border-top:solid hsl(240, 75%, 60%);">&nbsp;</td><td style="border-bottom:solid hsl(240, 75%, 60%);border-left:solid hsl(240, 75%, 60%);border-right:solid hsl(240, 75%, 60%);border-top:solid hsl(240, 75%, 60%);">&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure>'
	);

	const setSections = (sections) => {
		setCourse({ ...course, sections: sections });
	};

	const introHandler = (data) => {
		setCourse({ ...course, intro: data });
	};

	const createMarkup = () => {
		return { __html: intro };
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
							<CKEditor content={course.intro} handler={introHandler} />

							<Grid item xs={12}>
								<CKViewer content={intro} />
								{/* <div
									dangerouslySetInnerHTML={createMarkup()}
									className="ck-content"
								></div> */}
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
