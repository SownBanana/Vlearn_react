import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import {
	Divider,
	IconButton,
	makeStyles,
	useMediaQuery,
} from "@material-ui/core";
import { useHistory } from "react-router";
import clsx from "clsx";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";
import { CourseStatus } from "features/Course/constance";
export default function FlatCourseItem({ course }) {
	const classes = useStyle();
	const history = useHistory();
	const isDraft = course.status === CourseStatus.DRAFT;
	const editCourse = () => {
		let path = `/courses/edit/${course.id}`;
		history.push(path);
	};
	const isMobile = useMediaQuery("(max-width: 760px)");
	return (
		<Card className={isDraft && classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={course.thumbnail_url}
					title={course.title}
				/>
				<CardContent className={classes.content}>
					{isDraft && <PostAddOutlinedIcon />}

					{isMobile ? (
						<Typography className={classes.title} variant="subtitle2">
							{course.title}
						</Typography>
					) : (
						<Typography className={classes.title} variant="h6">
							{course.title}
						</Typography>
					)}
				</CardContent>
			</CardActionArea>
			<CardActions style={{ padding: "5px 10px 5px 20px" }}>
				{/* <span className={classes.actionButton}>5</span> */}
				<GradeRoundedIcon className={classes.actionIcon} fontSize="default" />
				<IconButton
					edge="start"
					className={classes.actionButton}
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
		border: `2px solid`,
		borderColor: theme.palette.secondary.dark,
	},
	media: {
		minHeight: 60,
		position: "absolute",
		width: "inherit",
		zIndex: 1,
	},

	actionButton: {
		marginLeft: "auto",
		zIndex: 3,
		color: "white",
		fontSize: 16,
	},
	actionIcon: {
		// color: theme.palette.rate.main,
		zIndex: 3,
		marginLeft: "auto",
		fontSize: 18,
		color: "white",
		margin: 0,
	},
	content: {
		position: "absolute",
		zIndex: 2,
		color: "white",
		width: "inherit",
		textAlign: "initial",
		backgroundColor: "#00000050",
		display: "flex",
		alignItems: "center",
		minHeight: 60,
	},
	title: {
		textOverflow: "ellipsis",
		overflow: "hidden",
		width: "75%",
		whiteSpace: "nowrap",
	},
}));
