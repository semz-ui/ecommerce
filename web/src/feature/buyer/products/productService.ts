import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const getFilteredItemsItems = async (category: any) => {
    console.log(category, "clicked")
    const response = await axios.get(API_URL + "items/get-filtered-items/" + category)
    return response.data
}

const productService = {
    getFilteredItemsItems,
}

export default productService