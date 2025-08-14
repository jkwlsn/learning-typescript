"use strict";
// Define constants for your storage keys to avoid magic strings
const STORAGE_KEYS = {
    USERS: 'users',
    APIARIES: 'apiaries',
    HIVES: 'hives',
    COLONIES: 'colonies',
    QUEENS: 'queens',
    INSPECTIONS: 'inspections',
};
class StorageService {
    // Save any of your data collections
    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        }
        catch (error) {
            console.error(`Error saving data for key "${key}":`, error);
        }
    }
    // Load any of your data collections
    load(key) {
        try {
            const data = localStorage.getItem(key);
            if (data === null) {
                return null;
            }
            return JSON.parse(data);
        }
        catch (error) {
            console.error(`Error loading data for key "${key}":`, error);
            return null;
        }
    }
}
// Create a single instance to be used throughout the app
const storageService = new StorageService();
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
        this.timestamp = new Date(timestamp);
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
    marked;
    clipped;
    colony_id;
    constructor({ queen_id, queen_name, marked, clipped, colony_id, }) {
        this.queen_id = queen_id;
        this.queen_name = queen_name;
        this.marked = marked;
        this.clipped = clipped;
        this.colony_id = colony_id;
    }
    toObject() {
        return {
            queen_id: this.queen_id,
            queen_name: this.queen_name,
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
    queenright;
    bias;
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
    constructor({ inspection_id, timestamp, apiary_id, colony_id, queenright, bias, queen_cups, brood_frames, store_frames, room_frames, health, varroa, temper, feed, supers, weather, user_id, }) {
        this.inspection_id = inspection_id;
        this.timestamp = new Date(timestamp);
        this.apiary_id = apiary_id;
        this.colony_id = colony_id;
        this.queen_cups = queen_cups;
        this.queenright = queenright;
        this.bias = bias;
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
            queenright: this.queenright,
            bias: this.bias,
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
// Data Management Classes
class Users {
    nextId = 1;
    records = [];
    addUser(newUser) {
        const user_id = this.nextId++;
        const timestamp = new Date();
        const user = new User({
            user_id: user_id,
            email: newUser.email,
            password: newUser.password,
            timestamp: timestamp,
        });
        this.records.push(user);
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
        return true;
    }
    updateUser(updatedUser) {
        const index = this.records.findIndex((user) => user.user_id === updatedUser.user_id);
        if (index === -1)
            return false;
        this.records[index] = new User(updatedUser);
        return true;
    }
}
class Apiaries {
    nextId = 1;
    records = [];
    addApiary(newApiary) {
        const apiary_id = this.nextId++;
        const apiary = new Apiary({
            apiary_id: apiary_id,
            apiary_name: newApiary.apiary_name,
            user_id: newApiary.user_id,
        });
        this.records.push(apiary);
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
        return true;
    }
    updateApiary(updatedApiary) {
        const index = this.records.findIndex((apiary) => apiary.apiary_id === updatedApiary.apiary_id);
        if (index === -1)
            return false;
        this.records[index] = new Apiary(updatedApiary);
        return true;
    }
}
class Hives {
    nextId = 1;
    records = [];
    addHive(newHive) {
        const hive_id = this.nextId++;
        const hive = new Hive({
            hive_id: hive_id,
            hive_name: newHive.hive_name,
            apiary_id: newHive.apiary_id,
        });
        this.records.push(hive);
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
        return true;
    }
    updateHive(updatedHive) {
        const index = this.records.findIndex((hive) => hive.hive_id === updatedHive.hive_id);
        if (index === -1)
            return false;
        this.records[index] = new Hive(updatedHive);
        return true;
    }
}
class Colonies {
    nextId = 1;
    records = [];
    addColony(newColony) {
        const colony_id = this.nextId++;
        const colony = new Colony({
            colony_id: colony_id,
            colony_name: newColony.colony_name,
            hive_id: newColony.hive_id,
        });
        this.records.push(colony);
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
        return true;
    }
    updateColony(updatedColony) {
        const index = this.records.findIndex((colony) => colony.colony_id === updatedColony.colony_id);
        if (index === -1)
            return false;
        this.records[index] = new Colony(updatedColony);
        return true;
    }
}
class Queens {
    nextId = 1;
    records = [];
    addQueen(newQueen) {
        const queen_id = this.nextId++;
        const queen = new Queen({
            queen_id: queen_id,
            queen_name: newQueen.queen_name,
            marked: newQueen.marked,
            clipped: newQueen.clipped,
            colony_id: newQueen.colony_id,
        });
        this.records.push(queen);
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
        return true;
    }
    updateQueen(updatedQueen) {
        const index = this.records.findIndex((queen) => queen.queen_id === updatedQueen.queen_id);
        if (index === -1)
            return false;
        this.records[index] = new Queen(updatedQueen);
        return true;
    }
}
class Inspections {
    nextId = 1;
    records = [];
    addInspection(newInspection) {
        const inspection_id = this.nextId++;
        const inspection = new Inspection({
            inspection_id: inspection_id,
            ...newInspection,
        });
        this.records.push(inspection);
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
        return true;
    }
    updateInspection(updatedInspection) {
        const index = this.records.findIndex((inspection) => inspection.inspection_id === updatedInspection.inspection_id);
        if (index === -1)
            return false;
        this.records[index] = new Inspection(updatedInspection);
        return true;
    }
}
// Repository Classes
class UsersRepository {
    usersCollection = new Users();
    constructor() {
        this.load();
    }
    save() {
        storageService.save(STORAGE_KEYS.USERS, {
            records: this.usersCollection.records.map((user) => user.toObject()),
            nextId: this.usersCollection.nextId,
        });
    }
    load() {
        const savedData = storageService.load(STORAGE_KEYS.USERS);
        if (savedData) {
            this.usersCollection.records = savedData.records.map((data) => new User(data));
            this.usersCollection.nextId = savedData.nextId;
        }
    }
    addUser(newUser) {
        const user = this.usersCollection.addUser(newUser);
        this.save();
        return user;
    }
    updateUser(updatedUser) {
        const result = this.usersCollection.updateUser(updatedUser);
        if (result) {
            this.save();
        }
        return result;
    }
    deleteById(user_id) {
        const result = this.usersCollection.deleteById(user_id);
        if (result) {
            this.save();
        }
        return result;
    }
    getById(user_id) {
        return this.usersCollection.getById(user_id);
    }
    getByEmail(email) {
        return this.usersCollection.getByEmail(email);
    }
    get allRecords() {
        return this.usersCollection.records;
    }
}
class ApiariesRepository {
    apiariesCollection = new Apiaries();
    constructor() {
        this.load();
    }
    save() {
        storageService.save(STORAGE_KEYS.APIARIES, {
            records: this.apiariesCollection.records.map((r) => r.toObject()),
            nextId: this.apiariesCollection.nextId,
        });
    }
    load() {
        const savedData = storageService.load(STORAGE_KEYS.APIARIES);
        if (savedData) {
            this.apiariesCollection.records = savedData.records.map((data) => new Apiary(data));
            this.apiariesCollection.nextId = savedData.nextId;
        }
    }
    addApiary(newApiary) {
        if (!usersRepository.getById(newApiary.user_id)) {
            console.error(`User with ID ${newApiary.user_id} does not exist.`);
            alert(`User ID ${newApiary.user_id} does not exist.`);
            return null;
        }
        const apiary_id = this.apiariesCollection.nextId++;
        const apiary = new Apiary({
            apiary_id: apiary_id,
            apiary_name: newApiary.apiary_name,
            user_id: newApiary.user_id,
        });
        this.apiariesCollection.records.push(apiary);
        this.save();
        return apiary;
    }
    updateApiary(updatedApiary) {
        const result = this.apiariesCollection.updateApiary(updatedApiary);
        if (result) {
            this.save();
        }
        return result;
    }
    removeById(apiary_id) {
        const result = this.apiariesCollection.removeById(apiary_id);
        if (result) {
            this.save();
        }
        return result;
    }
    getById(apiary_id) {
        return this.apiariesCollection.getById(apiary_id);
    }
    getByUserId(user_id) {
        return this.apiariesCollection.getByUserId(user_id);
    }
    get allRecords() {
        return this.apiariesCollection.records;
    }
}
class HivesRepository {
    hivesCollection = new Hives();
    constructor() {
        this.load();
    }
    save() {
        storageService.save(STORAGE_KEYS.HIVES, {
            records: this.hivesCollection.records.map((r) => r.toObject()),
            nextId: this.hivesCollection.nextId,
        });
    }
    load() {
        const savedData = storageService.load(STORAGE_KEYS.HIVES);
        if (savedData) {
            this.hivesCollection.records = savedData.records.map((data) => new Hive(data));
            this.hivesCollection.nextId = savedData.nextId;
        }
    }
    addHive(newHive) {
        if (!apiariesRepository.getById(newHive.apiary_id)) {
            console.error(`Apiary with ID ${newHive.apiary_id} does not exist.`);
            alert(`Apiary ID ${newHive.apiary_id} does not exist.`);
            return null;
        }
        const hive_id = this.hivesCollection.nextId++;
        const hive = new Hive({
            hive_id: hive_id,
            hive_name: newHive.hive_name,
            apiary_id: newHive.apiary_id,
        });
        this.hivesCollection.records.push(hive);
        this.save();
        return hive;
    }
    updateHive(updatedHive) {
        const result = this.hivesCollection.updateHive(updatedHive);
        if (result) {
            this.save();
        }
        return result;
    }
    removeById(hive_id) {
        const result = this.hivesCollection.removeById(hive_id);
        if (result) {
            this.save();
        }
        return result;
    }
    getById(hive_id) {
        return this.hivesCollection.getById(hive_id);
    }
    getByApiaryId(apiary_id) {
        return this.hivesCollection.getByApiaryId(apiary_id);
    }
    get allRecords() {
        return this.hivesCollection.records;
    }
}
class ColoniesRepository {
    coloniesCollection = new Colonies();
    constructor() {
        this.load();
    }
    save() {
        storageService.save(STORAGE_KEYS.COLONIES, {
            records: this.coloniesCollection.records.map((r) => r.toObject()),
            nextId: this.coloniesCollection.nextId,
        });
    }
    load() {
        const savedData = storageService.load(STORAGE_KEYS.COLONIES);
        if (savedData) {
            this.coloniesCollection.records = savedData.records.map((data) => new Colony(data));
            this.coloniesCollection.nextId = savedData.nextId;
        }
    }
    addColony(newColony) {
        if (!hivesRepository.getById(newColony.hive_id)) {
            console.error(`Hive with ID ${newColony.hive_id} does not exist.`);
            alert(`Hive ID ${newColony.hive_id} does not exist.`);
            return null;
        }
        const colony_id = this.coloniesCollection.nextId++;
        const colony = new Colony({
            colony_id: colony_id,
            colony_name: newColony.colony_name,
            hive_id: newColony.hive_id,
        });
        this.coloniesCollection.records.push(colony);
        this.save();
        return colony;
    }
    updateColony(updatedColony) {
        const result = this.coloniesCollection.updateColony(updatedColony);
        if (result) {
            this.save();
        }
        return result;
    }
    removeById(colony_id) {
        const result = this.coloniesCollection.removeById(colony_id);
        if (result) {
            this.save();
        }
        return result;
    }
    getById(colony_id) {
        return this.coloniesCollection.getById(colony_id);
    }
    getByHiveId(hive_id) {
        return this.coloniesCollection.getByHiveId(hive_id);
    }
    get allRecords() {
        return this.coloniesCollection.records;
    }
}
class QueensRepository {
    queensCollection = new Queens();
    constructor() {
        this.load();
    }
    save() {
        storageService.save(STORAGE_KEYS.QUEENS, {
            records: this.queensCollection.records.map((r) => r.toObject()),
            nextId: this.queensCollection.nextId,
        });
    }
    load() {
        const savedData = storageService.load(STORAGE_KEYS.QUEENS);
        if (savedData) {
            this.queensCollection.records = savedData.records.map((data) => new Queen(data));
            this.queensCollection.nextId = savedData.nextId;
        }
    }
    addQueen(newQueen) {
        if (!coloniesRepository.getById(newQueen.colony_id)) {
            console.error(`Colony with ID ${newQueen.colony_id} does not exist.`);
            alert(`Colony ID ${newQueen.colony_id} does not exist.`);
            return null;
        }
        const queen_id = this.queensCollection.nextId++;
        const queen = new Queen({
            queen_id: queen_id,
            queen_name: newQueen.queen_name,
            marked: newQueen.marked,
            clipped: newQueen.clipped,
            colony_id: newQueen.colony_id,
        });
        this.queensCollection.records.push(queen);
        this.save();
        return queen;
    }
    updateQueen(updatedQueen) {
        const result = this.queensCollection.updateQueen(updatedQueen);
        if (result) {
            this.save();
        }
        return result;
    }
    removeById(queen_id) {
        const result = this.queensCollection.removeById(queen_id);
        if (result) {
            this.save();
        }
        return result;
    }
    getById(queen_id) {
        return this.queensCollection.getById(queen_id);
    }
    getByColonyId(colony_id) {
        return this.queensCollection.getByColonyId(colony_id);
    }
    get allRecords() {
        return this.queensCollection.records;
    }
}
class InspectionsRepository {
    inspectionsCollection = new Inspections();
    constructor() {
        this.load();
    }
    save() {
        storageService.save(STORAGE_KEYS.INSPECTIONS, {
            records: this.inspectionsCollection.records.map((r) => r.toObject()),
            nextId: this.inspectionsCollection.nextId,
        });
    }
    load() {
        const savedData = storageService.load(STORAGE_KEYS.INSPECTIONS);
        if (savedData) {
            this.inspectionsCollection.records = savedData.records.map((data) => new Inspection(data));
            this.inspectionsCollection.nextId = savedData.nextId;
        }
    }
    addInspection(newInspection) {
        if (!apiariesRepository.getById(newInspection.apiary_id)) {
            console.error(`Apiary with ID ${newInspection.apiary_id} does not exist.`);
            alert(`Apiary ID ${newInspection.apiary_id} does not exist.`);
            return null;
        }
        if (!coloniesRepository.getById(newInspection.colony_id)) {
            console.error(`Colony with ID ${newInspection.colony_id} does not exist.`);
            alert(`Colony ID ${newInspection.colony_id} does not exist.`);
            return null;
        }
        const inspection_id = this.inspectionsCollection.nextId++;
        const inspection = new Inspection({
            inspection_id: inspection_id,
            ...newInspection,
        });
        this.inspectionsCollection.records.push(inspection);
        this.save();
        return inspection;
    }
    updateInspection(updatedInspection) {
        const result = this.inspectionsCollection.updateInspection(updatedInspection);
        if (result) {
            this.save();
        }
        return result;
    }
    removeById(inspection_id) {
        const result = this.inspectionsCollection.removeById(inspection_id);
        if (result) {
            this.save();
        }
        return result;
    }
    getById(inspection_id) {
        return this.inspectionsCollection.getById(inspection_id);
    }
    getByColonyId(colony_id) {
        return this.inspectionsCollection.getByColonyId(colony_id);
    }
    get allRecords() {
        return this.inspectionsCollection.records;
    }
}
// Instances
const usersRepository = new UsersRepository();
const apiariesRepository = new ApiariesRepository();
const hivesRepository = new HivesRepository();
const coloniesRepository = new ColoniesRepository();
const queensRepository = new QueensRepository();
const inspectionsRepository = new InspectionsRepository();
let editingUserId = null;
let editingApiaryId = null;
let editingHiveId = null;
let editingColonyId = null;
let editingQueenId = null;
let editingInspectionId = null;
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
        if (editingUserId !== null) {
            // Update existing user
            const existingUser = usersRepository.getById(editingUserId);
            if (existingUser) {
                const updatedUser = {
                    ...existingUser,
                    email: email,
                    password: password,
                };
                usersRepository.updateUser(updatedUser);
            }
            else {
                console.error(`User with ID ${editingUserId} not found for update.`);
            }
        }
        else {
            // Add new user
            usersRepository.addUser({ email: email, password: password });
        }
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
        if (editingApiaryId !== null) {
            // Update existing apiary
            const existingApiary = apiariesRepository.getById(editingApiaryId);
            if (existingApiary) {
                const updatedApiary = {
                    ...existingApiary,
                    apiary_name: apiary_name,
                    user_id: user_id,
                };
                apiariesRepository.updateApiary(updatedApiary);
                return updatedApiary; // Return the updated apiary
            }
            else {
                console.error(`Apiary with ID ${editingApiaryId} not found for update.`);
                return null;
            }
        }
        else {
            // Add new apiary
            return apiariesRepository.addApiary({
                apiary_name: apiary_name,
                user_id: user_id,
            });
        }
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
        if (editingHiveId !== null) {
            // Update existing hive
            const existingHive = hivesRepository.getById(editingHiveId);
            if (existingHive) {
                const updatedHive = {
                    ...existingHive,
                    hive_name: hive_name,
                    apiary_id: apiary_id,
                };
                hivesRepository.updateHive(updatedHive);
                return updatedHive; // Return the updated hive
            }
            else {
                console.error(`Hive with ID ${editingHiveId} not found for update.`);
                return null;
            }
        }
        else {
            // Add new hive
            return hivesRepository.addHive({ hive_name, apiary_id });
        }
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
        if (editingColonyId !== null) {
            // Update existing colony
            const existingColony = coloniesRepository.getById(editingColonyId);
            if (existingColony) {
                const updatedColony = {
                    ...existingColony,
                    colony_name: colony_name,
                    hive_id: hive_id,
                };
                coloniesRepository.updateColony(updatedColony);
                return updatedColony; // Return the updated colony
            }
            else {
                console.error(`Colony with ID ${editingColonyId} not found for update.`);
                return null;
            }
        }
        else {
            // Add new colony
            return coloniesRepository.addColony({ colony_name, hive_id });
        }
    },
    addQueenData() {
        const queenNameInput = document.getElementById('queen_name_input');
        if (!queenNameInput)
            throw new Error('Queen name input not found');
        const queen_name = queenNameInput.value;
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
        if (editingQueenId !== null) {
            // Update existing queen
            const existingQueen = queensRepository.getById(editingQueenId);
            if (existingQueen) {
                const updatedQueen = {
                    ...existingQueen,
                    queen_name: queen_name,
                    marked: marked,
                    clipped: clipped,
                    colony_id: colony_id,
                };
                queensRepository.updateQueen(updatedQueen);
                return updatedQueen; // Return the updated queen
            }
            else {
                console.error(`Queen with ID ${editingQueenId} not found for update.`);
                return null;
            }
        }
        else {
            // Add new queen
            return queensRepository.addQueen({
                queen_name,
                marked,
                clipped,
                colony_id,
            });
        }
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
        const queenrightInput = document.getElementById('queenright_input');
        if (!queenrightInput)
            throw new Error('queenright input not found');
        const queenright = queenrightInput.checked;
        const biasInput = document.getElementById('bias_input');
        if (!biasInput)
            throw new Error('bias input not found');
        const bias = biasInput.checked;
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
        if (editingInspectionId !== null) {
            // Update existing inspection
            const existingInspection = inspectionsRepository.getById(editingInspectionId);
            if (existingInspection) {
                const updatedInspection = {
                    ...existingInspection,
                    timestamp,
                    apiary_id,
                    colony_id,
                    queenright,
                    bias,
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
                };
                inspectionsRepository.updateInspection(updatedInspection);
                return updatedInspection; // Return the updated inspection
            }
            else {
                console.error(`Inspection with ID ${editingInspectionId} not found for update.`);
                return null;
            }
        }
        else {
            // Add new inspection
            return inspectionsRepository.addInspection({
                timestamp,
                apiary_id,
                colony_id,
                queen_cups,
                queenright,
                bias,
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
        }
    },
};
// Controller
class View {
    constructor() {
        this.bindEvents();
    }
    bindEvents() {
        const formBindings = [
            { formId: 'user_add_form', handler: addUser },
            { formId: 'apiary_add_form', handler: addApiary },
            { formId: 'hive_add_form', handler: addHive },
            { formId: 'colony_add_form', handler: addColony },
            { formId: 'queen_add_form', handler: addQueen },
            { formId: 'inspection_add_form', handler: addInspection },
        ];
        formBindings.forEach(({ formId, handler }) => {
            const formElement = document.getElementById(formId);
            if (formElement) {
                formElement.addEventListener('submit', (event) => {
                    event.preventDefault();
                    handler();
                });
            }
        });
        // Event delegation for delete buttons
        const usersTable = document.getElementById('users-table');
        if (usersTable) {
            usersTable.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('delete-user-btn')) {
                    const userId = parseInt(target.dataset.id || '');
                    if (!isNaN(userId)) {
                        deleteUser(userId);
                    }
                }
                else if (target.classList.contains('edit-user-btn')) {
                    const userId = parseInt(target.dataset.id || '');
                    if (!isNaN(userId)) {
                        populateUserFormForEdit(userId);
                    }
                }
            });
        }
        // Event delegation for apiary delete and edit buttons
        const apiariesTable = document.getElementById('apiaries-table');
        if (apiariesTable) {
            apiariesTable.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('delete-apiary-btn')) {
                    const apiaryId = parseInt(target.dataset.id || '');
                    if (!isNaN(apiaryId)) {
                        deleteApiary(apiaryId);
                    }
                }
                else if (target.classList.contains('edit-apiary-btn')) {
                    const apiaryId = parseInt(target.dataset.id || '');
                    if (!isNaN(apiaryId)) {
                        populateApiaryFormForEdit(apiaryId);
                    }
                }
            });
        }
        // Event delegation for hive delete and edit buttons
        const hivesTable = document.getElementById('hives-table');
        if (hivesTable) {
            hivesTable.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('delete-hive-btn')) {
                    const hiveId = parseInt(target.dataset.id || '');
                    if (!isNaN(hiveId)) {
                        deleteHive(hiveId);
                    }
                }
                else if (target.classList.contains('edit-hive-btn')) {
                    const hiveId = parseInt(target.dataset.id || '');
                    if (!isNaN(hiveId)) {
                        populateHiveFormForEdit(hiveId);
                    }
                }
            });
        }
        // Event delegation for colony delete and edit buttons
        const coloniesTable = document.getElementById('colonies-table');
        if (coloniesTable) {
            coloniesTable.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('delete-colony-btn')) {
                    const colonyId = parseInt(target.dataset.id || '');
                    if (!isNaN(colonyId)) {
                        deleteColony(colonyId);
                    }
                }
                else if (target.classList.contains('edit-colony-btn')) {
                    const colonyId = parseInt(target.dataset.id || '');
                    if (!isNaN(colonyId)) {
                        populateColonyFormForEdit(colonyId);
                    }
                }
            });
        }
        // Event delegation for queen delete and edit buttons
        const queensTable = document.getElementById('queens-table');
        if (queensTable) {
            queensTable.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('delete-queen-btn')) {
                    const queenId = parseInt(target.dataset.id || '');
                    if (!isNaN(queenId)) {
                        deleteQueen(queenId);
                    }
                }
                else if (target.classList.contains('edit-queen-btn')) {
                    const queenId = parseInt(target.dataset.id || '');
                    if (!isNaN(queenId)) {
                        populateQueenFormForEdit(queenId);
                    }
                }
            });
        }
        // Event delegation for inspection delete and edit buttons
        const inspectionsTable = document.getElementById('inspections-table');
        if (inspectionsTable) {
            inspectionsTable.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('delete-inspection-btn')) {
                    const inspectionId = parseInt(target.dataset.id || '');
                    if (!isNaN(inspectionId)) {
                        deleteInspection(inspectionId);
                    }
                }
                else if (target.classList.contains('edit-inspection-btn')) {
                    const inspectionId = parseInt(target.dataset.id || '');
                    if (!isNaN(inspectionId)) {
                        populateInspectionFormForEdit(inspectionId);
                    }
                }
            });
        }
    }
    render(records, rowTemplate, tableId, headerRowId) {
        const table = document.getElementById(tableId);
        const headerRow = document.getElementById(headerRowId);
        if (table && headerRow) {
            table.innerHTML = '';
            table.appendChild(headerRow);
        }
        records.forEach((entry) => {
            const row = document.createElement('tr');
            row.innerHTML = rowTemplate(entry);
            table.appendChild(row);
        });
    }
    renderAll() {
        for (const key in viewConfig) {
            const config = viewConfig[key];
            this.render(config.getRecords(), config.rowTemplate, config.tableId, config.headerRowId);
        }
    }
    renderView(viewName) {
        const config = viewConfig[viewName];
        if (config) {
            this.render(config.getRecords(), config.rowTemplate, config.tableId, config.headerRowId);
        }
    }
    userRowTemplate(user) {
        return `
      <td>${user.user_id}</td>
      <td>${user.email}</td>
      <td>${user.password}</td>
      <td>${new Date(user.timestamp).toLocaleString()}</td>
      <td>
        <button class="edit-user-btn" data-id="${user.user_id}">Edit</button>
        <button class="delete-user-btn" data-id="${user.user_id}">Delete</button>
      </td>
    `;
    }
    apiaryRowTemplate(apiary) {
        return `
      <td>${apiary.apiary_id}</td>
      <td>${apiary.apiary_name}</td>
      <td>${apiary.user_id}</td>
      <td>
        <button class="edit-apiary-btn" data-id="${apiary.apiary_id}">Edit</button>
        <button class="delete-apiary-btn" data-id="${apiary.apiary_id}">Delete</button>
      </td>
    `;
    }
    hiveRowTemplate(hive) {
        return `
      <td>${hive.hive_id}</td>
      <td>${hive.hive_name}</td>
      <td>${hive.apiary_id}</td>
      <td>
        <button class="edit-hive-btn" data-id="${hive.hive_id}">Edit</button>
        <button class="delete-hive-btn" data-id="${hive.hive_id}">Delete</button>
      </td>
    `;
    }
    colonyRowTemplate(colony) {
        return `
      <td>${colony.colony_id}</td>
      <td>${colony.colony_name}</td>
      <td>${colony.hive_id}</td>
      <td>
        <button class="edit-colony-btn" data-id="${colony.colony_id}">Edit</button>
        <button class="delete-colony-btn" data-id="${colony.colony_id}">Delete</button>
      </td>
    `;
    }
    queenRowTemplate(queen) {
        return `
      <td>${queen.queen_id}</td>
      <td>${queen.queen_name}</td>
      <td>${queen.marked}</td>
      <td>${queen.clipped}</td>
      <td>${queen.colony_id}</td>
      <td>
        <button class="edit-queen-btn" data-id="${queen.queen_id}">Edit</button>
        <button class="delete-queen-btn" data-id="${queen.queen_id}">Delete</button>
      </td>
    `;
    }
    inspectionRowTemplate(inspection) {
        return `
      <td>${new Date(inspection.timestamp).toLocaleString()}</td>
      <td>${inspection.apiary_id}</td>
      <td>${inspection.colony_id}</td>
      <td>${inspection.queenright}</td>
      <td>${inspection.bias}</td>
      <td>${inspection.queen_cups}</td>
      <td>${inspection.brood_frames}</td>
      <td>${inspection.store_frames}</td>
      <td>${inspection.room_frames}</td>
      <td>${inspection.health}</td>
      <td>${inspection.varroa}</td>
      <td>${inspection.temper}</td>
      <td>${inspection.feed}</td>
      <td>${inspection.supers}</td>
      <td>${inspection.weather}</td>
      <td>${inspection.user_id}</td>
      <td>
        <button class="edit-inspection-btn" data-id="${inspection.inspection_id}">Edit</button>
        <button class="delete-inspection-btn" data-id="${inspection.inspection_id}">Delete</button>
      </td>
    `;
    }
}
const view = new View();
const viewConfig = {
    users: {
        tableId: 'users-table',
        headerRowId: 'users-header-row',
        rowTemplate: view.userRowTemplate,
        getRecords: () => usersRepository.allRecords,
    },
    apiaries: {
        tableId: 'apiaries-table',
        headerRowId: 'apiaries-header-row',
        rowTemplate: view.apiaryRowTemplate,
        getRecords: () => apiariesRepository.allRecords,
    },
    hives: {
        tableId: 'hives-table',
        headerRowId: 'hives-header-row',
        rowTemplate: view.hiveRowTemplate,
        getRecords: () => hivesRepository.allRecords,
    },
    colonies: {
        tableId: 'colonies-table',
        headerRowId: 'colonies-header-row',
        rowTemplate: view.colonyRowTemplate,
        getRecords: () => coloniesRepository.allRecords,
    },
    queens: {
        tableId: 'queens-table',
        headerRowId: 'queens-header-row',
        rowTemplate: view.queenRowTemplate,
        getRecords: () => queensRepository.allRecords,
    },
    inspections: {
        tableId: 'inspections-table',
        headerRowId: 'inspections-header-row',
        rowTemplate: view.inspectionRowTemplate,
        getRecords: () => inspectionsRepository.allRecords,
    },
};
function populateUserFormForEdit(userId) {
    const user = usersRepository.getById(userId);
    if (user) {
        const emailInput = document.getElementById('email_input');
        const passwordInput = document.getElementById('password_input');
        const addUserButton = document.getElementById('add_user');
        if (emailInput && passwordInput && addUserButton) {
            emailInput.value = user.email;
            passwordInput.value = user.password;
            addUserButton.value = 'Save User Changes';
            editingUserId = userId;
        }
    }
}
function clearUserForm() {
    const userAddForm = document.getElementById('user_add_form');
    const addUserButton = document.getElementById('add_user');
    if (userAddForm && addUserButton) {
        userAddForm.reset();
        addUserButton.value = 'Add user';
        editingUserId = null;
    }
}
function populateApiaryFormForEdit(apiaryId) {
    const apiary = apiariesRepository.getById(apiaryId);
    if (apiary) {
        const apiaryNameInput = document.getElementById('apiary_name_input');
        const apiaryUserIdInput = document.getElementById('apiary_user_id_input');
        const addApiaryButton = document.getElementById('add_apiary');
        if (apiaryNameInput && apiaryUserIdInput && addApiaryButton) {
            apiaryNameInput.value = apiary.apiary_name;
            apiaryUserIdInput.value = apiary.user_id.toString();
            addApiaryButton.value = 'Save Apiary Changes';
            editingApiaryId = apiaryId;
        }
    }
}
function clearApiaryForm() {
    const apiaryAddForm = document.getElementById('apiary_add_form');
    const addApiaryButton = document.getElementById('add_apiary');
    if (apiaryAddForm && addApiaryButton) {
        apiaryAddForm.reset();
        addApiaryButton.value = 'Add apiary';
        editingApiaryId = null;
    }
}
function populateHiveFormForEdit(hiveId) {
    const hive = hivesRepository.getById(hiveId);
    if (hive) {
        const hiveNameInput = document.getElementById('hive_name_input');
        const hiveApiaryIdInput = document.getElementById('hive_apiary_id_input');
        const addHiveButton = document.getElementById('add_hive');
        if (hiveNameInput && hiveApiaryIdInput && addHiveButton) {
            hiveNameInput.value = hive.hive_name;
            hiveApiaryIdInput.value = hive.apiary_id.toString();
            addHiveButton.value = 'Save Hive Changes';
            editingHiveId = hiveId;
        }
    }
}
function clearHiveForm() {
    const hiveAddForm = document.getElementById('hive_add_form');
    const addHiveButton = document.getElementById('add_hive');
    if (hiveAddForm && addHiveButton) {
        hiveAddForm.reset();
        addHiveButton.value = 'Add hive';
        editingHiveId = null;
    }
}
function populateColonyFormForEdit(colonyId) {
    const colony = coloniesRepository.getById(colonyId);
    if (colony) {
        const colonyNameInput = document.getElementById('colony_name_input');
        const colonyHiveIdInput = document.getElementById('colony_hive_id_input');
        const addColonyButton = document.getElementById('add_colony');
        if (colonyNameInput && colonyHiveIdInput && addColonyButton) {
            colonyNameInput.value = colony.colony_name;
            colonyHiveIdInput.value = colony.hive_id.toString();
            addColonyButton.value = 'Save Colony Changes';
            editingColonyId = colonyId;
        }
    }
}
function clearColonyForm() {
    const colonyAddForm = document.getElementById('colony_add_form');
    const addColonyButton = document.getElementById('add_colony');
    if (colonyAddForm && addColonyButton) {
        colonyAddForm.reset();
        addColonyButton.value = 'Add colony';
        editingColonyId = null;
    }
}
function populateQueenFormForEdit(queenId) {
    const queen = queensRepository.getById(queenId);
    if (queen) {
        const queenNameInput = document.getElementById('queen_name_input');
        const queenMarkedInput = document.getElementById('queen_marked_input');
        const queenClippedInput = document.getElementById('queen_clipped_input');
        const queenColonyIdInput = document.getElementById('queen_colony_id_input');
        const addQueenButton = document.getElementById('add_queen');
        if (queenNameInput && queenMarkedInput && queenClippedInput && queenColonyIdInput && addQueenButton) {
            queenNameInput.value = queen.queen_name;
            queenMarkedInput.value = queen.marked;
            queenClippedInput.checked = queen.clipped;
            queenColonyIdInput.value = queen.colony_id.toString();
            addQueenButton.value = 'Save Queen Changes';
            editingQueenId = queenId;
        }
    }
}
function clearQueenForm() {
    const queenAddForm = document.getElementById('queen_add_form');
    const addQueenButton = document.getElementById('add_queen');
    if (queenAddForm && addQueenButton) {
        queenAddForm.reset();
        addQueenButton.value = 'Add queen';
        editingQueenId = null;
    }
}
function populateInspectionFormForEdit(inspectionId) {
    const inspection = inspectionsRepository.getById(inspectionId);
    if (inspection) {
        const timestampInput = document.getElementById('timestamp_input');
        const apiaryIdInput = document.getElementById('inspection_apiary_id_input');
        const colonyIdInput = document.getElementById('inspection_colony_id_input');
        const queenrightInput = document.getElementById('queenright_input');
        const biasInput = document.getElementById('bias_input');
        const queenCupsInput = document.getElementById('queen_cups_input');
        const broodFramesInput = document.getElementById('brood_frames_input');
        const storeFramesInput = document.getElementById('store_frames_input');
        const roomFramesInput = document.getElementById('room_frames_input');
        const healthInput = document.getElementById('health_input');
        const varroaInput = document.getElementById('varroa_input');
        const temperInput = document.getElementById('temper_input');
        const feedInput = document.getElementById('feed_input');
        const supersInput = document.getElementById('supers_input');
        const weatherInput = document.getElementById('weather_input');
        const userIdInput = document.getElementById('inspection_user_id_input');
        const addInspectionButton = document.getElementById('add_inspection');
        if (timestampInput && apiaryIdInput && colonyIdInput && queenrightInput && biasInput && queenCupsInput && broodFramesInput && storeFramesInput && roomFramesInput && healthInput && varroaInput && temperInput && feedInput && supersInput && weatherInput && userIdInput && addInspectionButton) {
            timestampInput.value = inspection.timestamp.toISOString().slice(0, 16);
            apiaryIdInput.value = inspection.apiary_id.toString();
            colonyIdInput.value = inspection.colony_id.toString();
            queenrightInput.checked = inspection.queenright;
            biasInput.checked = inspection.bias;
            queenCupsInput.value = inspection.queen_cups.toString();
            broodFramesInput.value = inspection.brood_frames.toString();
            storeFramesInput.value = inspection.store_frames.toString();
            roomFramesInput.value = inspection.room_frames.toString();
            healthInput.value = inspection.health;
            varroaInput.value = inspection.varroa.toString();
            temperInput.value = inspection.temper.toString();
            feedInput.value = inspection.feed.toString();
            supersInput.value = inspection.supers.toString();
            weatherInput.value = inspection.weather;
            userIdInput.value = inspection.user_id.toString();
            addInspectionButton.value = 'Save Inspection Changes';
            editingInspectionId = inspectionId;
        }
    }
}
function clearInspectionForm() {
    const inspectionAddForm = document.getElementById('inspection_add_form');
    const addInspectionButton = document.getElementById('add_inspection');
    if (inspectionAddForm && addInspectionButton) {
        inspectionAddForm.reset();
        addInspectionButton.value = 'Add inspection';
        editingInspectionId = null;
    }
}
function addUser() {
    formController.addUserData();
    view.renderView('users');
    clearUserForm(); // Clear form after add/edit
}
function deleteUser(userId) {
    if (confirm(`Are you sure you want to delete user with ID ${userId}?`)) {
        usersRepository.deleteById(userId);
        view.renderView('users');
    }
}
function delUser() {
    // This function is currently not used, as delete is handled by the button click
    // formController.delUserData();
    // view.renderView('users');
}
function addApiary() {
    const result = formController.addApiaryData();
    if (result) {
        view.renderView('apiaries');
        clearApiaryForm(); // Clear form after add/edit
    }
}
function deleteApiary(apiaryId) {
    if (confirm(`Are you sure you want to delete apiary with ID ${apiaryId}?`)) {
        apiariesRepository.removeById(apiaryId);
        view.renderView('apiaries');
    }
}
function addHive() {
    const result = formController.addHiveData();
    if (result) {
        view.renderView('hives');
        clearHiveForm(); // Clear form after add/edit
    }
}
function deleteHive(hiveId) {
    if (confirm(`Are you sure you want to delete hive with ID ${hiveId}?`)) {
        hivesRepository.removeById(hiveId);
        view.renderView('hives');
    }
}
function addColony() {
    const result = formController.addColonyData();
    if (result) {
        view.renderView('colonies');
        clearColonyForm(); // Clear form after add/edit
    }
}
function deleteColony(colonyId) {
    if (confirm(`Are you sure you want to delete colony with ID ${colonyId}?`)) {
        coloniesRepository.removeById(colonyId);
        view.renderView('colonies');
    }
}
function addQueen() {
    const result = formController.addQueenData();
    if (result) {
        view.renderView('queens');
        clearQueenForm(); // Clear form after add/edit
    }
}
function deleteQueen(queenId) {
    if (confirm(`Are you sure you want to delete queen with ID ${queenId}?`)) {
        queensRepository.removeById(queenId);
        view.renderView('queens');
    }
}
function addInspection() {
    const result = formController.addInspectionData();
    if (result) {
        view.renderView('inspections');
        clearInspectionForm(); // Clear form after add/edit
    }
}
function deleteInspection(inspectionId) {
    if (confirm(`Are you sure you want to delete inspection with ID ${inspectionId}?`)) {
        inspectionsRepository.removeById(inspectionId);
        view.renderView('inspections');
    }
}
function userExists(user_id) {
    return usersRepository.allRecords.some((user) => user.user_id === user_id);
}
function apiaryExists(apiary_id) {
    return apiariesRepository.allRecords.some((apiary) => apiary.apiary_id === apiary_id);
}
function hiveExists(hive_id) {
    return hivesRepository.allRecords.some((hive) => hive.hive_id === hive_id);
}
function colonyExists(colony_id) {
    return coloniesRepository.allRecords.some((colony) => colony.colony_id === colony_id);
}
function init() {
    view.renderAll();
}
document.addEventListener('DOMContentLoaded', function () {
    init();
});
