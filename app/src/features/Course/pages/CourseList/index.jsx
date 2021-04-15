import React from "react";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

export default function index() {
	console.log("course list");
	return (
		<div>
			<Link to="/courses/add">Add Course</Link>
			<Container maxWidth="xs">This is Course List</Container>
		</div>
	);
}
