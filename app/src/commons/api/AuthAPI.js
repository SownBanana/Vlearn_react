import api, { headersWithToken } from "../AxiosCommon";

const authAPI = {
	register: async ({ name, username, email, password, role }) => {
		const response = await api.post(`/api/register`, {
			name,
			username,
			email,
			password,
			role,
		});
		return response.data;
	},
	login: async ({ login, password }) => {
		try {
			let response = await api.post(`/api/login`, {
				login,
				password,
			});
			return response.data;
		} catch (e) {
			console.log("Error=======?", e)
			if (e.response.status === 401) return e.response.data;
		}
	},
	logout: async () => {
		const response = await api.post(
			`/api/logout`,
			{},
			{
				headers: headersWithToken(),
			}
		);
		return response.data;
	},

	refreshToken: async (refresh_token) => {
		const response = await api.post(`/api/auth/refresh`, {
			refresh_token,
		});
		return response.data;
	},

	resendEmail: async (email) => {
		const response = await api.post(`/api/resend-confirm`, {
			email,
		});
		return response.data;
	},
	checkPassport: async () => {

		const response = await api.get(`/api/check-passport`, {
			headers: headersWithToken(),
		});
		return response.data;
	},
	getSocialURL: async (social) => {
		const response = await api.get(`api/auth/${social}/url`);
		return response.data;
	},
	getSocialCallback: async ({ social, search }) => {
		console.log(social, search);
		const response = await api.get(`/api/auth/${social}/callback${search}`);
		return response.data;
	},
	createSocial: async (params) => {
		const response = await api.post(`/api/auth/create-social`, params);
		return response.data;
	},
	attachSocial: async (params) => {
		console.log(
			params
		);
		const response = await api.post(`/api/auth/attach-social`, params);
		return response.data;
	},
	//email/username
	resetPassword: async (params) => {
		console.log(
			params
		);
		const response = await api.post(`/api/auth/reset-password`, params);
		return response.data;
	},
	//code & password
	verifyResetPassword: async (params) => {
		console.log(
			params
		);
		const response = await api.post(`/api/auth/verify-reset-password`, params);
		return response.data;
	},
};

export default authAPI;
