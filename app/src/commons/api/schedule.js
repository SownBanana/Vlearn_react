import api, { headersWithToken } from "commons/AxiosCommon";

const schedule = {

    fetch: async () => {
        const response = await api.get(`api/schedule`, {
            headers: headersWithToken()
        }
        );
        return response.data;
    },

    fetchBoughtCourses: async (page = 1) => {
        const response = await api.get(`api/boughtCourses?page=${page}`, {
            headers: headersWithToken()
        });
        return response.data;
    }
};

export default schedule;
