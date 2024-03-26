import axios from "axios";
const baseURL: string = 'https://www.thecocktaildb.com/api/json/v1/1/search.php'
export const httpClient = axios.create({
    baseURL
})


