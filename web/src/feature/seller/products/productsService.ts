import axios from "axios";


const API_URL = "http://127.0.0.1:3000/"

const createProduct = async (productData: any, token: string) => { }
const getSellersProducts = async (token: string) => { }

const productsService = {
    createProduct,
    getSellersProducts
}

export default productsService