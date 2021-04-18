import React, { useState } from "react";
// import PropTypes from "prop-types";
import InputSection from "./InputSection";
import uuid from "commons/uuidv4";
import { Box } from "@material-ui/core";
import { List, arrayMove, arrayRemove } from "react-movable";

function SectionList({ sections, setSections }) {
	const [expanded, setExpanded] = useState(0);
	const changeSection = (section) => {
		const newSections = sections.map((s, index) => {
			s.index = index;
			if (s.uuid === section.uuid) return section;
			return s;
		});
		setSections(newSections);
	};
	const deleteSection = (section) => {
		const newSections = sections.filter((s) => {
			return s.uuid === section.uuid;
		});
		setSections(newSections);
	};

	const handleExpanded = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	return (
		<div>
			<List
				removableByMove
				values={sections}
				onChange={({ oldIndex, newIndex }) => {
					setSections(
						newIndex === -1
							? arrayRemove(sections, oldIndex)
							: arrayMove(sections, oldIndex, newIndex)
					);
				}}
				renderList={({ children, props, isDragged }) => (
					<ul
						{...props}
						style={{
							padding: "0em 0em 1em 0em",
							cursor: isDragged ? "grabbing" : undefined,
							listStyle: "none",
						}}
					>
						{children}
					</ul>
				)}
				renderItem={({
					value,
					props,
					isDragged,
					isSelected,
					isOutOfBounds,
				}) => (
					<li
						{...props}
						style={{
							...props.style,
							// paddingLeft: "0.5em",
							listStyleType: "none",
							cursor: isDragged ? "grabbing" : "grab",
							borderRadius: "6px",
							fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
							borderLeft:
								isDragged || isSelected
									? isOutOfBounds
										? "6px solid #F08080"
										: "6px solid #0d47a169"
									: "6px solid #0d47a1",
						}}
					>
						<InputSection
							{...props}
							section={value}
							handleChange={changeSection}
							expanded={expanded}
							handleExpanded={handleExpanded}
						/>
					</li>
				)}
			/>
		</div>
	);
}

// SectionList.propTypes = {};

export default SectionList;
