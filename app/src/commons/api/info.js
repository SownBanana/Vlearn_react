import api, { headersWithToken } from "commons/AxiosCommon";

const info = {
    update: async (params) => {
        const response = await api.put(
            `/api/users/${params.id}`,
            params,
            {
                headers: headersWithToken(),
            }
        );
        return response.data;
    },
    fetch: async () => {
        const response = await api.get(`api/fetch-my-data`, {
            headers: headersWithToken(),
        });
        return response.data;
    },
    get: async (id) => {
        const response = await api.get(`api/users/${id}`);
        return response.data;
    },
    index: async () => {
        const response = await api.get('api/users');
        return response.data;
    }

};

export default info;
