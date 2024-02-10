import axios from "axios"


const API_URL = import.meta.env.VITE_API_URL

const register = async (userData: any) => {
    const response = await axios.post(API_URL + "register", userData)
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data) as string);
    }

    return response.data
}

const login = async (userData: any) => {
    const response = await axios.post(API_URL + "login", userData)
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data) as string);
    }
    return response.data
}

const logout = async () => {
    localStorage.removeItem("user")
}

const authService = {
    register,
    login,
    logout
}

export default authService