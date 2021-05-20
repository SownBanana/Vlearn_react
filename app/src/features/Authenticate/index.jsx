import { React } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { logout } from "./authSlices";
import Github from "./pages/OAuth/Github";
import Google from "./pages/OAuth/Google";
import Facebook from "./pages/OAuth/Facebook";
import { setPreviousURL } from "../../commons/SliceCommon";
import ChangePassword from "./pages/Reset/ChangePassword";

export default function Authenticate() {
    const dispatch = useDispatch();
    dispatch(setPreviousURL("/auth"));

    return (
        <Switch>
            <Route exact path="/auth">
                <h3>Authenticate Portal</h3>
                <Link to={`auth/login`}>Login </Link>
                <Link to={`auth/register`}>Register </Link>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(logout());
                    }}
                >
                    Logout
                </button>
            </Route>
            <Route path="/auth/login" component={Login} />
            <Route path="/auth/register" component={Register} />
            <Route path="/auth/github" component={Github} />
            <Route path="/auth/google" component={Google} />
            <Route path="/auth/facebook" component={Facebook} />
            <Route path="/auth/change-password" component={ChangePassword} />
        </Switch>
    );
}
