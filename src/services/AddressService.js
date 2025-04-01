import httpStrategies from "./HttpStrategies";
import { HttpError } from "../exceptions/HttpError";

const AddressService = () => {
    const BASE_URL = "http://localhost:5000/bff/zipcode";

    const getAddressByCep = async (cep) => {
        const response = await fetch(`${BASE_URL}/${cep}`,httpStrategies.GET);
        if (!response.ok) {
            const errorBody = await response.json().catch(() => null); 
            throw new HttpError("Erro ao executar o aerviço.", response.status, errorBody);
        }
        return await response.json();

    };
  
    return { getAddressByCep };
  };
  
  export default AddressService();
  