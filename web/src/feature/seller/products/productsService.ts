import axios from "axios";


const API_URL = "http://127.0.0.1:3000/items/"

const createProduct = async (productData: any, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + "create-item", productData, config)
    return response.data
}
const getSellersProducts = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + "get-sellers-items", config)
    return response.data
}

const productsService = {
    createProduct,
    getSellersProducts
}

export default productsService