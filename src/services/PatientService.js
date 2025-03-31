import httpStrategies from "./HttpStrategies";

const PatientService = () => {
    const BASE_URL = "http://localhost:5000/bff/patient";

    const listPatients = async (filter) => {
        let options = httpStrategies.POST;
        options.body = filter;
        const response = await fetch(`${BASE_URL}/list`, options);
        if (!response.ok) {
            throw new Error("Erro ao listar os Pacientes.");
        }
        return await response.json();
    };

    const createPatient = async (patient) => {
        let options = httpStrategies.POST;
        options.body = patient;
        const response = await fetch(`${BASE_URL}/create`, options);
        if (!response.ok) {
            throw new Error("Erro ao criar o Paciente.");
        }
        return await response.json();
    };

    const updatePatientById = async (id, patient) => {
        let options = httpStrategies.PUT;
        options.body = patient;
        const response = await fetch(`${BASE_URL}/${id}`, options);
        if (!response.ok) {
            throw new Error("Erro ao atualizar o Paciente.");
        }
        return await response.json();
    };

    const getPatientById = async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`,  httpStrategies.GET);
        if (!response.ok) {
            throw new Error("Erro ao buscar o Paciente.");
        }
        return await response.json();
    };

    const getPatientByPersonalId = async (personalId) => {
        const response = await fetch(`${BASE_URL}/personal-id/${personalId}`,  httpStrategies.GET);
        if (!response.ok) {
            throw new Error("Erro ao buscar o Paciente.");
        }
        return await response.json();
    };


    const deletePatientById = async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`, httpStrategies.DELETE);
        if (!response.ok) {
            throw new Error("Erro excluir o paciente.");
        }
        return await response.json();
    };

    return {listPatients, createPatient, updatePatientById, getPatientById, getPatientByPersonalId, deletePatientById}

};

export default PatientService();



