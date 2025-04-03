import React, { useState, useLayoutEffect, useEffect } from "react";
import { useModal } from '../providers/ModalContext';
import PatientService from "../services/PatientService";
import PaginatedTable from "../components/PaginatedTable";
import { useSpinner } from '../providers/SpinnerContext';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getAlertMessage } from '../utils/MessageUtils';
import { updateFormData } from "../utils/FormUtils";
import { HttpError } from "../exceptions/HttpError";

const PatientList = () => {

     
    const [formData, setFormData] = useState({ name: ""});
    const [patients, setPatients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
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
        fetchPatients(currentPage);
    }, [currentPage]);


    const deletePatient = (patientId)=>{
        showConfirm(`Você tem certeza que deseja excluir a consulta selecionado?`, (result) => {
          if (result) {
            showSpinner();
            PatientService.deletePatientById(patientId)
              .then((data) => {
                showAlert('Consulta excluída com sucesso');
                setCurrentPage(1);
                fetchPatients(currentPage);
              }).catch(error => {
                  showAlert(getAlertMessage(error), "danger"); 
                  hideSpinner();           
              });
          }
        });
    };

    const fetchPatients = (page) => {
        if (!formData.name) {        
            return;
        };
        showSpinner();
        const params = {
            page: page,
            per_page: 5,
            name: formData.name,  
        };
        PatientService.listPatients(params)
            .then((data) => {
              setPatients(data.patients);
              setTotalPages(Math.ceil(data.total / data.per_page));
              setLoading(false);
              hideSpinner();
            }).catch(error => {
                const message = error instanceof HttpError && error.httpStatus === 204
                  ? "Nenhum resultado encontrado."
                  : error instanceof HttpError 
                    ? getAlertMessage(error) 
                    : error;
            
                showAlert(message, "danger");    
                hideSpinner();       
            });
    };

    const handleChange = (e) => {
        updateFormData(e,setFormData);
        setPatients([]);
        setCurrentPage(1);
    };

    const createPatient = ()=>{
        navigate(`/patient-form/create`, {
              state: formData
        }); 
    }




  return (
      <div className="card">
      <div className="card-header">
          <h3>Cadastro de Pacientes</h3>
      </div>
      <div className="card-body">
            <form>
              <div className="form-group">
                  <label htmlFor="name">Nome do Paciente</label>
                  <div className="input-group">
                      <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Digite o nome do paciente" />
                      <button type="button" className="btn btn-secondary" onClick={()=> fetchPatients(1)} id="searchPatient">Buscar</button>
                  </div>
              </div>
              <div className="col-md-4">
					<button type="button" className="btn btn-primary mt-3" onClick={() => createPatient()}>Criar Paciente</button>
			  </div>
              <div className="m-3"></div>             
            </form>
            <PaginatedTable
                currentPage={currentPage}
                totalPages={totalPages} 
                onPageChange={setCurrentPage} >
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Paciente</th>
                       <th>Data de Nascimento</th>
                      <th>Telefone</th>
                      <th>&nbsp;</th>
                  </tr>
              </thead>
              <tbody>
                   {patients.map((patient) => (
                    <tr key={patient.id}>
                        <td>{patient.id}</td>
                        <td><Link to={`/patient-form/${patient.id}`}>{patient.name}</Link></td>
                        <td>{patient.birth_date}</td>
                        <td>{patient.phone}</td>
                        <td><button type="button" className="btn btn-danger" onClick={() => deletePatient(patient.id)} >Excluir</button></td>
                    </tr>
                    ))}
                </tbody> 
            </PaginatedTable> 
      </div>
    </div>
  );
};

export default PatientList;