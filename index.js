"use strict";
// Interfaces
class UserAccount {
    #user_id = 0;
    #email = '';
    #password = '';
    #timestamp = '';
    constructor(user_id, email, password, timestamp) {
        this.user_id = user_id;
        this.email = email;
        this.password = password;
        this.timestamp = timestamp.toISOString();
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
class InspectionRecord {
    inspection_id;
    timestamp;
    apiary_id;
    colony_id;
    queenright;
    queen_marked;
    queen_clipped;
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
    constructor(inspection_id, timestamp, apiary_id, colony_id, queenright, queen_marked, queen_clipped, queen_cups, brood_frames, store_frames, room_frames, health, varroa, temper, feed, supers, weather, user_id) {
        this.inspection_id = inspection_id;
        this.timestamp = timestamp.toISOString();
        this.apiary_id = apiary_id;
        this.colony_id = colony_id;
        this.queenright = queenright;
        this.queen_marked = queen_marked;
        this.queen_clipped = queen_clipped;
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
}
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
class Records {
    records = [];
    addRecord(newInspection) {
        const inspection_id = Math.floor(Math.random() * 100);
        const inspection = new InspectionRecord(inspection_id, newInspection.timestamp, newInspection.apiary_id, newInspection.colony_id, newInspection.queenright, newInspection.queen_marked, newInspection.queen_clipped, newInspection.queen_cups, newInspection.brood_frames, newInspection.store_frames, newInspection.room_frames, newInspection.health, newInspection.varroa, newInspection.temper, newInspection.feed, newInspection.supers, newInspection.weather, newInspection.user_id);
        this.records.push(inspection);
        return inspection;
    }
}
const userList = new Users();
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
    delUserData() {
        const indexInput = document.getElementById('index_input');
        if (!indexInput)
            throw new Error('Index input not found');
        const index = parseInt(indexInput.value);
        return userList.users.splice(index, 1);
    },
};
// Controller
function add() {
    formController.getUserData();
    updateView();
}
function del() {
    formController.delUserData();
    updateView();
}
function updateView() {
    const userAddInput = document.getElementById('user_add_form');
    if (userAddInput) {
        userAddInput.reset();
    }
    const userDelInput = document.getElementById('user_del_form');
    if (userDelInput) {
        userDelInput.reset();
    }
    const table = document.getElementById('view_table');
    const headerRow = document.getElementById('header_row');
    if (table && headerRow) {
        table.innerHTML = '';
        table.appendChild(headerRow);
    }
    userList.users.forEach((entry, index) => {
        const row = document.createElement('tr');
        const obj = entry.toObject(index);
        row.innerHTML = `
        <td>${obj.index}</td>
        <td>${obj.email}</td>
        <td>${obj.password}</td>
        <td>${obj.timestamp}</td>
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
            add();
        });
    }
    const userDelForm = document.getElementById('user_del_form');
    if (userDelForm) {
        userDelForm.addEventListener('submit', (event) => {
            event.preventDefault();
            del();
        });
    }
});
