import React, { useState, useLayoutEffect, useEffect } from "react";
import { useModal } from '../providers/ModalContext';
import AppointmentService from "../services/AppointmentService";
import PatientService from "../services/PatientService";
import PaginatedTable from "../components/PaginatedTable";
import { useSpinner } from '../providers/SpinnerContext';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { HttpError } from "../exceptions/HttpError";
import { getAlertMessage } from '../utils/MessageUtils';
import { updateFormData } from "../utils/FormUtils";

const AppointmentList = () => {

  const [formData, setFormData] = useState({ personalId: ""});
  const [appointments, setAppointments] = useState([]);
  const [patient, setPatient] = useState();
  const [patientId, setPatientId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { showAlert, showConfirm } = useModal();
  const { showSpinner, hideSpinner } = useSpinner();
  const navigate = useNavigate();
  const location = useLocation();  
  const { success, message } = location?.state || {};

  
  useEffect(() => {
      if (success !== undefined && message) {
          showAlert(message, success ? 'success' : 'danger');
      }
  }, [location]); 

  useLayoutEffect(() => {
     fetchAppointments(currentPage);
  }, [currentPage,patientId]);

  const fetchPatientAppointment = ()=> {
      if (!formData.personalId) {        
        return;
      };      
      showSpinner();
      PatientService.getPatientByPersonalId(formData.personalId)
          .then((data) => {
            console.log(JSON.stringify(data));
            setPatient(data);
            setPatientId(data.id);
            fetchAppointments(currentPage);
          }).catch(error => {
            showAlert(getAlertMessage(error), "danger");
            hideSpinner();           
          });
  }

  const fetchAppointments = (page) => {
      
      if (!formData.personalId && !patientId) {        
        return;
      }; 
      showSpinner();
      const params = {
        page: page,
        per_page: 5,
        patient_id: patientId,  
      };
      AppointmentService.listAppointments(params)
        .then((data) => {
          setAppointments(data.appointments);
          setTotalPages(Math.ceil(data.total / data.per_page));
          hideSpinner();
        }).catch(error => {
          if (error instanceof HttpError && error.httpStatus != 204){
            showAlert(getAlertMessage(error), "danger");
          }          
          hideSpinner();           
        });
  };

  const deleteAppointment = (appointmentId)=>{
    showConfirm(`Você tem certeza que deseja excluir o paciente selecionado?`, (result) => {
      if (result) {
        showSpinner();
        AppointmentService.deleteAppointmentById(appointmentId)
          .then((data) => {
            showAlert('Consulta excluída com sucesso');
            setCurrentPage(1);
            fetchAppointments(currentPage);
          }).catch(error => {
            showAlert(getAlertMessage(error), "danger");
            hideSpinner();           
          });
      }
    });
  };

  const handleChange = (e) => {
    updateFormData(e, setFormData);
    setPatient();
    setAppointments([]);
    setCurrentPage(1);
  };

  const createAppointment = ()=>{
      navigate(`/appointment-form/patient/${patientId}/create`, {
	        state: formData
	    }); 
  }



  return (
    <>
    <div className="card">
      <div className="card-header">
          <h3>Agendamentos Marcados</h3>
      </div>
      <div className="card-body">
          <div className="card m-3">
              <div className="card-body">
                <div className="form-group">
                  <label for="name">CPF do Paciente</label>
                  <form>
                    <div className="input-group">
                        <input type="text" className="form-control" name="personalId" value={formData.personalId} onChange={handleChange} placeholder="Digite o cpf do paciente" />
                        <a className="btn btn-secondary" onClick={()=>fetchPatientAppointment()} id="searchPatient">Buscar</a>
                    </div>
                  </form>
                </div>
              </div>
          </div>
          { patient && appointments && (
              <>
                <div className="card m-3">
                      <div className="card-header">
                      <h4>Detalhes do Paciente</h4>
                      </div>
                      <div className="card-body">
                        <div className="col-md-4">
                              <strong>Nome:</strong>
                              <p>{patient.name}</p>
                        </div>
                        <div className="col-md-4">
                          <strong>CPF:</strong>
                          <p>{patient.personal_id}</p>
                        </div>
                        <div className="col-md-4">
                          <strong>Data de Nascimento:</strong>
                          <p>{patient.birth_date}</p>
                        </div>
                        <div className="col-md-4">
						                <button type="button" className="btn btn-primary mt-3" onClick={() => createAppointment()}>Criar Consulta</button>
					              </div>
                        <div className="m-3"></div>
                        <div className="card m-0">
                          <div className="card-header">
                              <h4>Consultas efetuadas</h4>
                          </div>
                          <div className="card-body">
                            <PaginatedTable
                                  currentPage={currentPage}
                                  totalPages={totalPages} 
                                  onPageChange={setCurrentPage} >
                                  <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Data da Consulta</th>
                                            <th>Crm do Medico</th>
                                            <th>Sintomas apresentados</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                  </thead>
                                  <tbody>
                                    {appointments.map((appointment) => (
                                      <tr key={appointment.id}>
                                        <td>{appointment.id}</td>
                                        <td><Link to={`/appointment-form/patient/${patient.id}/${appointment.id}`}>{new Date(appointment.date_time).toLocaleString()}</Link></td>
                                        <td>{appointment.doctor_crm}</td>
                                        <td>{appointment.symptoms}</td>
                                        <td><button type="button" className="btn btn-danger" onClick={() => deleteAppointment(appointment.id)} >Excluir</button></td>
                                      </tr>
                                    ))}
                                  </tbody>       
                            </PaginatedTable> 
                          </div>
                        </div>
                    </div>
                </div>
              </>
          )}     
        </div>  
      </div>
      </>
  );
};

export default AppointmentList;