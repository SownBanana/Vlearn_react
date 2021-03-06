import React from "react";
import { CKEditor as BaseEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5/build/ckeditor";
import MyUploadAdapter from "./FileUploadAdapter";

export default function CKEditor({
	content = "",
	isNoSide = false,
	handler,
	...props
}) {
	// const getRawData = (editor) => editor.editing.view.domRoots.get("main");

	var timeOut;

	return (
		<BaseEditor
			editor={Editor}
			config={isNoSide ? editorNoSideConfiguration : editorConfiguration}
			// data={content}
			onReady={(editor) => {
				if (editor == null) {
					console.log("=============> init editor fail");
					// return;
				}
				// You can store the "editor" and use when it is needed.
				try {
					console.log("Editor is ready to use!");
					// console.log("set editor content ", content);
					if (content) {
						editor.setData(content);
						timeOut = setTimeout(() => {
							try {
								handler(content);
							} catch (e) {
								console.error(e);
							}
						}, 500);
					}
					editor.plugins.get("FileRepository").createUploadAdapter = (
						loader
					) => {
						return new MyUploadAdapter(loader);
					};
				} catch (e) {
					console.log("CkEditor is closed", e);
				}
			}}
			onChange={(event, editor) => {
				clearTimeout(timeOut);
				// const prepareData = getRawData(editor).innerHTML;
				const prepareData = editor.getData();
				// console.log("prepare data", editor.getData());
				timeOut = setTimeout(() => {
					// console.log(getRawData(editor).innerHTML);
					// console.log("change data", data);
					try {
						// const data = getRawData(editor).innerHTML;
						const data = editor.getData();
						// console.log(data);
						handler(data);
					} catch (e) {
						console.error(e);
						handler(prepareData);
					}
				}, 500);
				// console.log(event);
			}}
			// onBlur={(event, editor) => {
			// 	// console.log("Blur.", editor);
			// }}
			// onFocus={(event, editor) => {
			// 	// console.log("Focus.", editor);
			// }}
			{...props}
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
	codeBlock: {
		languages: [
			{ language: 'plaintext', label: 'Plain text' }, // The default language.
			{ language: 'bash', label: 'Bash' },
			{ language: 'c', label: 'C' },
			{ language: 'cs', label: 'C#' },
			{ language: 'cpp', label: 'C++' },
			{ language: 'css', label: 'CSS' },
			{ language: 'diff', label: 'Diff' },
			{ language: 'html', label: 'HTML' },
			{ language: 'java', label: 'Java' },
			{ language: 'javascript', label: 'JavaScript' },
			{ language: 'php', label: 'PHP' },
			{ language: 'python', label: 'Python' },
			{ language: 'ruby', label: 'Ruby' },
			{ language: 'typescript', label: 'TypeScript' },
			{ language: 'xml', label: 'XML' }
		]
	}
};

const editorNoSideConfiguration = {
	toolbar: {
		items: [
			"heading",
			"outdent",
			"indent",
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
			"MathType",
			// "CKFinder",
			"imageInsert",
			"horizontalLine",
			"undo",
			"redo",
		],
		// shouldNotGroupWhenFull: true,
	},
	language: "vi",
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
	}
};

// const editorClassicConfiguration = {
// 	toolbar: [
// 		"heading",
// 		"|",
// 		"undo",
// 		"redo",
// 		"fontFamily",
// 		"fontColor",
// 		"fontSize",
// 		"|",
// 		"bulletedList",
// 		"numberedList",
// 		"outdent",
// 		"indent",
// 		"italic",
// 		"bold",
// 		"|",
// 		"insertTable",
// 		"link",
// 		"imageUpload",
// 		"blockQuote",
// 		"mediaEmbed",
// 		"alignment",
// 		// "CKFinder",
// 		"code",
// 		"codeBlock",
// 		"htmlEmbed",
// 		"MathType",
// 		"ChemType",
// 		"superscript",
// 		"subscript",
// 		"imageInsert",
// 		"horizontalLine",
// 	],
// 	language: "vi",
// 	image: {
// 		toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
// 	},
// 	table: {
// 		contentToolbar: [
// 			"tableColumn",
// 			"tableRow",
// 			"mergeTableCells",
// 			"tableCellProperties",
// 			"tableProperties",
// 		],
// 	},
// };
