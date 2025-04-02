export const getAlertMessage = (error) => {
    const alertMessages = {
        HttpError: {
            204: () => "Nenhum resultado encontrado",
            default: (err) => err.body?.message || "Erro desconhecido"
        },
        default: (err) => `Erro: ${err}`
    };

    const errorType = error?.constructor?.name || 'default';
    const statusHandler = alertMessages[errorType]?.[error?.httpStatus] || alertMessages[errorType]?.default || alertMessages.default;
    return statusHandler(error);
};



