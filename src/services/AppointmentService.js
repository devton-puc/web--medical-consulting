import httpStrategies from "./HttpStrategies";
import { fetchApi } from "./FetchApi";

const AppointmentService = () => {
    const BASE_URL = "http://localhost:5000/bff/appointment";

    const listAppointments = async (filter) => {
        let options = httpStrategies.POST;
        options.body = JSON.stringify(filter);
        return await fetchApi(`${BASE_URL}/list`, options);
    };

    const createAppointment = async (appointment) => {
        let options = httpStrategies.POST;
        options.body = JSON.stringify(appointment);
        return await fetchApi(`${BASE_URL}/create`, options);
    };

    const updateAppointmentById = async (id, appointment) => {
        let options = httpStrategies.PUT;
        options.body = JSON.stringify(appointment);
        return await fetchApi(`${BASE_URL}/${id}`, options);
    };

    const getAppointmentById = async (id) => {
        return await fetchApi(`${BASE_URL}/${id}`,  httpStrategies.GET);
    };

    const deleteAppointmentById = async (id) => {
        return await fetchApi(`${BASE_URL}/${id}`, httpStrategies.DELETE);
    };

    const generateMedications = async (symptoms) => {
        let options = httpStrategies.POST;
        options.body = JSON.stringify(symptoms);
        return await fetchApi(`${BASE_URL}/medications/generate`, options);
    }

    return {listAppointments, createAppointment, updateAppointmentById, getAppointmentById, deleteAppointmentById, generateMedications}

};

export default AppointmentService();



