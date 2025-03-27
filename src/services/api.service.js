
import { useStorage } from "@vueuse/core";
import axios from "axios";

// const commonConfig = {
//     headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${useStorage("access_token").value}`,
//     },
// }

// const createApiClient = (baseURL) => {
//     return axios.create({
//         baseURL,
//         ...commonConfig
//     });
// };
const accessToken = useStorage("access_token");

const createApiClient = (baseURL) => {
    const api = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    // Interceptor thêm token vào mỗi request
    api.interceptors.request.use((config) => {
        const token = accessToken.value; // Lấy token mới nhất từ useStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return api;
};
export default createApiClient;
