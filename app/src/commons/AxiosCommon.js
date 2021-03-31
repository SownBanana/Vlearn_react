import axios from "axios";

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

export default axios.create({
	// baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
	baseURL: `http://localhost:8088`,
	withCredentials: true,
	headers: {
		"Access-Control-Allow-Origin": "http://localhost",
		Accept: "application/json",
		"Content-Type": "application/json",
		"Access-Control-Allow-Credentials": "true",
	},
});
