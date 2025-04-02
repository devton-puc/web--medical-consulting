import React, { useState, useLayoutEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import AppointmentService from "../services/AppointmentService";
import { useSpinner } from '../providers/SpinnerContext';
import { useModal } from '../providers/ModalContext';
import { useParams } from "react-router-dom";
import { getAlertMessage } from '../utils/MessageUtils';
import { updateFormData } from "../utils/FormUtils";

const AppointmentForm = () => {

  const { patient_id, action } = useParams();
  const initialState = {
		patient_id: patient_id,
		doctor_crm: "",
		date_time: "",
		symptoms: "",
		medications: []
  };

  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();
  const { showSpinner, hideSpinner } = useSpinner();
  const { showAlert } = useModal();
  console.log(action);
  const [idAppointment, setIdAppointment] = useState(action);
  const [formData, setFormData] = useState(initialState);
  const [medications, setMedications] = useState([]);

  const changeFormData = (data = initialState) => {
    setFormData(data);
  };

  const handleChange = (e) => {
    const { name } = e.target;
	updateFormData(e, setFormData);
	if (name === "symptoms"){
		setMedications([]);
	}
  };

  useLayoutEffect(() => {        
	fetchAppointment();
  }, []);
  
  const fetchAppointment = ()=>{
	if (action === 'create'){
		setLoading(true)
		return;
	}
	showSpinner();
	AppointmentService.getAppointmentById(idAppointment)
		.then(data => {			
				setLoading(true);
				setFormData({
				patient_id: data.patient_id || "",
				doctor_crm: data.doctor_crm || "",
				date_time: data.date_time || "",
				symptoms: data.symptoms || "",
				medications: data.medications || [],
			});
			setMedications(data.medications);
			hideSpinner();

		}).catch(error => {
			showAlert(getAlertMessage(error), "danger");
			setLoading(false); 
			hideSpinner();           
		});
  };

  const fetchGenerateMedications = ()=>{
	if (!formData.symptoms) {        
        return;
      };
	const jsonData = { symptoms: formData.symptoms };
	showSpinner();
	AppointmentService.generateMedications(jsonData)
		.then(data => {		
			setLoading(true);
			setMedications(data);
			setFormData((prevData) => ({
				...prevData,
				medications: data
			}));
				
			hideSpinner();
		}).catch(error => {
			showAlert(getAlertMessage(error), "danger");
			hideSpinner();           
		});
		
  }

  const fetchCreateAppointment = () =>{
		AppointmentService.createAppointment(formData)
			.then(data => {		
				setLoading(true);
				hideSpinner();
				navigate('/appointment-list', 
					{ state: 
						{ success: true, 
							message: 'Consulta Criada com sucesso.' 
					} 
				});
			}).catch(error => {
				showAlert(getAlertMessage(error), "danger");
				hideSpinner();           
			});
  };

  const fetchUpdateAppointment = () =>{		
		AppointmentService.updateAppointmentById(idAppointment, formData)
			.then(data => {		
				setLoading(true);
				hideSpinner();
				navigate('/appointment-list', 
					{ state: 
						{ success: true, 
							message: 'Consulta Criada com sucesso.' 
					} 
				});
			}).catch(error => {
				showAlert(getAlertMessage(error), "danger");
				hideSpinner();           
			});
  };

  const actionHandlers = {
	create: fetchCreateAppointment,
	default: fetchUpdateAppointment
  }; 

  const handleAction = (action) => {
	console.log(idAppointment);
	const executeAction = action === "create" 
	? actionHandlers.create 
	: actionHandlers.default;
	executeAction();
  };


  const handleSubmit = () => {	
	showSpinner();
	handleAction(action);
  };

  const handleCancel = () =>{
	changeFormData();
	setMedications([]);
	cancelAppointment();
  }

  const cancelAppointment = ()=>{
	navigate(`/appointment-list`, {
		  state: formData
	  }); 
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
						  <label htmlFor="zip">CRM do Médico</label>
						  <input type="text" className="form-control" name="doctor_crm" value={formData.doctor_crm} onChange={handleChange} placeholder="Digite o CRM do médico" />
					  </div>
	  
					  <div className="form-group m-2">
						  <label htmlFor="appointmentDate">Data da Consulta</label>
						  <input type="datetime-local" className="form-control" name="date_time" value={formData.date_time} onChange={handleChange} />
					  </div>
	  
					  <div className="form-group m-2">
						  <label htmlFor="symptoms">Sintomas Apresentados</label>
						  <textarea className="form-control" name="symptoms" value={formData.symptoms} onChange={handleChange} rows="4" placeholder="Descreva os sintomas"></textarea>
					  </div>

					  <div className="mb-3 d-flex m-2">
						  <button type="button" className="btn btn-primary mt-3" onClick={() => fetchGenerateMedications()}>Gerar Medicações</button>
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
				<div className="mb-3 d-flex m-2">
					<button type="reset" className="btn btn-secondary mt-3 me-3" onClick={() => handleCancel()}>Cancelar</button>
					<button type="button" className="btn btn-primary mt-3" onClick={() => handleSubmit()}>Cadastrar</button>
		   	    </div>
			  </div>
			</div>
	  )}
    </>
  );
};

export default AppointmentForm;

