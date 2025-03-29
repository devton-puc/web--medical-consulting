import React from "react";

const AppointmentForm = () => {
  return (
    <>
	  <div className="card">
		<div className="card-header">Efetuar Consulta Médica</div>
		<div className="card-body">
			<form>
				<div className="form-group">
					<label for="name">Nome do Paciente</label>
					<div className="input-group">
						<input type="text" className="form-control" id="name" placeholder="Digite o nome do paciente" />
						<button type="button" className="btn btn-secondary" id="searchPatient">Buscar</button>
					</div>
				</div>

				<div className="form-group">
					<label for="crm">CRM do Médico</label>
					<input type="text" className="form-control" id="crm" placeholder="Digite o CRM do médico" />
				</div>

				<div className="form-group">
					<label for="appointmentDate">Data da Consulta</label>
					<input type="date" className="form-control" id="appointmentDate" />
				</div>

				<div className="form-group">
					<label for="symptoms">Sintomas Apresentados</label>
					<textarea className="form-control" id="symptoms" rows="4" placeholder="Descreva os sintomas"></textarea>
				</div>

				<div className="mb-3 d-flex">
					<button type="reset" className="btn btn-secondary mt-3 me-3">Cancelar</button>
					<button type="submit" className="btn btn-primary mt-3">Cadastrar</button>
				</div>
			</form>
		</div>
	  </div>
    </>
  );
};

export default AppointmentForm;

