import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import SectionInput from "./SectionInput";
import uuid from "commons/uuidv4";
import { Box, Hidden, Grid, makeStyles } from "@material-ui/core";
import { List, arrayMove, arrayRemove } from "react-movable";
import _ from "lodash";

function SectionList({ sections, setSections }) {
	const [expanded, setExpanded] = useState(0);
	const classes = useStyles();
	const changeSection = (section) => {
		const newSections = _.cloneDeep(sections).map((s, index) => {
			section.order = index;
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
	useEffect(() => {
		console.log("===========> Rerender");
	}, []);
	return (
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
				</Grid>
			)}
			renderItem={({ value, props, isDragged, isSelected, isOutOfBounds }) =>
				value && (
					<Grid
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
						{/* <Hidden smDown> */}
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
						{/* </Hidden> */}
						<Grid item md={12} xs={12} className={classes.maxwidth}>
							<SectionInput
								{...props}
								section={value}
								handleChange={changeSection}
								expanded={expanded}
								handleExpanded={handleExpanded}
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
	},
}));

// SectionList.propTypes = {};

export default SectionList;
