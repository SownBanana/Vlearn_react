import React, { useEffect } from "react";
import Drawer from "./MyDrawer";
import AppBar from "./MyAppBar";
import { useSelector } from "react-redux";
export default function AppFrame() {
	const [open, setOpen] = React.useState(false);
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (!isLoggedIn) setOpen(false);
	}, [isLoggedIn]);

	return (
		<div>
			<AppBar handle={handleDrawerOpen} open={open} />
			{isLoggedIn && <Drawer handle={handleDrawerClose} open={open} />}
		</div>
	);
}
