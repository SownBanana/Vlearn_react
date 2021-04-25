import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
} from "@material-ui/core";
import React, { useState } from "react";


export default function ConfirmIconButton({
	children,
	onClick,
	title,
	message,
	...props
}) {

	const [open, setOpen] = useState(false);

	const handleClickOpen = (e) => {
		e.stopPropagation();
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAction = () => {
		onClick();
		setOpen(false);
	};
	return (
		<div>
			<IconButton onClick={handleClickOpen} {...props}>
				{children}
			</IconButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{message}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAction} color="secondary">
						Đồng ý
					</Button>
					<Button onClick={handleClose} color="primary" autoFocus>
						Thoát
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
