import { HttpError } from "../exceptions/HttpError";

export async function fetchApi(endpoint, options = {}) {
    const response = await fetch(endpoint, options);
    return handleResponse(response);
}

const handleResponse = async(response) =>{
    if (response.status !== 200) {
        const errorBody = await response.json().catch(() => null); 
        throw new HttpError("Erro ao executar o aerviço.", response.status, errorBody);
    }
    return await response.json();
}