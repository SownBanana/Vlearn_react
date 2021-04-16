import React from "react";
import InputCourse from "features/Course/components/InputCourse";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function index() {
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
							This is Add Course
						</Typography>
					</Grid>
				</Grid>
				<br />
				<Grid container justify="center">
					<Grid item md={12}>
						<InputCourse />
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}
