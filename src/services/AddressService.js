import httpStrategies from "./HttpStrategies";

const AddressService = () => {
    const BASE_URL = "http://localhost:5000/bff/zipcode";

    const getAddressByCep = async (cep) => {
        const response = await fetch(`${BASE_URL}/${cep}`,httpStrategies.GET);
        if (!response.ok) {
            throw new Error("Erro ao buscar o endereço.");
        }
        return await response.json();

    };
  
    return { getAddressByCep };
  };
  
  export default AddressService();
  