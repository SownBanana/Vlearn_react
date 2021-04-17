import React from "react";
// import PropTypes from "prop-types";
import InputSection from "./InputSection";
import uuid from "commons/uuidv4";
function SectionList({ sections, setSections }) {
	const changeSection = (section) => {
		const newSections = sections.map((s) => {
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
	return (
		<div>
			{sections.map((section) => {
				return (
					<InputSection
						key={section.uuid}
						section={section}
						handleChange={changeSection}
					/>
				);
			})}
			{/* <InputSection section={sections[0]} />
			<InputSection section={sections[1]} /> */}
		</div>
	);
}

// SectionList.propTypes = {};

export default SectionList;
