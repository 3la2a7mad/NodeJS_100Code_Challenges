// Alaa Ahmad

const firstUser: User = {
  id: 1,
  name: 'Alaa Ahmad',
  email: 'alaa.ahmad@bzu.edu'
};

const secondUser: User = {
  id: 2,
  name: 'Test User'
  // This is valid because the 'email' property is optional.
};


 //enforces the User type for its parameter.
function printUserDetails(user: User): void {
  console.log(`ID: ${user.id}, Name: ${user.name}`);

  // Check if the optional email property exists before using it.
  if (user.email) {
    console.log(`Email: ${user.email}`);
  }
  console.log('--------------------------------');
}

printUserDetails(firstUser);
printUserDetails(secondUser);