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
	getPresignedUrl: async ({ file }) => {
		let file_extension = file.name.split('.').pop();
		let type = file.type;
		const response = await api.get(`/api/upload/presigned?file_extension=${file_extension}&type=${type}`, {
			headers: headersWithToken(),
		});
		return response.data;
	},
	uploadPresigned: async ({ presigned_url, file }) => {
		// const data = new FormData();
		// data.append("upload", file);
		// console.log("data ======> ", data);
		console.log("File:", file);
		const response = await api.put(presigned_url, file, { headers: { 'Content-Type': file.type } });
		return response.status;
	},
	uploadDirect: async ({ file }) => {
		const response = await uploadApi.getPresignedUrl({ file: file });
		if (response.status === true) {
			const { presigned_url } = response;
			const resp_status = await uploadApi.uploadPresigned({ presigned_url, file });
			if (resp_status === 200) {
				return response;
			}
		}
		return false;
	}
};

export default uploadApi;
