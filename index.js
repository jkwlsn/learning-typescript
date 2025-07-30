var UserAccount = /** @class */ (function () {
    function UserAccount(name, id, age) {
        this.name = name;
        this.id = id;
        this.age = age;
    }
    return UserAccount;
}());
function addUser(name, age) {
    var id = Math.floor(Math.random() * 100);
    var newUser = new UserAccount(name, id, age);
    console.log(newUser);
    return newUser;
}
addUser("Jake", 33);
addUser("Bob", 32);
addUser("Alice", 31);
