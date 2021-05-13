import api, { headersWithToken } from "commons/AxiosCommon";

const chat = {
    send: async ({ id, room_id, content, files, timestamp }) => {
        const response = await api.post(
            `/api/chats/private`,
            {
                id,
                content,
                files,
                timestamp,
                room_id
            },
            {
                headers: headersWithToken(),
            }
        );
        return response.data;
    },
    fetch: async () => {
        const response = await api.get(`api/chats`, {
            headers: headersWithToken(),
        });
        return response.data;
    },
    get: async (id) => {
        const response = await api.get(`api/chats/${id}`, {
            headers: headersWithToken(),
        });
        return response.data;
    },
    comment: async (course_id) => {
        const response = await api.get(`api/comment/course/${course_id}`);
        return response.data;
    },
    lesson: async (lesson_id) => {
        const response = await api.get(`api/comment/lesson/${lesson_id}`, {
            headers: headersWithToken(),
        });
        return response.data;
    },
    lesson: async (live_lesson_id) => {
        const response = await api.get(`api/comment/live-lesson/${live_lesson_id}`, {
            headers: headersWithToken(),
        });
        return response.data;
    },

};

export default chat;
