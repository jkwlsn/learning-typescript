"use strict";
// Interfaces
// Data Classes
class UserAccount {
    #user_id = 0;
    #email = '';
    #password = '';
    #timestamp = new Date();
    constructor(user_id, email, password, timestamp) {
        this.user_id = user_id;
        this.email = email;
        this.password = password;
        this.timestamp = timestamp;
    }
    set user_id(user_id) {
        this.#user_id = user_id;
    }
    set email(email) {
        this.#email = email;
    }
    set password(password) {
        this.#password = password;
    }
    set timestamp(timestamp) {
        this.#timestamp = timestamp;
    }
    get user_id() {
        return this.#user_id;
    }
    get email() {
        return this.#email;
    }
    get password() {
        return this.#password;
    }
    get timestamp() {
        return this.#timestamp;
    }
    toObject(index) {
        return {
            index,
            user_id: this.user_id,
            email: this.email,
            password: this.password,
            timestamp: this.timestamp,
        };
    }
}
class Apiary {
    apiary_id;
    apiary_name;
    user_id;
    constructor(apiary_id, apiary_name, user_id) {
        this.apiary_id = apiary_id;
        this.apiary_name = apiary_name;
        this.user_id = user_id;
    }
    toObject(index) {
        return {
            index,
            apiary_id: this.apiary_id,
            apiary_name: this.apiary_name,
            user_id: this.user_id,
        };
    }
}
class Hive {
    hive_id;
    hive_name;
    apiary_id;
    constructor(hive_id, hive_name, apiary_id) {
        this.hive_id = hive_id;
        this.hive_name = hive_name;
        this.apiary_id = apiary_id;
    }
    toObject(index) {
        return {
            index,
            hive_id: this.hive_id,
            hive_name: this.hive_name,
            apiary_id: this.apiary_id,
        };
    }
}
class Colony {
    colony_id;
    colony_name;
    hive_id;
    constructor(colony_id, colony_name, hive_id) {
        this.colony_id = colony_id;
        this.colony_name = colony_name;
        this.hive_id = hive_id;
    }
    toObject(index) {
        return {
            index,
            colony_id: this.colony_id,
            colony_name: this.colony_name,
            hive_id: this.hive_id,
        };
    }
}
class Queen {
    queen_id;
    queen_name;
    queenright;
    marked;
    clipped;
    colony_id;
    constructor(queen_id, queen_name, queenright, marked, clipped, colony_id) {
        this.queen_id = queen_id;
        this.queen_name = queen_name;
        this.queenright = queenright;
        this.marked = marked;
        this.clipped = clipped;
        this.colony_id = colony_id;
    }
    toObject(index) {
        return {
            index,
            queen_id: this.queen_id,
            queen_name: this.queen_name,
            queenright: this.queenright,
            marked: this.marked,
            clipped: this.clipped,
            colony_id: this.colony_id,
        };
    }
}
class InspectionRecord {
    inspection_id;
    timestamp;
    apiary_id;
    colony_id;
    queen_cups;
    brood_frames;
    store_frames;
    room_frames;
    health;
    varroa;
    temper;
    feed;
    supers;
    weather;
    user_id;
    constructor(inspection_id, timestamp, apiary_id, colony_id, queen_cups, brood_frames, store_frames, room_frames, health, varroa, temper, feed, supers, weather, user_id) {
        this.inspection_id = inspection_id;
        this.timestamp = timestamp;
        this.apiary_id = apiary_id;
        this.colony_id = colony_id;
        this.queen_cups = queen_cups;
        this.brood_frames = brood_frames;
        this.store_frames = store_frames;
        this.room_frames = room_frames;
        this.health = health;
        this.varroa = varroa;
        this.temper = temper;
        this.feed = feed;
        this.supers = supers;
        this.weather = weather;
        this.user_id = user_id;
    }
    toObject(index) {
        return {
            index,
            inspection_id: this.inspection_id,
            timestamp: this.timestamp,
            apiary_id: this.apiary_id,
            colony_id: this.colony_id,
            queen_cups: this.queen_cups,
            brood_frames: this.brood_frames,
            store_frames: this.store_frames,
            room_frames: this.room_frames,
            health: this.health,
            varroa: this.varroa,
            temper: this.temper,
            feed: this.feed,
            supers: this.supers,
            weather: this.weather,
            user_id: this.user_id,
        };
    }
}
// Collection Classes
class Users {
    users = [];
    addUser(newUser) {
        const user_id = Math.floor(Math.random() * 100);
        const timestamp = new Date();
        const user = new UserAccount(user_id, newUser.email, newUser.password, timestamp);
        this.users.push(user);
        return user;
    }
}
class Apiaries {
    apiaries = [];
    addApiary(newApiary) {
        const apiary_id = Math.floor(Math.random() * 100);
        const apiary_name = newApiary.apiary_name;
        const user_id = newApiary.user_id;
        const apiary = new Apiary(apiary_id, apiary_name, user_id);
        this.apiaries.push(apiary);
        return apiary;
    }
}
class Hives {
    hives = [];
    addHive(newHive) {
        const hive_id = Math.floor(Math.random() * 100);
        const hive = new Hive(hive_id, newHive.hive_name, newHive.apiary_id);
        this.hives.push(hive);
        return hive;
    }
}
class Colonies {
    colonies = [];
    addColony(newColony) {
        const colony_id = Math.floor(Math.random() * 100);
        const colony = new Colony(colony_id, newColony.colony_name, newColony.hive_id);
        this.colonies.push(colony);
        return colony;
    }
}
class Queens {
    queens = [];
    addQueen(newQueen) {
        const queen_id = Math.floor(Math.random() * 100);
        const queen = new Queen(queen_id, newQueen.queen_name, newQueen.queenright, newQueen.marked, newQueen.clipped, newQueen.colony_id);
        this.queens.push(queen);
        return queen;
    }
}
class Records {
    records = [];
    addRecord(newInspection) {
        const inspection_id = Math.floor(Math.random() * 100);
        const inspection = new InspectionRecord(inspection_id, newInspection.timestamp, newInspection.apiary_id, newInspection.colony_id, newInspection.queen_cups, newInspection.brood_frames, newInspection.store_frames, newInspection.room_frames, newInspection.health, newInspection.varroa, newInspection.temper, newInspection.feed, newInspection.supers, newInspection.weather, newInspection.user_id);
        this.records.push(inspection);
        return inspection;
    }
}
// Instances
const userList = new Users();
const apiaryList = new Apiaries();
const hivesList = new Hives();
const coloniesList = new Colonies();
const queensList = new Queens();
const recordsList = new Records();
// Form controller
const formController = {
    getUserData() {
        const emailInput = document.getElementById('email_input');
        if (!emailInput)
            throw new Error('Email input not found');
        const email = emailInput.value;
        const passwordInput = document.getElementById('password_input');
        if (!passwordInput)
            throw new Error('password input not found');
        const password = passwordInput.value;
        return userList.addUser({ email: email, password: password });
    },
    updateUserData() {
        const indexInput = document.getElementById('index_update');
        if (!indexInput)
            throw new Error('Index input not found');
        const index = parseInt(indexInput.value);
        const emailInput = document.getElementById('email_update');
        if (!emailInput)
            throw new Error('Email input not found');
        const email = emailInput.value;
        const passwordInput = document.getElementById('password_update');
        if (!passwordInput)
            throw new Error('password input not found');
        const password = passwordInput.value;
        if (email)
            userList.users[index].email = email;
        if (password)
            userList.users[index].password = password;
    },
    delUserData() {
        const indexInput = document.getElementById('index_input');
        if (!indexInput)
            throw new Error('Index input not found');
        const index = parseInt(indexInput.value);
        return userList.users.splice(index, 1);
    },
    addRecordData() {
        const timestampInput = document.getElementById('timestamp_input');
        if (!timestampInput)
            throw new Error('timestamp input not found');
        const timestamp = new Date(timestampInput.value);
        const apiary_idInput = document.getElementById('apiary_id_input');
        if (!apiary_idInput)
            throw new Error('apiary_id input not found');
        const apiary_id = parseInt(apiary_idInput.value);
        const colony_idInput = document.getElementById('colony_id_input');
        if (!colony_idInput)
            throw new Error('colony_id input not found');
        const colony_id = parseInt(colony_idInput.value);
        const queen_cupsInput = document.getElementById('queen_cups_input');
        if (!queen_cupsInput)
            throw new Error('queen_cups input not found');
        const queen_cups = parseInt(queen_cupsInput.value);
        const brood_framesInput = document.getElementById('brood_frames_input');
        if (!brood_framesInput)
            throw new Error('brood_frames input not found');
        const brood_frames = parseInt(brood_framesInput.value);
        const store_framesInput = document.getElementById('store_frames_input');
        if (!store_framesInput)
            throw new Error('store_frames input not found');
        const store_frames = parseInt(store_framesInput.value);
        const room_framesInput = document.getElementById('room_frames_input');
        if (!room_framesInput)
            throw new Error('room_frames input not found');
        const room_frames = parseInt(room_framesInput.value);
        const healthInput = document.getElementById('health_input');
        if (!healthInput)
            throw new Error('health input not found');
        const health = healthInput.value;
        const varroaInput = document.getElementById('varroa_input');
        if (!varroaInput)
            throw new Error('varroa input not found');
        const varroa = parseInt(varroaInput.value);
        const temperInput = document.getElementById('temper_input');
        if (!temperInput)
            throw new Error('temper input not found');
        const temper = parseInt(temperInput.value);
        const feedInput = document.getElementById('feed_input');
        if (!feedInput)
            throw new Error('feed input not found');
        const feed = parseInt(feedInput.value);
        const supersInput = document.getElementById('supers_input');
        if (!supersInput)
            throw new Error('supers input not found');
        const supers = parseInt(supersInput.value);
        const weatherInput = document.getElementById('weather_input');
        if (!weatherInput)
            throw new Error('weather input not found');
        const weather = weatherInput.value;
        const user_idInput = document.getElementById('user_id_input');
        if (!user_idInput)
            throw new Error('user_id input not found');
        const user_id = parseInt(user_idInput.value);
        return recordsList.addRecord({
            timestamp,
            apiary_id,
            colony_id,
            queen_cups,
            brood_frames,
            store_frames,
            room_frames,
            health,
            varroa,
            temper,
            feed,
            supers,
            weather,
            user_id,
        });
    },
    addApiaryData() {
        const apiaryNameInput = document.getElementById('apiary_name_input');
        if (!apiaryNameInput)
            throw new Error('Apiary name input not found');
        const apiary_name = apiaryNameInput.value;
        const userIdInput = document.getElementById('user_id_input');
        if (!userIdInput)
            throw new Error('User_id input not found');
        const user_id = parseInt(userIdInput.value);
        if (!userExists(user_id)) {
            alert(`User ID ${user_id} does not exist.`);
            return;
        }
        return apiaryList.addApiary({ apiary_name: apiary_name, user_id: user_id });
    },
    addHiveData() {
        const hiveNameInput = document.getElementById('hive_name_input');
        if (!hiveNameInput)
            throw new Error('Hive name input not found');
        const hive_name = hiveNameInput.value;
        const apiaryIdInput = document.getElementById('apiary_id_input');
        if (!apiaryIdInput)
            throw new Error('hive ID input not found');
        const apiary_id = parseInt(apiaryIdInput.value);
        if (!apiaryExists(apiary_id)) {
            alert(`Apiary ID ${apiary_id} does not exist.`);
            return;
        }
        return hivesList.addHive({ hive_name, apiary_id });
    },
    addColonyData() {
        const colonyNameInput = document.getElementById('colony_name_input');
        if (!colonyNameInput)
            throw new Error('Colony name input not found');
        const colony_name = colonyNameInput.value;
        const hiveIdInput = document.getElementById('hive_id_input');
        if (!hiveIdInput)
            throw new Error('hive ID input not found');
        const hive_id = parseInt(hiveIdInput.value);
        if (!hiveExists(hive_id)) {
            alert(`hive ID ${hive_id} does not exist.`);
            return;
        }
        return coloniesList.addColony({ colony_name, hive_id });
    },
    addQueenData() {
        const queenNameInput = document.getElementById('queen_name_input');
        if (!queenNameInput)
            throw new Error('Queen name input not found');
        const queen_name = queenNameInput.value;
        const queenrightInput = document.getElementById('queenright_input');
        if (!queenrightInput)
            throw new Error('queenright input not found');
        const queenright = queenrightInput.checked;
        const queen_markedInput = document.getElementById('queen_marked_input');
        if (!queen_markedInput)
            throw new Error('queen_marked input not found');
        const marked = queen_markedInput.value;
        const queen_clippedInput = document.getElementById('queen_clipped_input');
        if (!queen_clippedInput)
            throw new Error('queen_clipped input not found');
        const clipped = queen_clippedInput.checked;
        const colonyIdInput = document.getElementById('colony_id_input');
        if (!colonyIdInput)
            throw new Error('colony ID input not found');
        const colony_id = parseInt(colonyIdInput.value);
        if (!colonyExists(colony_id)) {
            alert(`colony ID ${colony_id} does not exist.`);
            return;
        }
        return queensList.addQueen({
            queen_name,
            queenright,
            marked,
            clipped,
            colony_id,
        });
    },
};
// Controller
function addRecord() {
    formController.addRecordData();
    updateRecordView();
}
function addApiary() {
    formController.addApiaryData();
    updateApiaryView();
}
function addHive() {
    formController.addHiveData();
    updateHiveView();
}
function addColony() {
    formController.addColonyData();
    updateColonyView();
}
function addQueen() {
    formController.addQueenData();
    updateQueenView();
}
function addUser() {
    formController.getUserData();
    updateUserView();
}
function updateUser() {
    formController.updateUserData();
    updateUserView();
}
function delUser() {
    formController.delUserData();
    updateUserView();
}
function userExists(user_id) {
    return userList.users.some((user) => user.user_id === user_id);
}
function apiaryExists(apiary_id) {
    return apiaryList.apiaries.some((apiary) => apiary.apiary_id === apiary_id);
}
function hiveExists(hive_id) {
    return hivesList.hives.some((hive) => hive.hive_id === hive_id);
}
function colonyExists(colony_id) {
    return coloniesList.colonies.some((colony) => colony.colony_id === colony_id);
}
function updateUserView() {
    const table = document.getElementById('users-table');
    const form = document.getElementById('user_add_form');
    form.reset();
    const headerRow = document.getElementById('users-header-row');
    if (table && headerRow) {
        table.innerHTML = '';
        table.appendChild(headerRow);
    }
    userList.users.forEach((entry, index) => {
        const row = document.createElement('tr');
        const obj = entry.toObject(index);
        row.innerHTML = `
        <td>${obj.index}</td>
        <td>${obj.user_id}</td>
        <td>${obj.email}</td>
        <td>${obj.password}</td>
        <td>${obj.timestamp.toLocaleString()}</td>
      `;
        table.appendChild(row);
    });
}
function updateApiaryView() {
    const table = document.getElementById('apiaries-table');
    const form = document.getElementById('apiary_add_form');
    form.reset();
    const headerRow = document.getElementById('apiaries-header-row');
    if (table && headerRow) {
        table.innerHTML = '';
        table.appendChild(headerRow);
    }
    apiaryList.apiaries.forEach((entry, index) => {
        const row = document.createElement('tr');
        const obj = entry.toObject(index);
        row.innerHTML = `
        <td>${obj.index}</td>
        <td>${obj.apiary_id}</td>
        <td>${obj.apiary_name}</td>
        <td>${obj.user_id}</td>
      `;
        table.appendChild(row);
    });
}
function updateHiveView() {
    const table = document.getElementById('hives-table');
    const form = document.getElementById('hive_add_form');
    form.reset();
    const headerRow = document.getElementById('hives-header-row');
    if (table && headerRow) {
        table.innerHTML = '';
        table.appendChild(headerRow);
    }
    hivesList.hives.forEach((entry, index) => {
        const row = document.createElement('tr');
        const obj = entry.toObject(index);
        row.innerHTML = `
        <td>${obj.index}</td>
        <td>${obj.hive_id}</td>
        <td>${obj.hive_name}</td>
        <td>${obj.apiary_id}</td>
      `;
        table.appendChild(row);
    });
}
function updateColonyView() {
    const table = document.getElementById('colonies-table');
    const form = document.getElementById('colony_add_form');
    form.reset();
    const headerRow = document.getElementById('colonies-header-row');
    if (table && headerRow) {
        table.innerHTML = '';
        table.appendChild(headerRow);
    }
    coloniesList.colonies.forEach((entry, index) => {
        const row = document.createElement('tr');
        const obj = entry.toObject(index);
        row.innerHTML = `
      <td>${obj.index}</td>
      <td>${obj.colony_id}</td>
      <td>${obj.colony_name}</td>
      <td>${obj.hive_id}</td>
    `;
        table.appendChild(row);
    });
}
function updateQueenView() {
    const table = document.getElementById('queens-table');
    const form = document.getElementById('queen_add_form');
    form.reset();
    const headerRow = document.getElementById('queens-header-row');
    if (table && headerRow) {
        table.innerHTML = '';
        table.appendChild(headerRow);
    }
    queensList.queens.forEach((entry, index) => {
        const row = document.createElement('tr');
        const obj = entry.toObject(index);
        row.innerHTML = `
      <td>${obj.index}</td>
      <td>${obj.queen_id}</td>
      <td>${obj.queen_name}</td>
      <td>${obj.queenright}</td>
      <td>${obj.marked}</td>
      <td>${obj.clipped}</td>
      <td>${obj.colony_id}</td>
    `;
        table.appendChild(row);
    });
}
function updateRecordView() {
    const table = document.getElementById('records-table');
    const form = document.getElementById('record_add_form');
    form.reset();
    const headerRow = document.getElementById('records-header-row');
    if (table && headerRow) {
        table.innerHTML = '';
        table.appendChild(headerRow);
    }
    recordsList.records.forEach((entry, index) => {
        const row = document.createElement('tr');
        const obj = entry.toObject(index);
        row.innerHTML = `
        <td>${obj.index}</td>
        <td>${obj.timestamp.toLocaleString()}</td>
        <td>${obj.apiary_id}</td>
        <td>${obj.colony_id}</td>
        <td>${obj.queen_cups}</td>
        <td>${obj.brood_frames}</td>
        <td>${obj.store_frames}</td>
        <td>${obj.room_frames}</td>
        <td>${obj.health}</td>
        <td>${obj.varroa}</td>
        <td>${obj.temper}</td>
        <td>${obj.feed}</td>
        <td>${obj.supers}</td>
        <td>${obj.weather}</td>
        <td>${obj.user_id}</td>
      `;
        table.appendChild(row);
    });
}
// View
document.addEventListener('DOMContentLoaded', function () {
    const userAddForm = document.getElementById('user_add_form');
    if (userAddForm) {
        userAddForm.addEventListener('submit', (event) => {
            event.preventDefault();
            addUser();
        });
    }
    const userUpdateForm = document.getElementById('user_update_form');
    if (userUpdateForm) {
        userUpdateForm.addEventListener('submit', (event) => {
            event.preventDefault();
            updateUser();
        });
    }
    const userDelForm = document.getElementById('user_del_form');
    if (userDelForm) {
        userDelForm.addEventListener('submit', (event) => {
            event.preventDefault();
            delUser();
        });
    }
    // RECORDS
    const recordAddForm = document.getElementById('record_add_form');
    if (recordAddForm) {
        recordAddForm.addEventListener('submit', (event) => {
            event.preventDefault();
            addRecord();
        });
    }
    // Apiaries
    const apiaryAddForm = document.getElementById('apiary_add_form');
    if (apiaryAddForm) {
        apiaryAddForm.addEventListener('submit', (event) => {
            event.preventDefault();
            addApiary();
        });
    }
    // Hives
    const hiveAddForm = document.getElementById('hive_add_form');
    if (hiveAddForm) {
        hiveAddForm.addEventListener('submit', (event) => {
            event.preventDefault();
            addHive();
        });
    }
    // Colonies
    const colonyAddForm = document.getElementById('colony_add_form');
    if (colonyAddForm) {
        colonyAddForm.addEventListener('submit', (event) => {
            event.preventDefault();
            addColony();
        });
    }
    // Queens
    const queenAddForm = document.getElementById('queen_add_form');
    if (queenAddForm) {
        queenAddForm.addEventListener('submit', (event) => {
            event.preventDefault();
            addQueen();
        });
    }
});
