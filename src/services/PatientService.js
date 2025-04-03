import httpStrategies from "./HttpStrategies";
import { fetchApi } from "./FetchApi";

const PatientService = () => {
    const BASE_URL = "http://localhost:5000/bff/patient";

    const listPatients = async (filter) => {
        let options = httpStrategies.POST;
        options.body = JSON.stringify(filter);
       return await fetchApi(`${BASE_URL}/list`, options);
    };

    const createPatient = async (patient) => {
        let options = httpStrategies.POST;
        options.body = JSON.stringify(patient);
       return await fetchApi(`${BASE_URL}/create`, options);
    };

    const updatePatientById = async (id, patient) => {
        let options = httpStrategies.PUT;
        options.body = JSON.stringify(patient);
       return await fetchApi(`${BASE_URL}/${id}`, options);
    };

    const getPatientById = async (id) => {
       return await fetchApi(`${BASE_URL}/${id}`,  httpStrategies.GET);
    };

    const getPatientByPersonalId = async (personalId) => {
       return await fetchApi(`${BASE_URL}/personal-id/${personalId}`,  httpStrategies.GET);
    };


    const deletePatientById = async (id) => {
       return await fetchApi(`${BASE_URL}/${id}`, httpStrategies.DELETE);
    };

    return {listPatients, createPatient, updatePatientById, getPatientById, getPatientByPersonalId, deletePatientById}

};

export default PatientService();



