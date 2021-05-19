import api, { headersWithToken } from "commons/AxiosCommon";

const lessonResource = {
    get: async (id) => {
        const response = await api.get(`api/lessons/${id}`, {
            headers: headersWithToken(),
        });
        return response.data;
    },
};

export default lessonResource;
