import api, { headersWithToken } from "commons/AxiosCommon";

const liveLessonResource = {
    get: async (id) => {
        const response = await api.get(`api/live-lessons/${id}`, {
            headers: headersWithToken(),
        });
        return response.data;
    },
    drawBoard: async (id, data) => {
        const response = await api.post(`api/draw-board/${id}`,
            { data }
            , {
                headers: headersWithToken(),
            });
        return response.data;
    },
};

export default liveLessonResource;
