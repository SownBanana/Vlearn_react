import {
	Box,
	Breadcrumbs as Brc,
	Typography,
	useMediaQuery,
	IconButton,
	Divider,
} from "@material-ui/core";
import React from "react";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link, useHistory } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
export default function BreadCrumbs({ links, current, children }) {
	const isMobile = useMediaQuery("(max-width: 760px)");
	const history = useHistory();
	return !isMobile ? (
		<Box className="card_layout breadcrumb" mx={2} mb={3}>
			<div style={{ display: "flex", alignItems: "center" }}>
				<IconButton
					style={{ margin: "0px 10px 0px 5px" }}
					// size="small"
					aria-label=""
					onClick={() => history.goBack()}
				>
					<ArrowBackIosRoundedIcon fontSize="small" />
				</IconButton>
				<Divider
					style={{ marginRight: "15px" }}
					orientation="vertical"
					flexItem
				/>
				<Brc style={{ padding: "15px" }} separator="›" aria-label="breadcrumb">
					{links &&
						links.map((el) => {
							return (
								<Link color="inherit" to={el.link} key={el.link}>
									{el.description}
								</Link>
							);
						})}
					<Typography
						style={{
							maxWidth: "300px",
							overflow: "hidden",
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
						}}
						color="textPrimary"
					>
						{current}
					</Typography>
				</Brc>
			</div>
			<div
				style={{ marginRight: "25px", fontSize: "10px" }}
				className="beside_breadcrumb"
			>
				{children}
			</div>
		</Box>
	) : (
		<Box style={{ width: "100%" }} className="card_layout breadcrumb" mb={3}>
			<div style={{ display: "flex", alignItems: "center" }}>
				<IconButton
					style={{ margin: "0px 10px 0px 5px" }}
					// size="small"
					aria-label=""
					onClick={() => history.goBack()}
				>
					<ArrowBackIosRoundedIcon fontSize="small" />
				</IconButton>
				<Divider
					style={{ marginRight: "15px" }}
					orientation="vertical"
					flexItem
				/>
				<span style={{ fontSize: "12px" }}>
					{current}
				</span>
			</div>
			<div
				style={{ fontSize: "10px", marginRight: "10px" }}
				className="beside_breadcrumb"
			>
				{children}
			</div>
		</Box>
	);
}
