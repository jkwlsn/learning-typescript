"use strict";
// Storage
// Setters
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(userList.records));
}
function saveApiaries() {
    localStorage.setItem('apiaries', JSON.stringify(apiaryList.records));
}
function saveHives() {
    localStorage.setItem('hives', JSON.stringify(hivesList.records));
}
function saveColonies() {
    localStorage.setItem('colonies', JSON.stringify(coloniesList.records));
}
function saveQueens() {
    localStorage.setItem('queens', JSON.stringify(queensList.records));
}
function saveInspections() {
    localStorage.setItem('records', JSON.stringify(inspectionsList.records));
}
// Getters
function loadUsers() {
    const usersJSON = localStorage.getItem('users');
    if (usersJSON) {
        const usersArray = JSON.parse(usersJSON);
        userList.records = usersArray.map((data) => new User(data));
    }
}
function loadApiaries() {
    const apiariesJSON = localStorage.getItem('apiaries');
    if (apiariesJSON) {
        const apiaryArray = JSON.parse(apiariesJSON);
        apiaryList.records = apiaryArray.map((data) => new Apiary(data));
    }
}
function loadHives() {
    const hivesJSON = localStorage.getItem('hives');
    if (hivesJSON) {
        const hiveArray = JSON.parse(hivesJSON);
        hivesList.records = hiveArray.map((data) => new Hive(data));
    }
}
function loadColonies() {
    const coloniesJSON = localStorage.getItem('colonies');
    if (coloniesJSON) {
        const colonyArray = JSON.parse(coloniesJSON);
        coloniesList.records = colonyArray.map((data) => new Colony(data));
    }
}
function loadQueens() {
    const queensJSON = localStorage.getItem('queens');
    if (queensJSON) {
        const queenArray = JSON.parse(queensJSON);
        queensList.records = queenArray.map((data) => new Queen(data));
    }
}
function loadInspections() {
    const inspectionsJSON = localStorage.getItem('inspections');
    if (inspectionsJSON) {
        const inspectionArray = JSON.parse(inspectionsJSON);
        inspectionsList.records = inspectionArray.map((data) => new Inspection(data));
    }
}
// Data Classes
class User {
    user_id = 0;
    email = '';
    password = '';
    timestamp = new Date();
    constructor({ user_id, email, password, timestamp }) {
        this.user_id = user_id;
        this.email = email;
        this.password = password;
        this.timestamp = timestamp;
    }
    toObject() {
        return {
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
    constructor({ apiary_id, apiary_name, user_id }) {
        this.apiary_id = apiary_id;
        this.apiary_name = apiary_name;
        this.user_id = user_id;
    }
    toObject() {
        return {
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
    constructor({ hive_id, hive_name, apiary_id }) {
        this.hive_id = hive_id;
        this.hive_name = hive_name;
        this.apiary_id = apiary_id;
    }
    toObject() {
        return {
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
    constructor({ colony_id, colony_name, hive_id }) {
        this.colony_id = colony_id;
        this.colony_name = colony_name;
        this.hive_id = hive_id;
    }
    toObject() {
        return {
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
    constructor({ queen_id, queen_name, queenright, marked, clipped, colony_id, }) {
        this.queen_id = queen_id;
        this.queen_name = queen_name;
        this.queenright = queenright;
        this.marked = marked;
        this.clipped = clipped;
        this.colony_id = colony_id;
    }
    toObject() {
        return {
            queen_id: this.queen_id,
            queen_name: this.queen_name,
            queenright: this.queenright,
            marked: this.marked,
            clipped: this.clipped,
            colony_id: this.colony_id,
        };
    }
}
class Inspection {
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
    constructor({ inspection_id, timestamp, apiary_id, colony_id, queen_cups, brood_frames, store_frames, room_frames, health, varroa, temper, feed, supers, weather, user_id, }) {
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
    toObject() {
        return {
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
    records = [];
    addUser(newUser) {
        const user_id = Math.floor(Math.random() * 100);
        const timestamp = new Date();
        const user = new User({
            user_id: user_id,
            email: newUser.email,
            password: newUser.password,
            timestamp: timestamp,
        });
        this.records.push(user);
        saveUsers();
        return user;
    }
    getById(user_id) {
        return this.records.find((user) => user.user_id === user_id);
    }
    getByEmail(email) {
        return this.records.find((user) => user.email === email);
    }
    deleteById(user_id) {
        const index = this.records.findIndex((user) => user.user_id === user_id);
        if (index === -1)
            return false;
        this.records.splice(index, 1);
        saveUsers();
        return true;
    }
}
class Apiaries {
    records = [];
    addApiary(newApiary) {
        const apiary_id = Math.floor(Math.random() * 100);
        const apiary_name = newApiary.apiary_name;
        const user_id = newApiary.user_id;
        const apiary = new Apiary({
            apiary_id: apiary_id,
            apiary_name: apiary_name,
            user_id: user_id,
        });
        this.records.push(apiary);
        saveApiaries();
        return apiary;
    }
    getById(apiary_id) {
        return this.records.find((apiary) => apiary.apiary_id === apiary_id);
    }
    getByUserId(user_id) {
        return this.records.filter((user) => user.user_id === user_id);
    }
    removeById(apiary_id) {
        const index = this.records.findIndex((apiary) => apiary.apiary_id === apiary_id);
        if (index === -1)
            return false;
        this.records.splice(index, 1);
        saveApiaries();
        return true;
    }
}
class Hives {
    records = [];
    addHive(newHive) {
        const hive_id = Math.floor(Math.random() * 100);
        const hive = new Hive({
            hive_id: hive_id,
            hive_name: newHive.hive_name,
            apiary_id: newHive.apiary_id,
        });
        this.records.push(hive);
        saveHives();
        return hive;
    }
    getById(hive_id) {
        return this.records.find((hive) => hive.hive_id === hive_id);
    }
    getByApiaryId(apiary_id) {
        return this.records.filter((apiary) => apiary.apiary_id === apiary_id);
    }
    removeById(hive_id) {
        const index = this.records.findIndex((hive) => hive.hive_id === hive_id);
        if (index === -1)
            return false;
        this.records.splice(index, 1);
        saveHives();
        return true;
    }
}
class Colonies {
    records = [];
    addColony(newColony) {
        const colony_id = Math.floor(Math.random() * 100);
        const colony = new Colony({
            colony_id: colony_id,
            colony_name: newColony.colony_name,
            hive_id: newColony.hive_id,
        });
        this.records.push(colony);
        saveColonies();
        return colony;
    }
    getById(colony_id) {
        return this.records.find((colony) => colony.colony_id === colony_id);
    }
    getByHiveId(hive_id) {
        return this.records.filter((hive) => hive.hive_id === hive_id);
    }
    removeById(colony_id) {
        const index = this.records.findIndex((colony) => colony.colony_id === colony_id);
        if (index === -1)
            return false;
        this.records.splice(index, 1);
        saveColonies();
        return true;
    }
}
class Queens {
    records = [];
    addQueen(newQueen) {
        const queen_id = Math.floor(Math.random() * 100);
        const queen = new Queen({
            queen_id: queen_id,
            queen_name: newQueen.queen_name,
            queenright: newQueen.queenright,
            marked: newQueen.marked,
            clipped: newQueen.clipped,
            colony_id: newQueen.colony_id,
        });
        this.records.push(queen);
        saveQueens();
        return queen;
    }
    getById(queen_id) {
        return this.records.find((queen) => queen.queen_id === queen_id);
    }
    getByColonyId(colony_id) {
        return this.records.filter((colony) => colony.colony_id === colony_id);
    }
    removeById(queen_id) {
        const index = this.records.findIndex((queen) => queen.queen_id === queen_id);
        if (index === -1)
            return false;
        this.records.splice(index, 1);
        saveQueens();
        return true;
    }
}
class Inspections {
    records = [];
    addInspection(newInspection) {
        const inspection_id = Math.floor(Math.random() * 100);
        const inspection = new Inspection({
            inspection_id: inspection_id,
            timestamp: newInspection.timestamp,
            apiary_id: newInspection.apiary_id,
            colony_id: newInspection.colony_id,
            queen_cups: newInspection.queen_cups,
            brood_frames: newInspection.brood_frames,
            store_frames: newInspection.store_frames,
            room_frames: newInspection.room_frames,
            health: newInspection.health,
            varroa: newInspection.varroa,
            temper: newInspection.temper,
            feed: newInspection.feed,
            supers: newInspection.supers,
            weather: newInspection.weather,
            user_id: newInspection.user_id,
        });
        this.records.push(inspection);
        saveInspections();
        return inspection;
    }
    getById(inspection_id) {
        return this.records.find((inspection) => inspection.inspection_id === inspection_id);
    }
    getByColonyId(colony_id) {
        return this.records.filter((colony) => colony.colony_id === colony_id);
    }
    removeById(inspection_id) {
        const index = this.records.findIndex((inspection) => inspection.inspection_id === inspection_id);
        if (index === -1)
            return false;
        this.records.splice(index, 1);
        saveInspections();
        return true;
    }
}
// Instances
const userList = new Users();
const apiaryList = new Apiaries();
const hivesList = new Hives();
const coloniesList = new Colonies();
const queensList = new Queens();
const inspectionsList = new Inspections();
// Form controller
// Utility functions
function validateNumber(value, fieldName) {
    const num = parseInt(value);
    if (isNaN(num))
        throw new Error(`${fieldName} must be a valid number`);
    return num;
}
function validateDate(value) {
    const date = new Date(value);
    if (isNaN(date.getTime()))
        throw new Error('Invalid date format');
    return date;
}
// Business logic
const formController = {
    addUserData() {
        const emailInput = document.getElementById('email_input');
        if (!emailInput)
            throw new Error('Email input not found');
        const email = emailInput.value;
        const passwordInput = document.getElementById('password_input');
        if (!passwordInput)
            throw new Error('password input not found');
        const password = passwordInput.value;
        const userAddForm = document.getElementById('user_add_form');
        if (userAddForm) {
            userAddForm.reset();
        }
        return userList.addUser({ email: email, password: password });
    },
    delUserData() { },
    addApiaryData() {
        const apiaryNameInput = document.getElementById('apiary_name_input');
        if (!apiaryNameInput)
            throw new Error('Apiary name input not found');
        const apiary_name = apiaryNameInput.value;
        const userIdInput = document.getElementById('apiary_user_id_input');
        if (!userIdInput)
            throw new Error('User_id input not found');
        const user_id = parseInt(userIdInput.value);
        if (!userExists(user_id)) {
            alert(`User ID ${user_id} does not exist.`);
            return;
        }
        const apiaryAddForm = document.getElementById('apiary_add_form');
        if (apiaryAddForm) {
            apiaryAddForm.reset();
        }
        return apiaryList.addApiary({ apiary_name: apiary_name, user_id: user_id });
    },
    addHiveData() {
        const hiveNameInput = document.getElementById('hive_name_input');
        if (!hiveNameInput)
            throw new Error('Hive name input not found');
        const hive_name = hiveNameInput.value;
        const apiaryIdInput = document.getElementById('hive_apiary_id_input');
        if (!apiaryIdInput)
            throw new Error('hive ID input not found');
        const apiary_id = parseInt(apiaryIdInput.value);
        if (!apiaryExists(apiary_id)) {
            alert(`Apiary ID ${apiary_id} does not exist.`);
            return;
        }
        const hiveAddForm = document.getElementById('hive_add_form');
        if (hiveAddForm) {
            hiveAddForm.reset();
        }
        return hivesList.addHive({ hive_name, apiary_id });
    },
    addColonyData() {
        const colonyNameInput = document.getElementById('colony_name_input');
        if (!colonyNameInput)
            throw new Error('Colony name input not found');
        const colony_name = colonyNameInput.value;
        const hiveIdInput = document.getElementById('colony_hive_id_input');
        if (!hiveIdInput)
            throw new Error('hive ID input not found');
        const hive_id = parseInt(hiveIdInput.value);
        if (!hiveExists(hive_id)) {
            alert(`hive ID ${hive_id} does not exist.`);
            return;
        }
        const colonyAddForm = document.getElementById('colony_add_form');
        if (colonyAddForm) {
            colonyAddForm.reset();
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
        const colonyIdInput = document.getElementById('queen_colony_id_input');
        if (!colonyIdInput)
            throw new Error('colony ID input not found');
        const colony_id = parseInt(colonyIdInput.value);
        if (!colonyExists(colony_id)) {
            alert(`colony ID ${colony_id} does not exist.`);
            return;
        }
        const queenAddForm = document.getElementById('queen_add_form');
        if (queenAddForm) {
            queenAddForm.reset();
        }
        return queensList.addQueen({
            queen_name,
            queenright,
            marked,
            clipped,
            colony_id,
        });
    },
    addInspectionData() {
        const timestampInput = document.getElementById('timestamp_input');
        if (!timestampInput)
            throw new Error('timestamp input not found');
        const timestamp = new Date(timestampInput.value);
        const apiary_idInput = document.getElementById('inspection_apiary_id_input');
        if (!apiary_idInput)
            throw new Error('apiary_id input not found');
        const apiary_id = parseInt(apiary_idInput.value);
        const colony_idInput = document.getElementById('inspection_colony_id_input');
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
        const user_idInput = document.getElementById('inspection_user_id_input');
        if (!user_idInput)
            throw new Error('user_id input not found');
        const user_id = parseInt(user_idInput.value);
        const inspectionAddForm = document.getElementById('inspection_add_form');
        if (inspectionAddForm) {
            inspectionAddForm.reset();
        }
        return inspectionsList.addInspection({
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
};
// Controller
function addUser() {
    formController.addUserData();
    updateUserView();
}
function delUser() {
    formController.delUserData();
    updateUserView();
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
function addInspection() {
    formController.addInspectionData();
    updateInspectionView();
}
function userExists(user_id) {
    return userList.records.some((user) => user.user_id === user_id);
}
function apiaryExists(apiary_id) {
    return apiaryList.records.some((apiary) => apiary.apiary_id === apiary_id);
}
function hiveExists(hive_id) {
    return hivesList.records.some((hive) => hive.hive_id === hive_id);
}
function colonyExists(colony_id) {
    return coloniesList.records.some((colony) => colony.colony_id === colony_id);
}
function updateUserView() {
    const table = document.getElementById('users-table');
    const form = document.getElementById('user_add_form');
    const headerRow = document.getElementById('users-header-row');
    if (table && headerRow) {
        table.innerHTML = '';
        table.appendChild(headerRow);
    }
    userList.records.forEach((entry) => {
        const row = document.createElement('tr');
        const obj = entry.toObject();
        row.innerHTML = `
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
    const headerRow = document.getElementById('apiaries-header-row');
    if (table && headerRow) {
        table.innerHTML = '';
        table.appendChild(headerRow);
    }
    apiaryList.records.forEach((entry) => {
        const row = document.createElement('tr');
        const obj = entry.toObject();
        row.innerHTML = `
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
    const headerRow = document.getElementById('hives-header-row');
    if (table && headerRow) {
        table.innerHTML = '';
        table.appendChild(headerRow);
    }
    hivesList.records.forEach((entry) => {
        const row = document.createElement('tr');
        const obj = entry.toObject();
        row.innerHTML = `
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
    const headerRow = document.getElementById('colonies-header-row');
    if (table && headerRow) {
        table.innerHTML = '';
        table.appendChild(headerRow);
    }
    coloniesList.records.forEach((entry) => {
        const row = document.createElement('tr');
        const obj = entry.toObject();
        row.innerHTML = `
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
    const headerRow = document.getElementById('queens-header-row');
    if (table && headerRow) {
        table.innerHTML = '';
        table.appendChild(headerRow);
    }
    queensList.records.forEach((entry) => {
        const row = document.createElement('tr');
        const obj = entry.toObject();
        row.innerHTML = `
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
function updateInspectionView() {
    const table = document.getElementById('inspections-table');
    const form = document.getElementById('inspection_add_form');
    const headerRow = document.getElementById('inspections-header-row');
    if (table && headerRow) {
        table.innerHTML = '';
        table.appendChild(headerRow);
    }
    inspectionsList.records.forEach((entry) => {
        const row = document.createElement('tr');
        const obj = entry.toObject();
        row.innerHTML = `
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
function init() {
    loadUsers();
    loadApiaries();
    loadHives();
    loadColonies();
    loadQueens();
    loadInspections();
    updateUserView();
    updateApiaryView();
    updateHiveView();
    updateColonyView();
    updateQueenView();
    updateInspectionView();
}
// View
document.addEventListener('DOMContentLoaded', function () {
    init();
    const userAddForm = document.getElementById('user_add_form');
    if (userAddForm) {
        userAddForm.addEventListener('submit', (event) => {
            event.preventDefault();
            addUser();
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
    // Inspections
    const inspectionAddForm = document.getElementById('inspection_add_form');
    if (inspectionAddForm) {
        inspectionAddForm.addEventListener('submit', (event) => {
            event.preventDefault();
            addInspection();
        });
    }
});
