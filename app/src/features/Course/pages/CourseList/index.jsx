import React from "react";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import BreadCrumbs from "commons/components/BreadCrumbs";

export default function index() {
	console.log("course list");
	return (
		<Box mt={2}>
			<BreadCrumbs>Khóa học của tôi</BreadCrumbs>
			<Link to="/courses/add">Add Course</Link>
			<Container maxWidth="xs">This is Course List</Container>
		</Box>
	);
}
