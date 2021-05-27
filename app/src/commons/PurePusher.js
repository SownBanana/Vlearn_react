// eslint-disable-next-line
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function usePurePusher(id) {
    const [pusher, setPusher] = useState(null);
    const access_token = useSelector((state) => state.auth.access_token);
    useEffect(() => {
        setPusher(new Pusher(`ced39abfcc1119439466`, {
            cluster: 'ap1',
            //authEndpoint is your apiUrl + /broadcasting/auth
            authEndpoint: `${process.env.REACT_APP_BACKEND_URL}/api/broadcasting/auth`,
            // As I'm using JWT tokens, I need to manually set up the headers.
            auth: {
                headers: {
                    // "X-CSRF-TOKEN": csrf_token,
                    Authorization: "Bearer " + access_token,
                    Accept: "application/json",
                    // "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": `${process.env.REACT_APP_URL}`,
                    "Access-Control-Allow-Credentials": "true",
                },
            },
        }));

        // eslint-disable-next-line
    }, [id]);

    return pusher;

}

export default usePurePusher;
