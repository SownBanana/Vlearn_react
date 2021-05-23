import api, { headersWithToken } from "commons/AxiosCommon";

const notification = {

    fetch: async (page) => {
        const response = await api.get(`api/notifications?page=${page}`, {
            headers: headersWithToken()
        }
        );
        return response.data;
    },
    read: async (id) => {
        const response = await api.put(`api/notifications/${id}`, {}, {
            headers: headersWithToken()
        });
        return response.data;
    },
};

export default notification;
