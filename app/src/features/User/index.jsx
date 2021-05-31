import { React } from "react";
import { Switch } from "react-router-dom";
import { AdminRoute } from "commons/routes/CustomRoute";
import ManageUser from "features/User/Admin/ManageUser";
export default function Course() {
    return (
        <Switch>
            <AdminRoute path="/users/manage" component={ManageUser} />
        </Switch>
    );
}
