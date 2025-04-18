# Web Medical Consulting - Projeto MVP

Projeto MVP para disciplina **Desenvolvimento Back End Avançado** 

Este projeto é uma aplicação front-end desenvolvida com React. O objetivo é criar uma interface para gerenciar cadastro  de pacientes e de consultas, permitindo criar, editar, cancelar e visualizar informações.

### Modelo de Arquitetura:

1. **Camada de Frontend (React)**:
   - Aplicação `react web--medical-consulting` é responsável por interagir com os e fazer a integração com a API.

2. **Camada de BFF (Backend For Frontend)**:
   - A API `bff--medical-consulting` utiliza arquitetura bff (backend for front end), processando as solicitações e coordenando as interações entre a aplicação e os serviços backend.

3. **O BFF se conecta as seguintes apis**:
   - `api--patient`: Gerencia os dados dos pacientes (ex.: informações de cadastro, histórico médico).
   - `api--appointment`: Lida com agendamentos e consulta a serviços externos.
   - `viacep (externa)`: Serviço externo para obter endereços com base nos CEPs fornecidos.

4. **Integração com Serviço Externo**:
   - A API `api--appointment` conecta-se à `API do Google Gemini`, que retorna os medicamentos recomendados com base nos sintomas.

### Fluxo:
1. **Médico** na aplicação React realiza uma ação (ex.: busca por pacientes).
2. **BFF--Medical-Consulting** recebe a solicitação e a distribui para os serviços backend.
3. APIs backend processam os dados e, se necessário, utilizam serviços externos (ex.: ViaCEP, Google Gemini).
4. Os dados consolidados retornam para o BFF e, em seguida, para o Frontend.

![Modelo de Arquitetura](files/medical-consulting-arquitetura.png)



## Funcionalidades

## Pré-requisitos

Para que a aplicação funcione corretamente, é necessário que tenha o node instalado e instale a aplicação com o comando:

```
npm install
```

- **Cadastro de Pacientes**: Funcionalidade para manter os dados de pacientes.
- **Consulta de Pacientes**: Funcionalidade que permite manter os dados de consultas de paciente, além de sugerir medicamentos utilizando iteligência artificial.



## Tecnologias Utilizadas

- **REACT**: React na versão 18.3.1
- **CSS**: Estilização da interface utilizando Bootstrap para um layout moderno e responsivo.
- **JavaScript**: Manipulação dinâmica da DOM e comunicação com a API via `fetch`.

## Como Executar
Assim que iniciar as aplicações backend, basta executar o comando abaixo:

```
npm start
```

## Rodando via Docker (Precisa ter o Docker Instalado)

Lembre-se de iniciar via docker as apis backend antes de iniciar a aplicação
front end.

```
docker build -t web--medical-consulting .
```

Para executar o container, rode o comando abaixo:

```
docker run --name web--medical-consulting \
    --network api-backend \  
    -p 3200:5000 \
    web--medical-consulting:latest
```

# Rodando via docker-compose

Configure a chave da api key do gemini no service api-apointment no docker-compose.yaml:

```
    environment:
        ...
      - GEMINI_TOKEN=<SUA API KEY>cker-compose
```

Para rodar via docker-compose, efetue um comando abaixo:

```
docker compose up
```

Este comando executa todas as aplicações. 

# Importante:

- É necessário que os projetos api--patient, api--appointment e bff--medical-consulting  estejam no mesmo diretório. 
- Não nenhum docker-compose nos projetos, para evitar conflito de portas do mysql e demais aplicações.


## Imagens da aplicação:

### Home
![Home](files/home.png)

### Cadastro de Paciente
![Formulário de Endereço](files/cadastro-paciente-form-endereco.png)

![Formulário Principal](files/cadastro-paciente-form.png)

![Resultado do Cadastro](files/cadastro-paciente-resultado.png)

![Tela Inicial de Cadastro](files/cadastro-paciente.png)

### Consulta de Paciente
![Formulário de Geração de Medicamentos](files/consultar-paciente-form-gerar-medicamentos.png)

![Formulário Principal](files/consultar-paciente-form.png)

![Resultado da Consulta](files/consultar-paciente-resultado.png)

![Tela Inicial da Consulta](files/consultar-paciente.png)


## Autor
Clayton Morais de Oliveira
