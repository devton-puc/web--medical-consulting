import React from "react";
import { useModal } from '../providers/ModalContext';

const AppointmentList = () => {

  const { showAlert, showConfirm } = useModal();

  const cancelAppointment = (row) => {

    showConfirm(`Você tem certeza que deseja cancelar o agendamento do paciente selecionado?`, (result) => {
      if (result) {
        showAlert('Agendamento cancelado com sucesso.', 'success');
      }
    });

  };


  return (
    <>
    <div className="card">
      <div className="card-header">
          <h3>Agendamentos Marcados</h3>
      </div>
      <div className="card-body">
          <form>
              <div className="form-group">
                  <label for="name">Nome do Paciente</label>
                  <div className="input-group">
                      <input type="text" className="form-control" id="name" placeholder="Digite o nome do paciente" />
                      <button type="button" className="btn btn-secondary" onClick={cancelAppointment} id="searchPatient">Buscar</button>
                  </div>
              </div>
          </form>
          <table className="mt-3 table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Paciente</th>
                        <th>Crm do Medico</th>
                        <th>Data da Consulta</th>
                    </tr>
                </thead>
                <tbody id="appointmentTableBody">
                </tbody>
          </table>
        </div>  
      </div>
      </>
  );
};

export default AppointmentList;