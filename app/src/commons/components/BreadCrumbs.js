import {
	Box,
	Breadcrumbs as Brc,
	Typography,
	useMediaQuery,
} from "@material-ui/core";
import React from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";

export default function BreadCrumbs({ links, children }) {
	const isMobile = useMediaQuery("(max-width: 760px)");
	return (
		!isMobile && (
			<Box mx={2} mb={3}>
				<Brc
					className="card_layout breadcrumb"
					separator={<NavigateNextIcon fontSize="small" />}
					aria-label="breadcrumb"
				>
					{links &&
						links.map((el) => {
							return (
								<Link color="inherit" to={el.link}>
									{el.description}
								</Link>
							);
						})}
					<Typography color="textPrimary">{children}</Typography>
				</Brc>
			</Box>
		)
	);
}
