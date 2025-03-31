import React, { useState, useLayoutEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import AppointmentService from "../services/AppointmentService";
import { useSpinner } from '../providers/SpinnerContext';
import { useModal } from '../providers/ModalContext';
import { useParams } from "react-router-dom";

const AppointmentConfirmation = () => {

  const [loading, setLoading] = useState(false);
  const {appointment_id} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSpinner, hideSpinner } = useSpinner();
  const { showAlert, showConfirm } = useModal();

  const initialState = {
    patient_id: "",
    doctor_crm: "",
    date_time: "",
    symptoms: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [medications, setMedications] = useState([]);

  	useLayoutEffect(() => {        
		  showSpinner();
		  AppointmentService.getAppointmentById(appointment_id)
			  .then(data => {
				  console.log(JSON.stringify(data));
				  hideSpinner();
				  setLoading(true);
				  setFormData({
					patient_id: data.patient_id || "",
					doctor_crm: data.doctor_crm || "",
					date_time: data.date_time || "",
					symptoms: data.symptoms || ""
				 });
				 setMedications(data.medications);
		  }).catch((error) => console.error("Erro ao carregar dados:", error));
  
	  }, []);

  
  const handleSubmit = (e) => {
	e.preventDefault();
	console.log(formData);
   /* navigate('/appointment-list', {
	  state: formData
	}); */
  };

  const handleCancel = () =>{
    navigate(`/appointment-form/patient/${formData.patient_id}/${appointment_id}`, {
	  state: formData
	}); 
  }

  return (
    <>
	  {loading && (
		<div className="card">
			<div className="card-header">Confirmação de Dados da Consulta Médica</div>
			<div className="card-body">
				
				<div className="form-group m-2">
					<label><b>CRM do Médico:</b> {formData.doctor_crm}</label>									
				</div>
				<div className="form-group m-2">					
					<label><b>Data da Consulta:</b> {new Date(formData.date_time).toLocaleString()}</label>					
				</div>

				<div className="form-group m-2">				
					<label><b>Sintomas Apresentados:</b> {formData.symptoms}</label>					
				</div>

				{medications.length > 0 && (
				<>
					<h3>Lista de Medicamentos</h3>
					<table className="table table-striped border">
					<thead>
						<tr>
						<th scope="col">Medicamento</th>
						<th scope="col">Dosagem</th>
						<th scope="col">Instruções</th>
						</tr>
					</thead>
					<tbody>
						{medications.map((medication, index) => (
						<tr key={index}>
							<td>{medication.name}</td>
							<td>{medication.dosage}</td>
							<td>{medication.instructions}</td>
						</tr>
						))}
					</tbody>
					</table>
				</>
				)}
				<div className="mb-3 d-flex m-2">
				<button type="button" className="btn btn-secondary mt-3 me-3" onClick={handleCancel}>Cancelar</button>
				<button type="button" className="btn btn-primary mt-3" onClick={handleSubmit}>Confirmar</button>
				</div>
			</div>
		</div>
	  )}
    </>
  );
};

export default AppointmentConfirmation;

