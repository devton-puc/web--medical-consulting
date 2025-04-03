import httpStrategies from "./HttpStrategies";
import { fetchApi } from "./FetchApi";

const AddressService = () => {
    const BASE_URL = "http://localhost:5000/bff/zipcode";

    const getAddressByCep = async (cep) => {
       return await fetchApi(`${BASE_URL}/${cep}`,httpStrategies.GET);
    };
  
    return { getAddressByCep };
  };
  
  export default AddressService();
  