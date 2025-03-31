const httpStrategies = {
    GET: { method: 'GET', headers: { 'Content-Type': 'application/json' } },
    POST: { method: 'POST', headers: { 'Content-Type': 'application/json' } },
    PUT: { method: 'PUT', headers: { 'Content-Type': 'application/json' } },
    DELETE: { method: 'DELETE', headers: { 'Content-Type': 'application/json' } },
};

export default httpStrategies;