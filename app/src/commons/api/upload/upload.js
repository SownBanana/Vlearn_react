import api, { headersWithToken } from "commons/AxiosCommon";

const uploadApi = {
	upload: async ({ file }) => {
		const data = new FormData();
		data.append("upload", file);
		console.log("data ======> ", data);
		console.log("File:", file);

		const response = await api.post(`/api/upload`, data, {
			headers: headersWithToken(),
		});
		return response.data;
	},
};

export default uploadApi;
