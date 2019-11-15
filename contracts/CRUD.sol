
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Crud {

  struct User {
    uint Id;
    string name;
  }
  uint public nextId = 1;
  User[] public users;

  function createUser(string memory name) public returns(string memory){
    users.push(User(nextId, name));
    nextId ++;
    return (name);
  }

  function getUser(uint id) public view returns(uint, string memory) {
    for(uint i = 0; i < users.length; i++) {
      if(id == users[i].Id){
        return (users[i].Id, users[i].name);
      }
    }
    revert("No se encontro Usuario");
  }

  function getUsers() public view returns(User[] memory) {
    return (users);
  }

  function deleteUser(uint id) public returns(string memory) {
    for(uint i = 0; i < users.length; i++) {
      if(id == users[i].Id){
        delete(users[i]);
        return ("El usuario fue eliminado");
      }
    }
    revert("No se encontro Usuario");
  }

  function updateUser(uint id, string memory name) public returns(uint, string memory) {
    for(uint i = 0; i < users.length; i++) {
      if(id == users[i].Id){
        users[i].name = name;
        return (users[i].Id, users[i].name);
      }
    }
    revert("No se encontro Usuario");
  }

}