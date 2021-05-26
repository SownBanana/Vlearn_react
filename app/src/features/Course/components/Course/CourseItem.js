import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Avatar, Box, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import clsx from "clsx";
import CKViewer from "commons/components/CKEditor/CKViewer";
import { Rating } from "@material-ui/lab";
import { Person } from "@material-ui/icons";
import { COURSE_THUMBNAIL } from "commons/enums/ImageDefault";
import { CourseType } from "features/Course/constance";
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
					image={course.thumbnail_url || COURSE_THUMBNAIL}
					title={course.title}
				/>
				<Avatar variant="square" className={clsx(classes.avatar, "avatar--large avatar--center")} src={course.instructor.avatar_url} />
				<CardContent className={classes.cardContent}>
					{
						course.type === CourseType.LIVE &&
						<Box className={classes.liveIcon}>
							<span>LIVE</span>
						</Box>
					}
					<Box className={classes.instructorName}>
						<Typography style={{ color: "white", fontWeight: "600", fontSize: 17 }} variant="body2">
							{course.instructor.name}
						</Typography>
					</Box>
					<Box className={classes.price}>
						<Typography style={{ color: "white", fontWeight: "600", fontSize: 17 }} variant="body2">
							{(course.price > 0 ? course.price : 'Miễn phí').toLocaleString('vi', {
								style: 'currency',
								currency: 'VND'
							})}
						</Typography>
					</Box>

					<Box
						style={{
							display: "flex",
							color: "#717171"
						}}>
						{
							course.rate_avg ?
								<Rating value={course.rate_avg} readOnly={true} size="small" />
								: <span>Chưa có đánh giá</span>
						}
					</Box>
					<Box className={classes.rating}>
						<Person style={{ fontSize: 14 }} fontSize="small" />
						<span style={{ fontSize: 13, marginRight: 3 }} >{course.total}</span>
					</Box>
					<Box
						mt={2}
						style={{
							// display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Typography variant="body1" className={classes.title}>
							{course.title}
						</Typography>
						<CKViewer className={classes.introduce} content={course.introduce} />
					</Box>
					{/* <Typography
						variant="caption"
						className={clsx(classes.introduce, "ck-content ck-viewer")}
						dangerouslySetInnerHTML={{ __html: course.introduce }}
					></Typography> */}
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
			backgroundColor: "#505050",
			color: "white",
			opacity: "0.8",
			height: "100%",
			transition: "0.2s ease"
		},
		'&:hover $media': {
			height: "100%",
			transition: "0.3s ease"
		},
		'&:hover $cardContent $introduce': {
			height: "unset",
			opacity: "1",
			transition: "0.3s ease"
		},
		'&:hover $avatar': {
			transform: "scale(0)",
			transition: "0.3s ease",
		},
		'&:hover $price': {
			marginTop: 0,
			transition: "0.2s ease",
		},
		'&:hover $instructorName': {
			marginTop: 0,
			opacity: 1,
			transition: "0.2s ease",
		},
		'&:hover $rating': {
			color: "white",
			transition: "0.3s ease",
		}
	},
	cardArea: {
		height: "100%"
	},
	media: {
		height: "65%",
		width: "-webkit-fill-available",
		position: "absolute",
		transition: "0.4s ease",
		top: 0,
	},
	cardContent: {
		height: "35%",
		padding: 5,

		transition: "0.4s ease",
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
		transition: "0.3s ease"
	},
	title: {
		// color: "#424242",
		fontWeight: 600
	},
	avatar: {
		float: "right",
		top: "40px",
		right: "20px",
		borderRadius: 3,
		border: "3px solid #fffffff2",
		opacity: 0.95,
		transform: "scale(1)",
		transition: "0.3s ease"
	},
	price: {
		display: "flex",
		marginTop: -30,
		transition: "0.2s ease"
	},
	rating: {
		display: "flex",
		alignItems: "center",
		color: "#717171",
		transition: "0.3s ease"
	},
	instructorName: {
		float: "right",
		marginTop: -200,
		color: "white",
		opacity: 0,
		alignItems: "center",
		transition: "0.3s ease"
	},
	liveIcon: {
		float: "right",
		top: 0,
		fontSize: 13,
		color: "white",
		fontWeight: "bold",
		padding: "2px 4px",
		backgroundColor: "red",
		borderRadius: 3,
		marginTop: -190,
		marginRight: 5,
	}
}));
