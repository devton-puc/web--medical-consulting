import { HttpError } from "../exceptions/HttpError";

export const getAlertMessage = (error) => {
    if (error instanceof HttpError) {
        if (error.httpStatus === 204) {
            return "Nenhum resultado encontrado";
        }
        return error.body?.message || error.body || error.constructor?.name || "Erro desconhecido";
    }

    return `Erro: ${error}`;
};



