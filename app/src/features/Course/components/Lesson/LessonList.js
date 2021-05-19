import React, { useState } from "react";
import LessonInput from "./LessonInput";
import { List, arrayMove, arrayRemove } from "react-movable";
import { cloneDeep } from "lodash";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { deleteLesson as deleteAction } from "features/Course/editingCourseSlice";

export default function LessonList({ lessons, setLessons }) {
	const [expanded, setExpanded] = useState(0);
	const dispatch = useDispatch();
	const changeLesson = (lesson) => {
		const newLessons = cloneDeep(lessons).map((l, index) => {
			// console.log("index = ");
			if (l.uuid === lesson.uuid) {
				lesson.order = index;
				return lesson;
			}
			l.order = index;
			return l;
		});
		setLessons(newLessons);
	};
	const deleteLesson = (lesson) => {
		dispatch(deleteAction(lesson.id));
		const newLessons = cloneDeep(lessons).filter((l) => l.uuid !== lesson.uuid);
		setLessons(newLessons);
	};
	const handleExpanded = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	return (
		<List
			removableByMove
			values={lessons}
			onChange={({ oldIndex, newIndex }) => {
				if (newIndex === -1) {
					dispatch(deleteAction(lessons[oldIndex].id));
				}
				setLessons(
					newIndex === -1
						? arrayRemove(lessons, oldIndex)
						: arrayMove(lessons, oldIndex, newIndex)
				);
			}}
			renderList={({ children, props, isDragged }) => (
				<Grid
					container
					item
					md={12}
					xs={12}
					{...props}
					style={{
						padding: "0em 0em 0.5em 0em",
						cursor: isDragged ? "grabbing" : undefined,
						listStyle: "none",
					}}
				>
					{children}
				</Grid>
			)}
			renderItem={({ value, props, isDragged, isSelected, isOutOfBounds }) =>
				value && (
					<Grid
						key={value.uuid}
						container
						item
						md={12}
						xs={12}
						{...props}
						style={{
							...props.style,
							// paddingLeft: "0.5em",
							listStyleType: "none",
							cursor: isDragged ? "grabbing" : "grab",
							borderRadius: "6px",
							fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
							borderRight:
								isDragged || isSelected
									? isOutOfBounds
										? "6px solid #F08080"
										: "6px solid #147b0269"
									: "6px solid #147b02",
						}}
					>
						<LessonInput
							{...props}
							lesson={value}
							handleChange={changeLesson}
							handleDelete={deleteLesson}
							expanded={expanded}
							handleExpanded={handleExpanded}
						/>
					</Grid>
				)
			}
		/>
	);
}
