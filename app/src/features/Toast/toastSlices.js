import { createSlice } from "@reduxjs/toolkit";
import SnackButton from "./SnackButton";

export const makeToast = (message, type, isClosable = false, autoHideDuration = 2000, isPersis = false, key = null) => dispatch => {
	if (key === null) key = new Date().getTime() + Math.random();
	var options = {
		key: key,
		preventDuplicate: true,
		variant: type,
		autoHideDuration: autoHideDuration,
		anchorOrigin: {
			vertical: "top",
			horizontal: "right",
		},
		
	};
	if (isClosable) {
		options.action = (key) => (
			<SnackButton notifyKey={key} />
		)
	}

	dispatch(
		enqueueSnackbar({
			key: key,
			message: message,
			options: options
		})
	);
}
export const makePersistToast = (message, type, key) => dispatch => {
	var options = {
		key: key,
		preventDuplicate: true,
		variant: type,
		anchorOrigin: {
			vertical: "top",
			horizontal: "right",
		},
		persist: true,
		action: (key) => (
			<SnackButton notifyKey={key} />
		)
	};

	dispatch(
		enqueueSnackbar({
			key: key,
			message: message,
			options: options
		})
	);
}

export const ToastType = {
	SUCCESS: "success",
	ERROR: "error",
	WARNING: "warning",
	INFO: "info",
};

const initialState = {
	notifications: [],
};

const toast = createSlice({
	name: "toast",
	initialState,
	reducers: {
		enqueueSnackbar: (state, action) => {
			state.notifications.push(action.payload);
		},
		closeSnackbar: (state, action) => {
			state.notifications = state.notifications.map((notification) =>
				notification.key === action.payload
					? { ...notification, dismissed: true }
					: { ...notification }
			);
		},
		removeSnackbar: (state, action) => {
			state.notifications = state.notifications.filter(
				(notification) => notification.options.key !== action.payload
			);
		},
	},
});

export const {
	enqueueSnackbar,
	removeSnackbar,
	closeSnackbar,
} = toast.actions;

export default toast.reducer;
