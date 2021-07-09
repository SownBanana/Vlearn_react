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
    },

    fetchBoughtCoursesTimeSeries: async () => {
        const response = await api.get(`api/bought-data`, {
            headers: headersWithToken()
        });
        return response.data;
    },

    fetchRateTimeSeries: async () => {
        const response = await api.get(`api/rate-data`, {
            headers: headersWithToken()
        });
        return response.data;
    },

};

export default schedule;
