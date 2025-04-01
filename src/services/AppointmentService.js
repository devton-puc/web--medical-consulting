import httpStrategies from "./HttpStrategies";
import { HttpError } from "../exceptions/HttpError";

const AppointmentService = () => {
    const BASE_URL = "http://localhost:5000/bff/appointment";

    const listAppointments = async (filter) => {
        let options = httpStrategies.POST;
        options.body = JSON.stringify(filter);
        const response = await fetch(`${BASE_URL}/list`, options);
        if (!response.ok) {
            const errorBody = await response.json().catch(() => null); 
            throw new HttpError("Erro ao executar o aerviço.", response.status, errorBody);
        }
        return await response.json();
    };

    const createAppointment = async (appointment) => {
        let options = httpStrategies.POST;
        options.body = JSON.stringify(appointment);
        const response = await fetch(`${BASE_URL}/create`, options);
        if (!response.ok) {
            const errorBody = await response.json().catch(() => null); 
            throw new HttpError("Erro ao executar o aerviço.", response.status, errorBody);
        }
        return await response.json();
    };

    const updateAppointmentById = async (id, appointment) => {
        let options = httpStrategies.PUT;
        options.body = JSON.stringify(appointment);
        const response = await fetch(`${BASE_URL}/${id}`, options);
        if (!response.ok) {
            const errorBody = await response.json().catch(() => null); 
            throw new HttpError("Erro ao executar o aerviço.", response.status, errorBody);
        }
        return await response.json();
    };

    const getAppointmentById = async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`,  httpStrategies.GET);
        if (!response.ok) {
            const errorBody = await response.json().catch(() => null); 
            throw new HttpError("Erro ao executar o aerviço.", response.status, errorBody);
        }
        return await response.json();
    };

    const deleteAppointmentById = async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`, httpStrategies.DELETE);
        if (!response.ok) {
            const errorBody = await response.json().catch(() => null); 
            throw new HttpError("Erro ao executar o aerviço.", response.status, errorBody);
        }
        return await response.json();
    };

    const generateMedications = async (symptoms) => {
        let options = httpStrategies.POST;
        options.body = JSON.stringify(symptoms);
        const response = await fetch(`${BASE_URL}/medications/generate`, options);
        if (!response.ok) {
            const errorBody = await response.json().catch(() => null); 
            throw new HttpError("Erro ao executar o aerviço.", response.status, errorBody);
        }
        return await response.json();
    }

    return {listAppointments, createAppointment, updateAppointmentById, getAppointmentById, deleteAppointmentById, generateMedications}

};

export default AppointmentService();



