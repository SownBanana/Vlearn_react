import { React } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import { setPreviousURL } from "commons/SliceCommon";
import InfoPage from "features/Info/pages/Info";
import PersonalInfo from "features/Info/pages/PersonalInfo";
import { PrivateRoute } from "commons/routes/CustomRoute";
export default function Info() {
    const dispatch = useDispatch();
    dispatch(setPreviousURL("/info"));
    return (
        <Switch>
            <PrivateRoute path="/info/:username" component={InfoPage} />
            <PrivateRoute path="/info" component={PersonalInfo} />
        </Switch>
    );
}
