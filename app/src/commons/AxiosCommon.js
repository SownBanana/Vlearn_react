import axios from "axios";
import { authFail } from "features/Authenticate/authSlices";

export const headersWithToken = (access_token = null) => {
	if (access_token === null && localStorage) {
		const access_token = JSON.parse(localStorage.getItem("auth")).access_token;
		return {
			Authorization: `Bearer ${access_token}`,
		};
	} else if (access_token !== null) {
		return {
			Authorization: `Bearer ${access_token}`,
		};
	}
	return {};
};
export const headersWithSocketId = () => {
	if (localStorage) {
		const access_token = JSON.parse(localStorage.getItem("auth")).access_token;
		return {
			Authorization: `Bearer ${access_token}`,
		};
	} else return {};
};

console.log(`${process.env.REACT_APP_BACKEND_URL}`);

const instance = axios.create({
	baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
	withCredentials: true,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": `${process.env.REACT_APP_URL}`,
		"Access-Control-Allow-Credentials": "true",
	},
});

export const initAxiosInterceptors = (store) => {
	instance.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			// const originalRequest = error.config;
			// if (error.response.status === 401 && !originalRequest._retry) {
			if (error.response.status === 401) {
				console.log("Trying to refresh Token in Axios");
				return instance
					.post("/api/auth/refresh")
					.then((response) => {
						error.response.config.headers["Authorization"] =
							"Bearer " + response.data.access_token;
						return instance(error.config);
					})
					.catch((error) => {
						debugger
						store.dispatch(authFail());
						return Promise.reject(error);
					});
			}
			return Promise.reject(error);
		}
	);
}

export default instance;
