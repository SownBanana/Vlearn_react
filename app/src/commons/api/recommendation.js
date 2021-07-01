import api, { headersWithToken } from "commons/AxiosCommon";

const recommendation = {

    get: async (id) => {
        const response = await api.get(`api/recommend/${id}`, { headers: headersWithToken() })
        return response.data;
    },

    getRecent: async () => {
        const response = await api.get(`api/recent-courses`, { headers: headersWithToken() })
        return response.data;
    },

};

export default recommendation;
