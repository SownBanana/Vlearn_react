import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import SectionInput from "./SectionInput";
import { Box, Hidden, Grid, makeStyles, Button } from "@material-ui/core";
import { List, arrayMove, arrayRemove } from "react-movable";
import { cloneDeep } from "lodash";
import uuidv4 from "commons/uuidv4";
import { useDispatch, useSelector } from "react-redux";
import { deleteSection as deleteAction } from "features/Course/editingCourseSlice";
import {
	setStateSections,
	setCourse as setCourseAction,
} from "features/Course/editingCourseSlice";
function SectionList() {
	const sections = useSelector((state) => state.editingCourse.course.sections);
	const setSections = (newSections) => {
		dispatch(setStateSections(newSections));
		dispatch(setCourseAction());
	};

	const [expanded, setExpanded] = useState(0);
	const classes = useStyles();
	const dispatch = useDispatch();
	const changeSection = (section) => {
		const newSections = cloneDeep(sections).map((s, index) => {
			if (s.uuid === section.uuid) {
				section.order = index;
				return section;
			}
			s.order = index;
			return s;
		});
		setSections(newSections);
	};
	const setSectionsWithOrder = (newSections) => {
		const newSectionsWithOrder = cloneDeep(newSections).map((s, index) => {
			s.order = index;
			return s;
		});
		setSections(newSectionsWithOrder);
	};
	const deleteSection = (section) => {
		dispatch(deleteAction(section.id));
		const newSections = sections.filter((s) => {
			return s.uuid !== section.uuid;
		});
		setSections(newSections);
	};
	const addSection = () => {
		var newSection = cloneDeep(sections);
		console.log("==============>", newSection);
		newSection.push({
			id: "",
			uuid: uuidv4(),
			order: "",
			course_id: "",
			name: "",
			lessons: [],
			live_lessons: [],
			questions: [],
		});
		console.log("==============>", newSection);
		setSections(newSection);
		// setSection({ section, lessons: [...section.lessons, { uuid: uuidv4() }] });
	};

	const handleExpanded = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	useEffect(() => {
		console.log("===========> Rerender section list");
	});
	return (
		<List
			removableByMove
			values={sections}
			onChange={({ oldIndex, newIndex }) => {
				if (newIndex === -1) {
					dispatch(deleteAction(sections[oldIndex].id));
				}
				setSectionsWithOrder(
					newIndex === -1
						? arrayRemove(sections, oldIndex)
						: arrayMove(sections, oldIndex, newIndex)
				);
			}}
			renderList={({ children, props, isDragged }) => (
				<Grid
					direction="column"
					container
					spacing={1}
					{...props}
					style={{
						padding: "0em 0em 1em 0em",
						cursor: isDragged ? "grabbing" : undefined,
						listStyle: "none",
					}}
				>
					{children}
					<Box mt={2}>
						<Button
							variant="outlined"
							size="small"
							color="primary"
							onClick={addSection}
						>
							Thêm chương học
						</Button>
					</Box>
				</Grid>
			)}
			renderItem={({ value, props, isDragged, isSelected, isOutOfBounds }) =>
				value && (
					<Grid
						key={value.uuid}
						container
						direction="row"
						justify="flex-end"
						item
						md={12}
						{...props}
						style={{
							...props.style,
							// paddingLeft: "0.5em",
							display: "flex",
							listStyleType: "none",
							cursor: isDragged ? "grabbing" : "grab",
							borderRadius: "6px",
							fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
							// borderLeft:
							// 	isDragged || isSelected
							// 		? isOutOfBounds
							// 			? "6px solid #F08080"
							// 			: "6px solid #0d47a169"
							// 		: "6px solid #0d47a1",
						}}
					>
						<Hidden smDown>
							<div
								className="thisDivHere"
								data-movable-handle
								style={{
									width: "16px",
									marginBottom: "7.5px",
									marginTop: "0.5px",
									zIndex: "-1",
									marginRight: "-7px",
									borderRadius: "6px",
									backgroundColor:
										isDragged || isSelected
											? isOutOfBounds
												? "#F08080"
												: "#0d47a169"
											: "#0d47a1",
								}}
							></div>
						</Hidden>
						<Grid item md={12} xs={12} className={classes.maxwidth}>
							<SectionInput
								{...props}
								section={value}
								handleChange={changeSection}
								expanded={expanded}
								handleExpanded={handleExpanded}
								handleDelete={deleteSection}
								setSection={changeSection}
							/>
						</Grid>
					</Grid>
				)
			}
		/>
	);
}

const useStyles = makeStyles((theme) => ({
	maxwidth: {
		maxWidth: "98%",
		[theme.breakpoints.down("sm")]: {
			maxWidth: "100%",
		},
	},
}));

// SectionList.propTypes = {};

export default React.memo(SectionList);
