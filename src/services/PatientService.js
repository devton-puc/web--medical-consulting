import httpStrategies from "./HttpStrategies";
import { HttpError } from "../exceptions/HttpError";

const PatientService = () => {
    const BASE_URL = "http://localhost:5000/bff/patient";

    const listPatients = async (filter) => {
        let options = httpStrategies.POST;
        options.body = JSON.stringify(filter);
        const response = await fetch(`${BASE_URL}/list`, options);
        if (response.status === 204) {           
            throw new HttpError("Erro ao executar o aerviço.", response.status, null);
        }else if(!response.ok) {
            const errorBody = await response.json().catch(() => null); 
            throw new HttpError("Erro ao executar o aerviço.", response.status, errorBody);
  
        }
        return await response.json();
    };

    const createPatient = async (patient) => {
        let options = httpStrategies.POST;
        options.body = JSON.stringify(patient);
        const response = await fetch(`${BASE_URL}/create`, options);
        if (!response.ok) {
            const errorBody = await response.json().catch(() => null); 
            throw new HttpError("Erro ao executar o aerviço.", response.status, errorBody);
        }
        return await response.json();
    };

    const updatePatientById = async (id, patient) => {
        let options = httpStrategies.PUT;
        options.body = JSON.stringify(patient);
        const response = await fetch(`${BASE_URL}/${id}`, options);
        if (!response.ok) {
            const errorBody = await response.json().catch(() => null); 
            throw new HttpError("Erro ao executar o aerviço.", response.status, errorBody);
        }
        return await response.json();
    };

    const getPatientById = async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`,  httpStrategies.GET);
        if (!response.ok) {
            const errorBody = await response.json().catch(() => null); 
            throw new HttpError("Erro ao executar o aerviço.", response.status, errorBody);
        }
        return await response.json();
    };

    const getPatientByPersonalId = async (personalId) => {
        const response = await fetch(`${BASE_URL}/personal-id/${personalId}`,  httpStrategies.GET);
        if (!response.ok) {
            const errorBody = await response.json().catch(() => null); 
            throw new HttpError("Erro ao executar o aerviço.", response.status, errorBody);
        }
        return await response.json();
    };


    const deletePatientById = async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`, httpStrategies.DELETE);
        if (!response.ok) {
            const errorBody = await response.json().catch(() => null); 
            throw new HttpError("Erro ao executar o aerviço.", response.status, errorBody);
        }
        return await response.json();
    };

    return {listPatients, createPatient, updatePatientById, getPatientById, getPatientByPersonalId, deletePatientById}

};

export default PatientService();



