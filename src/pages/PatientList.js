import React from "react";

const PatientList = () => {
  return (
      <div classNameName="card">
      <div classNameName="card-header">
          <h3>Cadastro de Pacientes</h3>
      </div>
      <div classNameName="card-body">
          <form>
              <div className="form-group">
                  <label for="name">Nome do Paciente</label>
                  <div className="input-group">
                      <input type="text" className="form-control" id="name" placeholder="Digite o nome do paciente" />
                      <button type="button" className="btn btn-secondary" id="searchPatient">Buscar</button>
                  </div>
              </div>
          </form>
          <table className="mt-3 table table-striped table-bordered">
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Paciente</th>
                       <th>Data de Nascimento</th>
                      <th>Telefone</th>
                  </tr>
              </thead>
              <tbody id="appointmentTableBody">
              </tbody>
          </table>
      </div>
    </div>
  );
};

export default PatientList;