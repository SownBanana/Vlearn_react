import {
	Fade,
	Modal,
	Backdrop,
	makeStyles,
	Dialog,
	DialogTitle,
	DialogContent,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CKEditor from "../CKEditor/CKEditor";
import { setOpen } from "commons/components/EditorModal/editorSlice";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "80%",
		maxHeight: "80%",
		// backgroundColor: "white",
		margin: "auto",
		overflow: "auto",
		zIndex: "999 !important",
		borderRadius: "5px",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	editor: {
		width: "100%",
		height: "100%",
	},
}));

export default function EditorModal() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const editorModal = useSelector((state) => state.editorModal);
	// console.log("============>", editorModal.handler);
	const handleClose = () => {
		dispatch(setOpen(false));
	};

	return (
		<Dialog
			open={editorModal.open}
			onClose={handleClose}
			scroll="paper"
			className={classes.modal}
			aria-labelledby="scroll-dialog-title"
			aria-describedby="scroll-dialog-description"
			maxWidth={false}
		>
			<DialogTitle id="scroll-dialog-title">{editorModal.title}</DialogTitle>
			<DialogContent dividers={true}>
				<div className={classes.editor}>
					<CKEditor
						isNoSide={true}
						content={editorModal.content}
						handler={editorModal.handler}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
