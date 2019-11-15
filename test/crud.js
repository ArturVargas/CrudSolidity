
const Crud = artifacts.require('Crud');

contract('Crud', () => {
  let crud = null;
  before(async () => {
    crud = await Crud.deployed();
  });

  it('Should create new user', async () => {
    await crud.createUser('Arturo');
    const user = await crud.getUser(1);
    assert(user[0].toNumber() == 1);
    assert(user[1] === 'Arturo');
  });

  it('Update user', async () => {
    await crud.updateUser(1, 'Arthur');
    const user = await crud.getUser(1);
    assert(user[0].toNumber() == 1);
    assert(user[1] === 'Arthur');
  });

  it('Not Update a non-existing user', async () => {
    try {
      await crud.updateUser(3, 'Somebody');
    } catch (error) {
      assert(error.message.includes('No se encontro Usuario'));
      return;
    }
    assert(false);
  });

  it('Delete User', async () => {
    await crud.deleteUser(1);
    try {
      
    } catch (error) {
      
    }
  })

})