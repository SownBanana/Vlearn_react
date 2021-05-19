import api, { headersWithToken } from "commons/AxiosCommon";

const courseResource = {
	store: async ({ course, deleteSections, deleteLessons, deleteQuestions, deleteAnswers }) => {
		console.log(course);
		const response = await api.post(
			`/api/courses`,
			{
				course,
				deleteSections,
				deleteLessons,
				deleteQuestions,
				deleteAnswers,
			},
			{
				headers: headersWithToken(),
			}
		);
		return response.data;
	},
	index: async ({ page, perPage, columns = "*", ...restQuery }) => {
		var url = `api/courses?page=${page}&perPage=${perPage}&columns=${columns}`;
		if (restQuery) {
			for (let [query, value] of Object.entries(restQuery)) {
				url = url + `&${query}=${value}`;
			}
		}
		const response = await api.get(url, { headers: headersWithToken() });
		return response.data;
	},
	get: async (id) => {
		const response = await api.get(`api/courses/${id}`, {
			headers: headersWithToken(),
		});
		return response.data;
	},
	fetch: async (id) => {
		const response = await api.get(`api/courses/fetch/${id}`, {
			headers: headersWithToken(),
		});
		return response.data;
	},
	buy: async (id) => {
		const response = await api.get(`api/buy-course/${id}`, {
			headers: headersWithToken(),
		})
		return response.data;
	},
	attachTopic: async (params) => {
		const response = await api.post(`api/attach-topic/`,
			params,
			{
				headers: headersWithToken(),
			})
		return response.data;
	},
	detachTopic: async (params) => {
		const response = await api.post(`api/detach-topic/`,
			params,
			{
				headers: headersWithToken(),
			})
		return response.data;
	}
};

export default courseResource;
