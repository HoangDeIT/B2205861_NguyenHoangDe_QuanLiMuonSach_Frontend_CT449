
import { useStorage } from "@vueuse/core";
import axios from "axios";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${useStorage("access_token").value}`,
    },
}

const createApiClient = (baseURL) => {
    return axios.create({
        baseURL,
        ...commonConfig
    });
};

export default createApiClient;
