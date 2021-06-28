import React from "react";
import { Switch } from "react-router-dom";
import { Route, AdminRoute } from "commons/routes/CustomRoute";
import ManageAnnouncement from "features/Announcement/pages/Admin/ManageAnnouncement";
import AnnouncementPage from "features/Announcement/pages/AnnouncementPage";

export default function Announcement() {
    return (
        <Switch>
            <AdminRoute
                path="/announcements/manage"
                component={ManageAnnouncement}
            />
            <Route path="/announcements/:id" component={AnnouncementPage} />
        </Switch>
    );
}
