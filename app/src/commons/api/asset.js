import api, { headersWithToken } from "commons/AxiosCommon";

const asset = {

    fetch: async () => {
        const response = await api.get(`api/assets`, {
            headers: headersWithToken(),
        });
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`api/assets/${id}`, {
            headers: headersWithToken(),
        });
        return response.data;
    },
};

export default asset;
