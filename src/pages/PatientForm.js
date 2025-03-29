import React from "react";
import { useSpinner } from '../providers/SpinnerContext';

const PatientForm = () => {


    const { showSpinner, hideSpinner } = useSpinner();

    const handleAction = async () => {
        showSpinner();
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Simular operação
        hideSpinner(); 
      };
    


  return (
    <>
      <div className="card">
          <div className="card-header">Cadastro de Paciente</div>
          <div className="card-body">
              <form>
                  <div className="form-group">
                      <label for="name">Nome</label>
                      <input type="text" className="form-control" id="name" placeholder="Digite o nome" />
                  </div>

                  <div className="form-group">
                      <label for="email">E-mail</label>
                      <input type="email" className="form-control" id="email" placeholder="Digite o e-mail" />
                  </div>

                  <div className="form-group">
                      <label for="phone">Telefone</label>
                      <input type="tel" className="form-control" id="phone" placeholder="Digite o telefone" />
                  </div>

                  <div className="form-group">
                      <label for="gender">Gênero</label>
                      <select className="form-control" id="gender">
                          <option value="">Selecione</option>
                          <option value="masculino">Masculino</option>
                          <option value="feminino">Feminino</option>
                          <option value="nao-especificado">Não Especificado</option>
                      </select>
                  </div>

                  <div className="form-group">
                      <label for="birthdate">Data de Nascimento</label>
                      <input type="date" className="form-control" id="birthdate" />
                  </div>

                  <div className="form-group">
                      <label for="zip">CEP</label>
                      <div className="input-group">
                          <input type="text" className="form-control" id="zip" placeholder="Digite o CEP" />
                          <button type="button" className="btn btn-secondary" id="searchZip">Buscar</button>
                      </div>
                  </div>
                  <div className="mb-3 d-flex">
                      <button type="reset" className="btn btn-secondary mt-3 me-3">Cancelar</button>
                      <button type="button" className="btn btn-primary mt-3" onClick={handleAction}>Cadastrar</button>
                  </div>
              </form>
          </div>
      </div>
    </>
  );
};

export default PatientForm;