import React from "react";
import {
	Box,
	Grid,
	TextField,
	InputAdornment,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { CourseStatus } from "features/Course/constance";

export default function SearchPane({ handleSearch, filter, handleFilter }) {
	return (
		<Box mb={3} style={{ display: "flex", justifyContent: "center" }}>
			<Grid container item md={10} xs={10} sm={10} spacing={1} direction="row">
				<Grid container item md={6} sm={12} xs={12} justify="flex-start">
					<FormControl
						variant="outlined"
						size="small"
						style={{ backgroundColor: "white", marginRight: 10 }}
					>
						<InputLabel id="status-label">Trạng thái</InputLabel>
						<Select
							labelId="status-label"
							id="status"
							value={filter.status}
							onChange={(e) => {
								handleFilter({ ...filter, status: e.target.value });
							}}
						>
							<MenuItem value={CourseStatus.ALL}>Tất cả</MenuItem>
							<MenuItem value={CourseStatus.DRAFT}>Bản nháp</MenuItem>
							<MenuItem value={CourseStatus.PUBLISH}>Công khai</MenuItem>
						</Select>
					</FormControl>
					<FormControl
						variant="outlined"
						size="small"
						style={{ backgroundColor: "white", marginRight: 10 }}
					>
						<InputLabel id="time-label">Thời gian</InputLabel>
						<Select
							labelId="time-label"
							id="time"
							defaultValue={filter.time}
							value={filter.time}
							onChange={(e) => {
								handleFilter({ ...filter, time: e.target.value });
							}}
						>
							<MenuItem value={"desc"}>Mới nhất</MenuItem>
							<MenuItem value={"asc"}>Cũ nhất</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid container item md={6} sm={12} xs={12} justify="flex-end">
					<TextField
						fullWidth
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
			</Grid>
		</Box>
	);
}
