import {
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
} from "@material-ui/core";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

export default function ListItemLink(props) {
	const { icon, primary, to } = props;
	const { pathname } = useLocation();
	const selected = pathname.split("/")[1] === to.split("/")[1];
	const classes = useStyles();
	const renderLink = React.useMemo(
		() =>
			React.forwardRef((itemProps, ref) => (
				<RouterLink to={to} ref={ref} {...itemProps} />
			)),
		[to]
	);

	return (
		<li>
			<ListItem selected={selected} button component={renderLink} className={classes.root}>
				{icon ? (
					<ListItemIcon
						classes={
							selected ? {
								root: classes.selected,
							} : {
								root: classes.notSelected,
							}
						}
					>
						{icon}
					</ListItemIcon>
				) : null}
				<ListItemText primary={primary} />
			</ListItem>
		</li>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		height: theme.spacing(7)
	},
	selected: {
		color: theme.palette.selected.dark,
	},
	notSelected: {
	},
}));
