// import { Axios } from "axios";
import token from "./authService";

const Axios = require("axios");

Axios.interceptors.response.use(null, (error) => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if (!expectedError) {
        console.log("Logging the error from axios interceptors", error.response);
        alert("An unexpected error occured");
    }
    console.log(error.response);
    return Promise.reject(error);
});

const protectedGet = (api) => {
    const jwt = token();
    const response = Axios.get(api, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    return response;
};

const protectedPost = (api, body) => {
    const jwt = token();
    const response = Axios.post(api, body, {
        headers: {
            'Authorization': `Bearer ${jwt}`,
        },
    });
    return response;
};

const get = (api, params, headers) => {
    return Axios.get(api, { params, headers });
}

export default {
    get,
    post: Axios.post,
    put: Axios.put,
    delete: Axios.delete,
    protectedGet,
    protectedPost,
};
