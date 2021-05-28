import api, { headersWithToken } from "commons/AxiosCommon";

const chatRoom = {
    lesson: async (id) => {
        const response = await api.get(`api/lessons/fetch-chats/${id}`, {
            headers: headersWithToken(),
        });
        return response.data;
    },
    liveLesson: async (id) => {
        const response = await api.get(`api/live-lessons/fetch-chats/${id}`, {
            headers: headersWithToken(),
        });
        return response.data;
    },
    send: async (params) => {
        const response = await api.post(
            `/api/comments`,
            params,
            {
                headers: headersWithToken(),
            }
        );
        return response.data;
    },
};

export default chatRoom;
