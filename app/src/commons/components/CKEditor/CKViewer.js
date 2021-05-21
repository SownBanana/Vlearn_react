import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-markup-templating.js";
import "prismjs/components/prism-php.js";

export default function CKViewer({ content, highlightTrigger = true, reHighlight = true }) {
	// const createMarkup = () => {
	// 	return { __html: intro };
	// };

	useEffect(() => {
		if (highlightTrigger && reHighlight) {
			console.log("CKViewer Rehighlight ..........");
			Prism.highlightAll();
		}
	}, [content, highlightTrigger, reHighlight]);
	return (
		// <div dangerouslySetInnerHTML={createMarkup()} className="ck-content"></div>
		<div
			dangerouslySetInnerHTML={{ __html: content }}
			className="ck-content ck-viewer"
		></div>
	);
}
