import api, { headersWithToken } from "commons/AxiosCommon";

const liveLessonResource = {
    get: async (id) => {
        const response = await api.get(`api/live-lessons/${id}`, {
            headers: headersWithToken(),
        });
        return response.data;
    },
};

export default liveLessonResource;
