import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { IconButton, makeStyles } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { useHistory } from "react-router";
import clsx from "clsx";
export default function CourseItemInstructor({ course }) {
	const classes = useStyle();
	const history = useHistory();
	const editCourse = () => {
		let path = `/courses/edit/${course.id}`;
		history.push(path);
	};
	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={course.thumbnail_url}
					title={course.title}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{course.title}
					</Typography>
					<div
						className={clsx(classes.introduce, "ck-content ck-viewer")}
						dangerouslySetInnerHTML={{ __html: course.introduce }}
					></div>
				</CardContent>
			</CardActionArea>
			<CardActions style={{ padding: "5px 10px 5px 20px" }}>
				<IconButton
					color="primary"
					edge="start"
					style={{ marginLeft: "auto" }}
					onClick={editCourse}
				>
					<EditRoundedIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}

const useStyle = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
		maxHeight: 300,
	},
	media: {
		height: 140,
	},
	introduce: {
		visibility: "hidden",
	},
}));
