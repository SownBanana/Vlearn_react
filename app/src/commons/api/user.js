import api, { headersWithToken } from "commons/AxiosCommon";

const users = {

    fetch: async () => {
        const response = await api.get(`api/users`,
            { headers: headersWithToken() }
        );
        return response.data;
    },
};

export default users;
