import { Grid } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
import Editor from "ckeditor5/build/ckeditor";

export default function CKViewer({ content }) {
	const srcRef = useRef();
	const distRef = useRef();
	useEffect(() => {
		console.log("Create CKView");
		Editor.create(srcRef.current)
			.then((editor) => {
				// console.log("dasdsadsad", editor);
				editor.isReadOnly = true;
				// console.log("xxxxxxxxx", srcRef.current.nextSibling.innerHTML);
				distRef.current.innerHTML = srcRef.current.nextSibling.innerHTML;
				srcRef.current.nextSibling.innerHTML = "";
				Prism.highlightAll();
			})
			.catch((error) => {
				console.error(error);
			});
	}, [content]);
	return (
		<div>
			<Grid item xs={12}>
				<div ref={srcRef} dangerouslySetInnerHTML={{ __html: content }}></div>
			</Grid>
			<Grid item xs={12} md={12} id="toThis" ref={distRef}></Grid>
		</div>
	);
}
