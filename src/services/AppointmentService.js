import httpStrategies from "./HttpStrategies";

const AppointmentService = () => {
    const BASE_URL = "http://localhost:5000/bff/appointment";

    const listAppointments = async (filter) => {
        let options = httpStrategies.POST;
        options.body = filter;
        const response = await fetch(`${BASE_URL}/list`, options);
        if (!response.ok) {
            throw new Error("Erro ao listar as Consultas.");
        }
        return await response.json();
    };

    const createAppointment = async (appointment) => {
        let options = httpStrategies.POST;
        options.body = appointment;
        const response = await fetch(`${BASE_URL}/create`, options);
        if (!response.ok) {
            throw new Error("Erro ao criar a Consulta.");
        }
        return await response.json();
    };

    const updateAppointmentById = async (id, appointment) => {
        let options = httpStrategies.PUT;
        options.body = appointment;
        const response = await fetch(`${BASE_URL}/${id}`, options);
        if (!response.ok) {
            throw new Error("Erro ao atualizar a Consulta.");
        }
        return await response.json();
    };

    const getAppointmentById = async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`,  httpStrategies.GET);
        if (!response.ok) {
            throw new Error("Erro ao buscar a Consulta.");
        }
        return await response.json();
    };

    const deleteAppointmentById = async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`, httpStrategies.DELETE);
        if (!response.ok) {
            throw new Error("Erro excluir o paciente.");
        }
        return await response.json();
    };

    return {listAppointments, createAppointment, updateAppointmentById, getAppointmentById, deleteAppointmentById}

};

export default AppointmentService();



