import React, { useEffect, useState } from "react";
import { CKEditor as BaseEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5/build/ckeditor";

export default function CKEditor({ content, handler }) {
	const getRawData = (editor) => editor.editing.view.domRoots.get("main");

	var timeOut;

	return (
		<BaseEditor
			editor={Editor}
			config={editorConfiguration}
			// data={content}
			onReady={(editor) => {
				// You can store the "editor" and use when it is needed.
				console.log("Editor is ready to use!", editor);
				editor.setData(content);
			}}
			onChange={(event, editor) => {
				clearTimeout(timeOut);
				timeOut = setTimeout(() => {
					console.log(getRawData(editor).innerHTML);
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
		"CKFinder",
		"code",
		"codeBlock",
		"htmlEmbed",
		"MathType",
		"ChemType",
		"superscript",
		"subscript",
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
