import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import clsx from "clsx";
export default function CourseItem({ course }) {
	const classes = useStyle();
	const history = useHistory();
	const handleClick = (e) => {
		let path = `/courses/${course.id}`;
		history.push(path);
	}

	return (
		<Card className={classes.root}>
			<CardActionArea onClick={handleClick} className={classes.cardArea}>
				<CardMedia
					className={classes.media}
					image={course.thumbnail_url ? course.thumbnail_url : "https://i1.sndcdn.com/artworks-000351240072-kbcgdg-t500x500.jpg"}
					title={course.title}
				/>
				<CardContent className={classes.cardContent}>
					<Typography variant="body1" className={classes.title}>
						{course.title}
					</Typography>
					<Typography
						variant="caption"
						className={clsx(classes.introduce, "ck-content ck-viewer")}
						dangerouslySetInnerHTML={{ __html: course.introduce }}
					></Typography>
				</CardContent>
			</CardActionArea>

		</Card>
	);
}

const useStyle = makeStyles((theme) => ({
	root: {
		margin: "auto",
		maxWidth: 345,
		height: 300,
		display: "flex",
		flexDirection: "column",
		'&:hover $cardContent': {
			backgroundColor: "gray",
			color: "white",
			opacity: "0.8",
			height: "100%",
			transition: "0.2s ease-in"
		},
		'&:hover $media': {

			height: "100%",
			transition: "0.2s ease-in"
		},
		'&:hover $cardContent $introduce': {
			height: "unset",
			opacity: "1",
			transition: "0.3s ease-in"
		}
	},
	cardArea: {
		height: "100%"
	},
	media: {
		height: "65%",
		width: "-webkit-fill-available",
		position: "absolute",
		transition: "0.4s ease-out",
		top: 0,
	},
	cardContent: {
		height: "35%",
		padding: 5,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		transition: "0.4s ease-out",
		position: "absolute",
		bottom: 0,
		width: "100%",
		flexDirection: "column",


	},
	introduce: {
		// visibility: "hidden",
		padding: "0 5px 0 5px",
		color: "white",
		height: 0,
		opacity: "0",
		transition: "0.3s ease-out"
	},
	title: {
		// color: "#424242",
	},
}));
