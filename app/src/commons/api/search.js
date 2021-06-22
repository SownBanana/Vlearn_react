import api, { headersWithToken } from "commons/AxiosCommon";

const search = {

    search: async (search) => {
        const response = await api.get(`api/search?search=${search}`, {
            headers: headersWithToken()
        });
        return response.data;
    },

    elasticsearch: async (search) => {
        const response = await api.get(`api/esearch?search=${search}`);
        return response.data;
    }
};

export default search;
