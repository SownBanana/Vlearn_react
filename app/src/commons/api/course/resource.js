import api, { headersWithToken } from "commons/AxiosCommon";

const courseResource = {
	store: async ({ course }) => {
		console.log(course);
		const response = await api.post(
			`/api/courses`,
			{
				course,
			},
			{
				headers: headersWithToken(),
			}
		);
		return response.data;
	},
	// getSocialURL: async (social) => {
	// 	const response = await api.get(`api/auth/${social}/url`);
	// 	return response.data;
	// },
};

export default courseResource;
