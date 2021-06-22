import api from "commons/AxiosCommon";

const topic = {

    fetch: async () => {
        const response = await api.get(`api/topics`);
        return response.data;
    },
};

export default topic;
