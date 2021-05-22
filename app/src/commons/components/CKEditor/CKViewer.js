import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-markup-templating.js";
import "prismjs/components/prism-php.js";

export default function CKViewer({ content, highlightTrigger = true, reHighlight = true, ...props }) {
	// const createMarkup = () => {
	// 	return { __html: intro };
	// };
	const ref = useRef()

	useEffect(() => {
		if (highlightTrigger && reHighlight) {
			console.log("CKViewer Rehighlight ..........");
			// Prism.highlightAll();
			Prism.highlightAllUnder(ref.current);
		} else {
			console.log("Not open yet");
		}
	}, [content, highlightTrigger, reHighlight]);
	return (
		// <div dangerouslySetInnerHTML={createMarkup()} className="ck-content"></div>
		<div
			ref={ref}
			dangerouslySetInnerHTML={{ __html: content }}
			className="ck-content ck-viewer"
			{...props}
		></div>
	);
}
