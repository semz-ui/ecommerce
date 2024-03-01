import axios from "axios"


const API_URL = import.meta.env.VITE_API_URL

const register = async (userData: any) => {
    const response = await axios.post(API_URL + "auth/register", userData)
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data) as string);
    }

    return response.data
}

const login = async (userData: any) => {
    console.log(API_URL, "API_URL")
    const response = await axios.post(API_URL + "auth/login", userData)
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data) as string);
    }
    return response.data
}

const sendMail = async (_: any, token: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    console.log(token, "token")
    const response = await axios.post(API_URL + "auth/send-token", _, config)
    return response.data
}
const verifyUser = async (tok: any, token: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${tok}`,
        },
    };
    console.log(token, "token")
    const response = await axios.post(API_URL + "auth/verify-user", token, config)
    return response.data
}

const editProfile = async (userData: any, token: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.patch(API_URL + "auth/update-user", userData, config)
    return response.data

}

const logout = async () => {
    localStorage.removeItem("user")
}

const authService = {
    register,
    login,
    sendMail,
    logout,
    verifyUser,
    editProfile
}

export default authService