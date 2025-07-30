interface User {
  name: string;
  age: number;
  id: number;
}

class UserAccount {
  name: string;
  age: number;
  id: number;

  constructor(name: string, id: number, age: number) {
    this.name = name;
    this.id = id;
    this.age = age;
  }
}

function addUser(name: string, age: number): User {
  let id: number = Math.floor(Math.random() * 100);
  let newUser: User = new UserAccount(name, id, age);
  console.log(newUser);
  return newUser;
}

addUser("Jake", 33);
addUser("Bob", 32);
addUser("Alice", 31);
