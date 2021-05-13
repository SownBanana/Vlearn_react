import { React } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import { setPreviousURL } from "commons/SliceCommon";
import ChatPage from "features/Chat/pages/Chat";
import { PrivateRoute } from "commons/routes/CustomRoute";
export default function Chat() {
    const dispatch = useDispatch();
    dispatch(setPreviousURL("/message"));
    return (
        <Switch>
            <PrivateRoute path="/message" component={ChatPage} />
        </Switch>
    );
}
