
import Web3 from 'web3';
import Crud from '../build/contracts/Crud.json';

let web3;
let crud;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined'){
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(new Web3(window.ethereum));
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined'){
      return resolve(new Web3(window.web3.currentProvider));
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = () => {
  const deploymentKey = Object.keys(Crud.networks)[1];
  return new web3.eth.Contract(
    Crud.abi,
    Crud.networks[deploymentKey].address
  );
};

const initApp = () => {
  const $create = document.getElementById('create');
  const $createResult = document.getElementById('result');
  const $read = document.getElementById('read');
  const $userResult = document.getElementById('user_result');
  const $update = document.getElementById('update');
  const $updateResult = document.getElementById('update_result');
  const $delete = document.getElementById('delete');
  const $deleteResult = document.getElementById('delete_result');
  let accounts = [];

  web3.eth.getAccounts()
    .then(_accounts => {
      accounts = _accounts;
    });

  $create.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.elements[0].value;
    console.log(name);
    crud.methods.createUser(name).send({from: accounts[1]})
    .then(res => {
      $createResult.innerHTML = `Nuevo usuario ${name} creado exitosamente!!`;
    })
    .catch(error => {
      $createResult.innerHTML = `Ocurrio un error al tratar de crear usuario...`;
    });
  });

  $read.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    console.log(id);
    crud.methods.getUser(id).call()
    .then(res => {
      $userResult.innerHTML = `Id: ${res[0]} Name: ${res[1]}`
    })
    .catch(error => {
      $userResult.innerHTML = `Ocurrio un error al tratar de buscar usuario ${id}...`;
    });
  });

  $update.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    console.log(id);
    const name = e.target.elements[1].value;
    console.log(name);
    crud.methods.updateUser(id, name).send({from: accounts[1]})
    .then(res => {
      $updateResult.innerHTML = `El nombre del usuario ${id} cambio a ${name}`;
    })
    .catch(e => {
      $updateResult.innerHTML = `Ocurrio un error al tratar de actualizar usuario ${id}...`;
    });
  });

  $delete.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    console.log(id);
    crud.methods.deleteUser(id).send({from: accounts[1]})
    .then(res => {
      $deleteResult.innerHTML = `Se borro el usuario ${id}`;
    })
    .catch(e => {
      $deleteResult.innerHTML = `Ocurrio un error al tratar de borrar el usuario ${id}...`;
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      crud = initContract();
      initApp();
    })
    .catch(error => console.log(error.message));
});