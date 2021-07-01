import React from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import { Route, RedirectRoute } from "commons/routes/CustomRoute";
import SearchPane from "features/Home/pages/Search/SearchPane";
import HomePage from "features/Home/pages/Home/HomePage";
import { UserRole } from "features/Authenticate/constance";

function Home() {
    const dispatch = useDispatch();
    return (
        <Switch>
            <RedirectRoute
                redirectTo={"/dashboard"}
                redirectRoles={[UserRole.INSTRUCTOR, UserRole.ADMIN]}
                exact
                path="/"
                component={HomePage}
            />
            <Route exact path="/search" component={SearchPane} />
        </Switch>
    );
}

export default Home;
