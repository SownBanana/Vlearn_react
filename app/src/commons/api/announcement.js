import api, { headersWithToken } from "commons/AxiosCommon";

const announcements = {

    fetch: async (params) => {
        var url = `api/announcements?columns=*`;
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
    get: async (id) => {
        const response = await api.get(`api/announcements/${id}`, { headers: headersWithToken() })
        return response.data;
    },
    store: async (params) => {
        const response = await api.post(`api/announcements`, params, { headers: headersWithToken() })
        return response.data;
    },
};

export default announcements;
