import { Button, Paper } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SnackButton from "../Toast/SnackButton";
import { checkPassport } from "../Authenticate/authSlices";
import { enqueueSnackbar } from "../Toast/toastSlices";

function Home() {
    const dispatch = useDispatch();
    return (
        <div>
            Home
            <Link to="/auth">auth</Link>
            <Button
                onClick={(e) => {
                    e.preventDefault();
                    console.log("Check passport from home");
                    dispatch(checkPassport());
                }}
            >
                Check Auth
            </Button>
            <Button
                variant="contained"
                onClick={(e) => {
                    e.preventDefault();
                    const key = new Date().getTime() + Math.random();
                    dispatch(
                        enqueueSnackbar({
                            key: key,
                            message: "Failed fetching data.",
                            options: {
                                key: key,
                                preventDuplicate: true,
                                variant: "success",
                                persist: true,
                                autoHideDuration: 2000,
                                anchorOrigin: {
                                    vertical: "top",
                                    horizontal: "right",
                                },
                                content: (key) => (
                                    <Paper style={{ padding: 20 }}>
                                        Content
                                        <SnackButton notifyKey={key} />
                                    </Paper>
                                ),
                            },
                        })
                    );
                }}
            >
                Display snackbar
            </Button>
            {/* <Button variant="contained" onClick={closeSnackbar()}>
				Dismiss all snackbars
			</Button> */}
        </div>
    );
}

export default Home;
