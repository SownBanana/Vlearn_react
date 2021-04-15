import React from "react";
import InputCourse from "features/Course/components/InputCourse";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function index() {
	return (
		<div>
			<Grid container direction="column" alignItems="flex-start" spacing={1}>
				<Grid item>
					<Typography variant="h5" color="initial">
						This is Add Course
					</Typography>
				</Grid>
				<Grid item>
					<InputCourse />
				</Grid>
			</Grid>
		</div>
	);
}
