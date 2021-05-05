import api, { headersWithToken } from "commons/AxiosCommon";

const courseResource = {
	store: async ({ course, deleteSections, deleteLessons }) => {
		console.log(course);
		const response = await api.post(
			`/api/courses`,
			{
				course,
				deleteSections,
				deleteLessons,
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
};

export default courseResource;
