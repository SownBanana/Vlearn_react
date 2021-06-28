import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import {
	Box,
	IconButton,
	makeStyles,
	Tooltip,
	useMediaQuery,
} from "@material-ui/core";
import { useHistory } from "react-router";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";
import { CourseStatus, CourseType } from "features/Course/constance";
import { useSelector } from "react-redux";
import { COURSE_THUMBNAIL } from "commons/enums/ImageDefault";
import { LocalLibrary, Person } from "@material-ui/icons";
import EditorChoiceIcon from "commons/components/EditorChoiceIcon";

export default function FlatCourseItem({ course }) {
	const classes = useStyle();
	const history = useHistory();
	const isDraft = course.status === CourseStatus.DRAFT;
	const username = useSelector(state => state.auth.user.username);
	const editCourse = () => {
		let path = `/courses/i/${username}/edit/${course.id}`;
		history.push(path);
	};
	const goToCourse = (id) => {
		history.push(`/courses/learn/${id}`)
	};
	const isMobile = useMediaQuery("(max-width: 760px)");
	return (
		<Card className={
			course.status === CourseStatus.DRAFT
				? classes.rootDraft
				: course.status === CourseStatus.REVIEWING ?
					classes.rootReviewing
					: course.status === CourseStatus.REJECTED ?
						classes.rootRejected
						: classes.rootPublish}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={course.thumbnail_url || COURSE_THUMBNAIL}
					title={course.title}
				/>
				<CardContent className={classes.content}>
					{course.status === CourseStatus.DRAFT
						? <PostAddOutlinedIcon className={classes.draftColor} />
						: course.status === CourseStatus.REVIEWING ?
							<PostAddOutlinedIcon className={classes.reviewingColor} /> : null
					}
					{/* <Box display="flex" justifyContent="center"> */}
					{isMobile ? (
						<Typography className={classes.title} variant="subtitle2">
							{course.title}
							{
								course.is_editor_choice ?
									<EditorChoiceIcon />
									: <></>
							}
						</Typography>
					) : (
						<Typography className={classes.title} variant="h6">
							{course.title}
							{
								course.is_editor_choice ?
									<EditorChoiceIcon />
									: <></>
							}
						</Typography>
					)}

					{/* </Box> */}
				</CardContent>
			</CardActionArea>
			<CardActions style={{ padding: "5px 10px 5px 20px" }}>
				{
					course.type === CourseType.LIVE &&
					<Box className={classes.actionIcon}>
						<span className={classes.liveIcon}>LIVE</span>
					</Box>
				}
				<Box className={classes.actionIcon}>
					<Person fontSize="default" style={{ fontSize: 18 }} />
					<span className={classes.actionButton}>{course.total}</span>
				</Box>
				<Box className={classes.actionIcon}>
					<GradeRoundedIcon fontSize="default" style={{ fontSize: 18 }} />
					<span className={classes.actionButton}>{course.rate_avg}</span>
				</Box>
				<Tooltip title="Vào lớp" placement="top">
					<IconButton
						edge="start"
						className={classes.actionButton}
						onClick={() => goToCourse(course.id)}
					>
						<LocalLibrary />
					</IconButton>
				</Tooltip>
				<Tooltip title="Chỉnh sửa" placement="top">
					<IconButton
						edge="start"
						className={classes.actionButton}
						onClick={editCourse}
					>
						<EditRoundedIcon />
					</IconButton>
				</Tooltip>
			</CardActions>
		</Card>
	);
}

const useStyle = makeStyles((theme) => ({
	rootDraft: {
		borderRight: `2px solid ${theme.palette.warning.main}`,
		// minHeight: 64,
		// borderColor: theme.palette.secondary.dark,
		'&:before': {
			position: "absolute",
			zIndex: 3,
			content: '"Nháp"',
			display: "block",
			border: "1px solid #f57f17a1",
			background: "#f57f17",
			padding: "2px 10px",
			color: "white",
			borderRadius: "5px 0 19px 0"
		}
	},
	rootReviewing: {
		borderRight: `2px solid ${theme.palette.success.main}`,
		'&:before': {
			position: "absolute",
			zIndex: 3,
			content: '"Đang duyệt"',
			display: "block",
			border: "1px solid #27822ba1",
			background: "#27822b",
			padding: "2px 10px",
			color: "white",
			borderRadius: "5px 0 19px 0"
		}
	},
	rootRejected: {
		borderRight: `2px solid ${theme.palette.secondary.dark}`,
		'&:before': {
			position: "absolute",
			zIndex: 3,
			content: '"Từ chối"',
			display: "block",
			border: "1px solid #7f1313c9",
			background: "#b0002ab0",
			padding: "2px 10px",
			color: "white",
			borderRadius: "5px 0 19px 0"
		}
	},
	rootPublish: {
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
		fontSize: 13,
	},
	actionIcon: {
		// color: theme.palette.rate.main,
		zIndex: 3,
		marginLeft: "auto",
		fontSize: 18,
		color: "white",
		margin: 0,
		alignItems: "center",
		display: "flex",
	},
	content: {
		position: "absolute",
		zIndex: 2,
		color: "white",
		width: "inherit",
		textAlign: "initial",
		background:
			"linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 27%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.2) 77%, rgba(0,0,0,0.5) 90%, rgba(0,0,0,0.75) 100%)",
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
	draftColor: {
		color: theme.palette.secondary.dark,
	},
	reviewingColor: {
		color: theme.palette.success.main,
	},
	liveIcon: {
		fontSize: 12,
		fontWeight: "bold",
		padding: "1px 3px",
		backgroundColor: "red",
		borderRadius: 3
	}
}));
