import React, { useEffect, useState } from "react";
import { CKEditor as BaseEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5/buildClassic/ckeditor";
import MyUploadAdapter from "./FileUploadAdapter";

export default function CKEditor({
	content = "",
	isClassic = false,
	handler,
	...props
}) {
	const getRawData = (editor) => editor.editing.view.domRoots.get("main");

	var timeOut;

	return (
		<BaseEditor
			editor={Editor}
			config={editorConfiguration}
			onReady={(editor) => {
				if (editor == null) {
					console.log("=============> init editor fail");
				}
				console.log("Editor is ready to use!", editor);
				if (content) editor.setData(content);
				editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
					return new MyUploadAdapter(loader);
				};
			}}
			onChange={(event, editor) => {
				clearTimeout(timeOut);
				const data = getRawData(editor).innerHTML;
				// console.log("prepare data", data);
				timeOut = setTimeout(() => {
					// console.log(getRawData(editor).innerHTML);
					// console.log("change data", data);
					try {
						handler(data);
					} catch (e) {
						console.error(e);
					}
				}, 1000);
				// console.log(event);
			}}
			{...props}
		/>
	);
}

const editorConfiguration = {
	toolbar: [
		"heading",
		"|",
		"undo",
		"redo",
		"fontFamily",
		"fontColor",
		"fontSize",
		"|",
		"bulletedList",
		"numberedList",
		"outdent",
		"indent",
		"italic",
		"bold",
		"|",
		"insertTable",
		"link",
		"imageUpload",
		"blockQuote",
		"mediaEmbed",
		"alignment",
		// "CKFinder",
		"code",
		"codeBlock",
		"htmlEmbed",
		"MathType",
		"ChemType",
		"superscript",
		"subscript",
		"imageInsert",
		"horizontalLine",
	],
	language: "vi",
	image: {
		toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
	},
	table: {
		contentToolbar: [
			"tableColumn",
			"tableRow",
			"mergeTableCells",
			"tableCellProperties",
			"tableProperties",
		],
	},
};
