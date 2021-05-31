import api, { headersWithToken } from "commons/AxiosCommon";

const uploadApi = {
	upload: async ({ file, info = null }) => {
		const data = new FormData();
		data.append("upload", file);
		if (info)
			data.append("info", info);
		console.log("data ======> ", data);
		console.log("File:", file);

		const response = await api.post(`/api/upload`, data, {
			headers: headersWithToken(),
		});
		return response.data;
	},
	getPresignedUrl: async ({ file }) => {
		let file_extension = file.name.split('.').pop();
		let type = file.type;
		const response = await api.get(`/api/upload/
			presigned?name=${file.name}
			&file_extension=${file_extension}
			&size=${file.size}
			&type=${type}`,
			{
				headers: headersWithToken(),
			});
		return response.data;
	},
	uploadPresigned: async ({ presigned_url, file }) => {
		// console.log("File:", file);
		const response = await api.put(presigned_url, file, { headers: { 'Content-Type': file.type } });
		return response.status;
	},
	uploadDirect: async (params) => {
		const response = await uploadApi.getPresignedUrl(params);
		if (response.status === true) {
			const { presigned_url } = response;
			const resp_status = await uploadApi.uploadPresigned({ presigned_url, file: params.file });
			if (resp_status === 200) {
				return response;
			}
		}
		return false;
	},
	uploadResourceToLesson: async (params) => {
		const response = await api.post(`/api/upload-resource`, params, {
			headers: headersWithToken(),
		});
		return response.data;
	}
};

export default uploadApi;
