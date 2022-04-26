import axios from "axios";

const url = "http://endpoint-blog.ninedragonlabs.com/api";

export const loginUser = async(email, password) => {
    const { data, status } = await axios.post(url + "/login", {
        email,
        password,
    });
    return { data, status };
};

export const registerUser = async(name, email, password, c_password) => {
    const { data, status } = await axios.post(url + "/register", {
        name,
        email,
        password,
        c_password,
    });
    return { data, status };
};

export const getCategory = async() => {
    const result = await axios.get(url + "/get_category");
    return result;
};

export const createCategory = async(request) => {
    const result = await axios.post(url + "create_category", { request });
    return result;
};