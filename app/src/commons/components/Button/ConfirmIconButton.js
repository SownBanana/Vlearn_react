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

function ConfirmIconButton({
	children,
	onClick,
	title,
	message,
	...props
}, ref) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = (e) => {
		e.stopPropagation();
		setOpen(true);
	};

	const handleClose = (e) => {
		setOpen(false);
	};

	const handleAction = (e) => {
		e.stopPropagation();
		onClick(e);
		setOpen(false);
	};
	return (
		<div style={{ display: "unset" }}>
			<IconButton ref={ref} onClick={handleClickOpen} {...props}>
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

export default React.forwardRef(ConfirmIconButton);
