import api, { headersWithToken } from "commons/AxiosCommon";

const users = {

    fetch: async (params) => {
        var url = `api/users?columns=*`;
        if (params) {
            for (let [query, value] of Object.entries(params)) {
                url = url + `&${query}=${value}`;
            }
        }
        const response = await api.get(url,
            { headers: headersWithToken() }
        );
        return response.data;
    },
    verify: async (params) => {
        const response = await api.post(`api/verify-user`, params, { headers: headersWithToken() })
        return response.data;
    },
    createAdmin: async (params) => {
        const response = await api.post(`api/create-admin`, params, { headers: headersWithToken() })
        return response.data;
    },
};

export default users;
