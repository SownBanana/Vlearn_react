import React, { useEffect, useState } from "react";
import { CKEditor as BaseEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5/build/ckeditor";
import MyUploadAdapter from "./FileUploadAdapter";

export default function CKEditor({ content = "", handler }) {
	const getRawData = (editor) => editor.editing.view.domRoots.get("main");

	var timeOut;

	return (
		<BaseEditor
			editor={Editor}
			config={editorConfiguration}
			// data={content}
			onReady={(editor) => {
				if (editor == null) {
					console.log("=============> init editor fail");
					// return;
				}
				// You can store the "editor" and use when it is needed.
				console.log("Editor is ready to use!", editor);
				editor.setData(content);
				editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
					return new MyUploadAdapter(loader);
				};
			}}
			onChange={(event, editor) => {
				console.log(event);
				clearTimeout(timeOut);
				timeOut = setTimeout(() => {
					// console.log(getRawData(editor).innerHTML);
					handler(getRawData(editor).innerHTML);
				}, 500);
			}}
			// onBlur={(event, editor) => {
			// 	// console.log("Blur.", editor);
			// }}
			// onFocus={(event, editor) => {
			// 	// console.log("Focus.", editor);
			// }}
		/>
	);
}

const editorConfiguration = {
	toolbar: {
		items: [
			"heading",
			"bold",
			"italic",
			"fontColor",
			"fontSize",
			"fontFamily",
			// "-",
			"insertTable",
			"alignment",
			"outdent",
			"indent",
			"codeBlock",
			"link",
			"bulletedList",
			"numberedList",
			// "-",
			"blockQuote",
			"imageUpload",
			"mediaEmbed",
			"htmlEmbed",
			"code",
			// "-",
			"subscript",
			"superscript",
			"ChemType",
			// "CKFinder",
			"imageInsert",
			"horizontalLine",
		],
		// shouldNotGroupWhenFull: true,
	},
	language: "vi",
	blockToolbar: [
		"undo",
		"redo",
		"outdent",
		"indent",
		"heading",
		"codeBlock",
		"MathType",
	],
	image: {
		toolbar: [
			"imageTextAlternative",
			"imageStyle:full",
			"imageStyle:side",
			"linkImage",
		],
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

const editorClassicConfiguration = {
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
