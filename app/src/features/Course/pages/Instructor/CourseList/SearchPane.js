import React from "react";
import {
	Box,
	Grid,
	useMediaQuery,
	TextField,
	InputAdornment,
	Select,
	MenuItem,
	FormControl,
	FormHelperText,
	FormLabel,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { CourseStatus } from "features/Course/constance";

export default function SearchPane({ handleSearch, filter, handleFilter }) {
	return (
		<Box mb={3} style={{ display: "flex", justifyContent: "center" }}>
			<Grid container item md={6} sm={6} xs={6} justify="flex-start">
				<FormControl
					variant="outlined"
					size="small"
					style={{ backgroundColor: "white" }}
				>
					<Select
						value={filter.status}
						onChange={(e) => {
							console.log("seelct ====", e);
							handleFilter({ ...filter, status: e.target.value });
						}}
					>
						<MenuItem value={"null"}>Tất cả</MenuItem>
						<MenuItem value={CourseStatus.DRAFT}>Bản nháp</MenuItem>
						<MenuItem value={CourseStatus.PUBLISH}>Công khai</MenuItem>
					</Select>
					<FormHelperText></FormHelperText>
				</FormControl>
			</Grid>
			<Grid container item md={4} sm={4} xs={4} justify="flex-end">
				<TextField
					id="standard-search"
					label="Tìm kiếm"
					size="small"
					variant="outlined"
					type="search"
					style={{ backgroundColor: "white" }}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<SearchIcon color="action" />
							</InputAdornment>
						),
					}}
					onChange={handleSearch}
				/>
			</Grid>
		</Box>
	);
}
