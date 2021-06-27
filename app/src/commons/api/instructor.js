import api, { headersWithToken } from "commons/AxiosCommon";

const instructors = {

    fetch: async () => {
        const response = await api.get(`api/instructors`,
            { headers: headersWithToken() }
        );
        return response.data;
    },
};

export default instructors;
