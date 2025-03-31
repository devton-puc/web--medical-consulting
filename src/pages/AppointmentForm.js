import React, { useState, useLayoutEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import AppointmentService from "../services/AppointmentService";
import { useSpinner } from '../providers/SpinnerContext';
import { useModal } from '../providers/ModalContext';
import { useParams } from "react-router-dom";

const AppointmentForm = () => {

  const [loading, setLoading] = useState(false);
  const { patient_id, action } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSpinner, hideSpinner } = useSpinner();
  const { showAlert, showConfirm } = useModal();

  const initialState = {
    patient_id: patient_id,
    doctor_crm: "",
    date_time: "",
    symptoms: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [medications, setMedications] = useState([]);

  	useLayoutEffect(() => {        
		  if (action === 'create'){
				  setLoading(true)
				  return;
		  }
		  showSpinner();
		  AppointmentService.getAppointmentById(action)
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

  

  const changeFormData = (data = initialState) => {
    setFormData(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
	if (name === "symptoms"){
		setMedications([]);
	}
  };

  const handleSubmit = (e) => {
	e.preventDefault();
	console.log(formData);
   /* navigate('/appointment-list', {
	  state: formData
	}); */
  };

  const handleCancel = () =>{
	changeFormData();
	setMedications([]);
  }

  return (
    <>
	  {loading && (
			<div className="card">
			  <div className="card-header">Efetuar Consulta Médica</div>
			  <div className="card-body">
				  <form>
					  <input type="hidden" name="id" value={formData.patient_id} />
					  <div className="form-group m-2">
						  <label for="zip">CRM do Médico</label>
						  <input type="text" className="form-control" name="doctor_crm" value={formData.doctor_crm} onChange={handleChange} placeholder="Digite o CRM do médico" />
					  </div>
	  
					  <div className="form-group m-2">
						  <label for="appointmentDate">Data da Consulta</label>
						  <input type="datetime-local" className="form-control" name="date_time" value={formData.date_time} onChange={handleChange} />
					  </div>
	  
					  <div className="form-group m-2">
						  <label for="symptoms">Sintomas Apresentados</label>
						  <textarea className="form-control" name="symptoms" value={formData.symptoms} onChange={handleChange} rows="4" placeholder="Descreva os sintomas"></textarea>
					  </div>
	  
					  <div className="mb-3 d-flex m-2">
						  <button type="reset" className="btn btn-secondary mt-3 me-3" onClick={handleCancel}>Cancelar</button>
						  <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit}>Cadastrar</button>
					  </div>
				  </form>
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
			  </div>
			</div>
	  )}
    </>
  );
};

export default AppointmentForm;

