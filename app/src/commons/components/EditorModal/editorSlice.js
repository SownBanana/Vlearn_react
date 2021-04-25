import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	title: "",
	content: "",
	handler: null,
	open: false,
};

const editorModal = createSlice({
	name: "editorModal",
	initialState,
	reducers: {
		setTitle: (state, action) => {
			state.title = action.payload;
		},
		setContent: (state, action) => {
			state.content = action.payload;
		},
		setHandler: (state, action) => {
			state.handler = action.payload;
		},
		setOpen: (state, action) => {
			state.open = action.payload;
		},
	},
});

export const {
	setTitle,
	setContent,
	setHandler,
	setOpen,
} = editorModal.actions;
export default editorModal.reducer;
