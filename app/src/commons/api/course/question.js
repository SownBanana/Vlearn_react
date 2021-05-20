import api, { headersWithToken } from "commons/AxiosCommon";

const questionResource = {
    getInSection: async (section_id) => {
        const response = await api.get(`api/sections/${section_id}/questions`, {
            headers: headersWithToken(),
        });
        return response.data;
    },
    calculatePoint: async (questions) => {
        const response = await api.post(`api/calculate-point`, questions, {
            headers: headersWithToken(),
        });
        return response.data;
    },
};

export default questionResource;
