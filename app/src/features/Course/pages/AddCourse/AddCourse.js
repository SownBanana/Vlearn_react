import React, { useState } from "react";
import InputCourse from "features/Course/components/InputCourse";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function AddCourse() {
	const [course, setCourse] = useState({
		name: "",
		intro:
			'<pre><code class="language-javascript">const i = 12;</code></pre><p><code>dasdsad</code></p><figure class="table"><table><tbody><tr><td style="border-bottom:solid hsl(240, 75%, 60%);border-left:solid hsl(240, 75%, 60%);border-right:solid hsl(240, 75%, 60%);border-top:solid hsl(240, 75%, 60%);">&nbsp;</td><td style="border-bottom:solid hsl(240, 75%, 60%);border-left:solid hsl(240, 75%, 60%);border-right:solid hsl(240, 75%, 60%);border-top:solid hsl(240, 75%, 60%);">&nbsp;</td><td>&nbsp;</td></tr><tr><td style="border-bottom:solid hsl(240, 75%, 60%);border-left:solid hsl(240, 75%, 60%);border-right:solid hsl(240, 75%, 60%);border-top:solid hsl(240, 75%, 60%);">&nbsp;</td><td style="border-bottom:solid hsl(240, 75%, 60%);border-left:solid hsl(240, 75%, 60%);border-right:solid hsl(240, 75%, 60%);border-top:solid hsl(240, 75%, 60%);">&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure>',
		sections: [
			{
				uuid: 1,
				name: "section 1",
			},
			{
				uuid: 2,
				name: "chuong 2",
			},
		],
	});

	return (
		<div>
			<Grid
				container
				spacing={1}
				direction="column"
				justify="center"
				alignItems="center"
				alignContent="center"
				wrap="nowrap"
			>
				<Grid container direction="column" spacing={1}>
					<Grid item md={8}>
						<Typography variant="h5" color="initial">
							This is Add Course {course.sections[0].name}
						</Typography>
					</Grid>
				</Grid>
				<br />
				<Grid container justify="center">
					<Grid item md={12}>
						<InputCourse course={course} setCourse={setCourse} />
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}
