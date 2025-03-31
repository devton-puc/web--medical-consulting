import React, { useState, useLayoutEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import AddressService from "../services/AddressService";
import PatientService from "../services/PatientService";
import { useSpinner } from '../providers/SpinnerContext';
import { useModal } from '../providers/ModalContext';
import { useParams } from "react-router-dom";

const PatientForm = () => {

    const [loading, setLoading] = useState(false);
    const { action } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { showSpinner, hideSpinner } = useSpinner();
    const { showAlert, showConfirm } = useModal();
  
    const initialState = {        
            name: "",
            personal_id: "",
            birth_date: "",
            email: "",
            phone: "",
            gender: "",
            address: {
              zipcode: "",
              address: "",
              neighborhood: "",
              city: "",
              state: "",
              number: ""
            },          
    };    

    useLayoutEffect(() => {        
        if (action === 'create'){
                setLoading(true)
                return;
        }
        showSpinner();
        PatientService.getPatientById(action)
            .then(data => {
                console.log(JSON.stringify(data));
                hideSpinner();
                setLoading(true);
                setFormData({
                    
                    name: data.name || "",
                    personal_id: data.personal_id || "",
                    birth_date: data.birth_date || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    gender: data.gender || "",
                    address: {
                        zipcode: data.address?.zipcode || "",
                        address: data.address?.address || "",
                        neighborhood: data.address?.neighborhood || "",
                        city: data.address?.city || "",
                        state: data.address?.state || "",
                        number: data.address?.number || "",
                      },
                    });
        }).catch((error) => console.error("Erro ao carregar dados:", error));

    }, []);

    const [formData, setFormData] = useState(initialState);

    const changeFormData = (data = initialState) => {
        setFormData(data);
    };

    const resetAddressForm = () =>{
        setFormData((prevData) => ({
            ...prevData,
            address: {
                address: "",
                neighborhood: "",
                city: "",
                state: "",
                zipcode:"",
            },
        }));       
    }

    const [genders] = useState([
        { id: '1', name: 'Masculino' },
        { id: '2', name: 'Feminino' },
        { id: '3', name: 'Não especificado' },
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const keys = name.split('.');
            let updatedData = { ...prevData };
    
            if (keys.length > 1) {
                const [parentKey, childKey] = keys;
                updatedData[parentKey] = {
                    ...updatedData[parentKey],
                    [childKey]: value,
                };
            } else {
                updatedData[name] = value;
            }
    
            return updatedData;
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
       /* navigate('/patient-list', {
          state: formData
        }); */
    };

    const handleCancel = () =>{
        changeFormData();
    }
    

    const handleFindAddress = async () => {
        showSpinner();
        if (!formData.address.zipcode) {
            hideSpinner();
            return;
        };
    
        try {
          await AddressService.getAddressByCep(formData.address.zipcode)            
          .then(data => {
          
                setFormData((prevData) => ({
                    ...prevData,
                    address: {
                        address: data.address || "",
                        neighborhood: data.neighborhood || "",
                        city: data.city || "",
                        state: data.state || "",
                        zipcode: data.zipcode || "",
                    },
                }));

          }).catch(error => {
            showAlert(`Erro ao buscar o Cep: ${error}`,"danger");
            resetAddressForm();
          });
        }finally{
            hideSpinner();
        }
    };


  return (
    <>
     {loading  && (
        <div className="card">
            <div className="card-header">Cadastro de Paciente</div>
            <div className="card-body">
                <form>
                    <div className="form-group m-2">
                        <label for="name">Nome</label>
                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Digite o nome" />
                    </div>

                    <div className="form-group m-2">
                        <label for="name">CPF</label>
                        <input type="text" className="form-control" name="personal_id" value={formData.personal_id} onChange={handleChange} placeholder="Digite o CPF" />
                    </div>

                    <div className="form-group m-2">
                        <label for="email">E-mail</label>
                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Digite o e-mail" />
                    </div>

                    <div className="form-group m-2">
                        <label for="phone">Telefone</label>
                        <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="Digite o telefone" />
                    </div>

                    <div className="form-group m-2"> 
                        <label for="gender">Gênero</label>
                        <select className="form-control" name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="">Selecione</option>
                            {genders.map(genderItem => (
                                <option key={genderItem.id} value={genderItem.name}>
                                    {genderItem.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group m-2">
                        <label for="birthdate">Data de Nascimento</label>
                        <input type="date" className="form-control" name="birth_date" onChange={handleChange} value={formData.birth_date} />
                    </div>

                    <div className="form-group m-2">
                        <label for="zip">CEP</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="address.zipcode" placeholder="Digite o CEP" value={formData.address.zipcode} onChange={handleChange} />
                            <button type="button" className="btn btn-secondary" id="searchZip" onClick={handleFindAddress}>Buscar</button>
                        </div>
                    </div>
                    
                    {formData.address.address != "" && (
                            <>
                            <div className="form-group m-2">
                                <label htmlFor="address">Endereço</label>
                                <input type="text" className="form-control" name="address.address" value={formData.address.address} readOnly />
                            </div>

                            <div className="form-group m-2">
                                <label htmlFor="neighborhood">Bairro</label>
                                <input type="text" className="form-control" name="address.neighborhood" value={formData.address.neighborhood} readOnly />
                            </div>


                            <div className="form-group m-2">
                                <label htmlFor="city">Cidade</label>
                                <input type="text" className="form-control" name="address.city" value={formData.address.city} readOnly />
                            </div>

                            <div className="form-group m-2">
                                <label htmlFor="state">Estado</label>
                                <input type="text" className="form-control" name="address.state" value={formData.address.state} readOnly />
                            </div>

                            <div className="form-group m-2">
                                <label htmlFor="number">Número</label>
                                <input type="text" className="form-control" name="address.number" value={formData.address.number} onChange={handleChange} placeholder="Digite o número" />
                            </div>

                            </>
                    )}

                    <div className="mb-3 d-flex">
                        <button type="reset" className="btn btn-secondary mt-3 me-3" onClick={handleCancel}>Cancelar</button>
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit}>Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
     )}

    </>
  );
};

export default PatientForm;