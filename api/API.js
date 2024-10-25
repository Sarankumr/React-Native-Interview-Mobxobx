import axios from "axios";

// create instance
export const API = axios.create({
    baseURL: BaseUrl,
    timeout: 1000000,
    headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
API.interceptors.request.use(
    async (config) => {
        // Do something before request is sent
        // get token from firebase
        // const token = await user.getIdToken();

        // if (token) {
        //     config.headers = {
        //         ...config.headers,
        //         authorization: `Bearer ${token}`,
        //     };
        // }
        return config;
    },
    (error) => {

        // Do something with request error
        return Promise.reject(error);
    }
);
API.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);
