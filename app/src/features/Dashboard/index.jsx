import {
    InstructorRoute,
    PrivateRoute,
    StudentRoute,
} from "commons/routes/CustomRoute";
import React from "react";
import { Switch } from "react-router";
import DashboardGW from "./components/DashboardGW";

export default function Dashboard() {
    return (
        <Switch>
            <PrivateRoute path="/dashboard" component={DashboardGW} />
        </Switch>
    );
}
