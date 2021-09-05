'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
}
//CRUD - Create Read Update Delete

//CRUD -  Creat
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) || [];
const setLocalStorage = (db_client) => localStorage.setItem('db_client', JSON.stringify(db_client));

function creatClient(client) {

    const db_client = getLocalStorage();
    db_client.push(client);
    setLocalStorage(db_client);
}

//CRUD - Read

const readClient = () => getLocalStorage();

//CRUD - Update

const updateClient = (index, client) => {
    const db_client = readClient();
    db_client[index] = client;
    setLocalStorage(db_client);
}

//CRUD - Delete
const deleteClient = (index) => {
    const db_client = readClient();
    db_client.splice(index, 1);
    setLocalStorage(db_client);
}
//Interação com o Layout
const isValidFields = () => {
    return document.getElementById('form').reportValidity();
}
const clearFields = () => {
    document.querySelector('#nome').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#celular').value = '';
    document.querySelector('#cidade').value = '';
}
//Interação com o layout
const saveClient = () => {
    if(isValidFields()) {
        const client = {
            Nome: document.querySelector('#nome').value,
            Email: document.querySelector('#email').value,
            Celular: document.querySelector('#celular').value,
            Cidade: document.querySelector('#cidade').value
        }
        if(document.querySelector('#nome').dataset.index === 'new'){
            creatClient(client);
            closeModal();
            updateTable();
            alert('Cadastro realizado com sucesso!');
        }
        else {
            console.log('Index: ', document.querySelector('#nome').dataset.index)
            updateClient(document.querySelector('#nome').dataset.index, client);
            updateTable();
            closeModal();
            document.querySelector('#nome').dataset.index = 'new';
            console.log('Editando...');
        }
    }
    else{
        alert('Preencha devidamente os campos!');
    }
}
//coment
const clearTable = () => document.querySelector('#tableClient').innerHTML = '';

const updateTable = () =>{
    //limpar a tela antes de atualizar
    clearTable();

    const db_client = readClient();//Ler o que tem no localstorage
    db_client.forEach(function creatRow(client, index) {

        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
        <td>${client.Nome}</td>
        <td>${client.Email}</td>
        <td>${client.Celular}</td>
        <td>${client.Cidade}</td>
        <td>
            <button type="button" id="edit-${index}" class="button green">Edit</button>
            <button type="button" id="delete-${index}" class="button red">Delete</button>
        </td>
        `;
        document.querySelector('#tableClient').appendChild(newRow);
    });
}

function fillFileds(client) {
    document.getElementById('nome').value = client.Nome
    document.getElementById('email').value = client.Email
    document.getElementById('celular').value = client.Celular
    document.getElementById('cidade').value = client.Cidade
    document.getElementById('nome').dataset.index = client.index || 'new';
}

function editClient(index) {
    const client = readClient()[index];
    client.index = index;
    fillFileds(client);
    openModal();
}

const editdelet = (event) => {
    if(event.target.type === 'button'){
        let arr = event.target.id.split('-');

        if(arr[0] == 'edit'){
            // updateClient(arr[1], arr[0]);
            editClient(arr[1]);  
        }
        else{
            deleteClient(arr[1]);
            updateTable();
            alert('Excluido com sucesso!')
        }
    }
}
updateTable();

//Enventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

    document.getElementById('cancelar')
    .addEventListener('click', closeModal)

document.getElementById('save')
    .addEventListener('click', saveClient)

document.querySelector('#tableClient')
    .addEventListener('click', editdelet)