import React, { useEffect, useState } from "react";
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

export default function SearchPane({ handleSearch, sort, handleSort }) {
	const orderByOptions = {
		updated_at: {
			label: 'Thời gian cập nhật',
			value: 'updated_at',
			desc: 'Mới nhất',
			asc: 'Cũ nhất',
		},
		created_at: {
			label: 'Thời gian tạo',
			value: 'created_at',
			desc: 'Mới nhất',
			asc: 'Cũ nhất'
		},
		rate: {
			label: 'Đánh giá',
			value: 'rate',
			desc: 'Cao nhất',
			asc: 'Thấp nhất'
		},
		price: {
			label: 'Giá',
			value: 'price',
			desc: 'Đắt nhất',
			asc: 'Rẻ nhất'
		},
	};

	return (
		<Box mb={3} style={{ display: "flex", justifyContent: "center" }}>
			<Grid container item md={10} xs={10} sm={10} spacing={1} direction="row">
				<Grid container item md={6} sm={12} xs={12} justify="flex-start">

					<FormControl
						variant="outlined"
						size="small"
						style={{ backgroundColor: "white", marginRight: 10 }}
					>
						<InputLabel id="orderBy-label">Sắp xếp</InputLabel>
						<Select
							labelId="orderBy-label"
							id="orderBy"
							label="Sắp xếp theo"
							value={sort.orderBy}
							onChange={(e) => {
								handleSort({ ...sort, orderBy: e.target.value });
							}}
						>
							{
								Object.keys(orderByOptions).map(key => {
									const orderBy = orderByOptions[key];
									return <MenuItem value={orderBy.value}>{orderBy.label}</MenuItem>
								})
							}
						</Select>
					</FormControl>
					<FormControl
						variant="outlined"
						size="small"
						style={{ backgroundColor: "white", marginRight: 10 }}
					>
						<InputLabel id="order-label">Theo</InputLabel>
						<Select
							labelId="order-label"
							id="order"
							label="Theo"
							defaultValue={sort.order}
							value={sort.order}
							onChange={(e) => {
								handleSort({ ...sort, order: e.target.value });
							}}
						>
							<MenuItem value={"desc"}>
								{orderByOptions[sort.orderBy].desc}
							</MenuItem>
							<MenuItem value={"asc"}>
								{orderByOptions[sort.orderBy].asc}
							</MenuItem>
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
