import React from "react";
import Player from "react-player";

export default function VideoPlayer({ ...prop }) {
	return (
		<div>
			<Player {...prop} />
		</div>
	);
}
