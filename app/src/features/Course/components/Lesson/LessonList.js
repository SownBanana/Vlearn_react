import React, { useState } from "react";
import LessonInput from "./LessonInput";
import { List, arrayMove, arrayRemove } from "react-movable";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";

export default function LessonList({ lessons, setLessons }) {
	const [expanded, setExpanded] = useState(0);
	const changeLesson = (lesson) => {
		const newLessons = _.cloneDeep(lessons).map((l, index) => {
			// console.log("index = ");
			l.order = index;
			if (l.uuid === lesson.uuid) return lesson;
			return l;
		});
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
						padding: "0em 0em 1em 0em",
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
										: "6px solid #0d47a169"
									: "6px solid #0d47a1",
						}}
					>
						<LessonInput
							{...props}
							lesson={value}
							handleChange={changeLesson}
							expanded={expanded}
							handleExpanded={handleExpanded}
						/>
					</Grid>
				)
			}
		/>
	);
}
