// Interfaces

// Models
interface NewUser {
  email: string;
  password: string;
}

interface User extends NewUser {
  index: number;
  user_id: number;
  timestamp: Date;
}

interface NewApiary {
  apiary_name: string;
  user_id: number;
}

interface ApiaryInterface extends NewApiary {
  index: number;
  apiary_id: number;
}

interface NewHive {
  hive_name: string;
  apiary_id: number;
}

interface HiveInterface extends NewHive {
  hive_id: number;
  index: number;
}

interface NewColony {
  colony_name: string;
  hive_id: number;
}

interface ColonyInterface extends NewColony {
  colony_id: number;
  index: number;
}

interface NewQueen {
  queen_name: string;
  queenright: boolean;
  marked: string;
  clipped: boolean;
  colony_id: number;
}

interface QueenInterface extends NewQueen {
  index: number;
  queen_id: number;
}

interface NewInspection {
  timestamp: Date;
  apiary_id: number;
  colony_id: number;
  queen_cups: number;
  brood_frames: number;
  store_frames: number;
  room_frames: number;
  health: string;
  varroa: number;
  temper: number;
  feed: number;
  supers: number;
  weather: string;
  user_id: number;
}

interface Inspection extends Omit<NewInspection, 'timestamp'> {
  index: number;
  inspection_id: number;
  timestamp: Date;
}

// Lists

interface UsersList {
  users: UserAccount[];
  addUser(newUser: NewUser): UserAccount;
}

interface ApiariesList {
  apiaries: Apiary[];
  addApiary(newApiary: NewApiary): Apiary;
}

interface HivesList {
  hives: Hive[];
  addHive(newHive: NewHive): Hive;
}

interface ColoniesList {
  colonies: Colony[];
  addColony(newColony: NewColony): Colony;
}

interface QueensList {
  queens: Queen[];
  addQueen(newQueen: NewQueen): Queen;
}

interface RecordsList {
  records: InspectionRecord[];
  addRecord(newInspection: NewInspection): InspectionRecord;
}

// Data Classes

class UserAccount implements NewUser {
  #user_id: number = 0;
  #email: string = '';
  #password: string = '';
  #timestamp: Date = new Date();

  constructor(
    user_id: number,
    email: string,
    password: string,
    timestamp: Date,
  ) {
    this.user_id = user_id;
    this.email = email;
    this.password = password;
    this.timestamp = timestamp;
  }
  set user_id(user_id: number) {
    this.#user_id = user_id;
  }
  set email(email: string) {
    this.#email = email;
  }
  set password(password: string) {
    this.#password = password;
  }
  set timestamp(timestamp: Date) {
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
  toObject(index: number): User {
    return {
      index,
      user_id: this.user_id,
      email: this.email,
      password: this.password,
      timestamp: this.timestamp,
    };
  }
}

class Apiary implements NewApiary {
  apiary_id: number;
  apiary_name: string;
  user_id: number;
  constructor(apiary_id: number, apiary_name: string, user_id: number) {
    this.apiary_id = apiary_id;
    this.apiary_name = apiary_name;
    this.user_id = user_id;
  }
  toObject(index: number): ApiaryInterface {
    return {
      index,
      apiary_id: this.apiary_id,
      apiary_name: this.apiary_name,
      user_id: this.user_id,
    };
  }
}

class Hive implements NewHive {
  hive_id: number;
  hive_name: string;
  apiary_id: number;

  constructor(hive_id: number, hive_name: string, apiary_id: number) {
    this.hive_id = hive_id;
    this.hive_name = hive_name;
    this.apiary_id = apiary_id;
  }

  toObject(index: number): HiveInterface {
    return {
      index,
      hive_id: this.hive_id,
      hive_name: this.hive_name,
      apiary_id: this.apiary_id,
    };
  }
}

class Colony implements NewColony {
  colony_id: number;
  colony_name: string;
  hive_id: number;

  constructor(colony_id: number, colony_name: string, hive_id: number) {
    this.colony_id = colony_id;
    this.colony_name = colony_name;
    this.hive_id = hive_id;
  }

  toObject(index: number): ColonyInterface {
    return {
      index,
      colony_id: this.colony_id,
      colony_name: this.colony_name,
      hive_id: this.hive_id,
    };
  }
}

class Queen implements NewQueen {
  queen_id: number;
  queen_name: string;
  queenright: boolean;
  marked: string;
  clipped: boolean;
  colony_id: number;

  constructor(
    queen_id: number,
    queen_name: string,
    queenright: boolean,
    marked: string,
    clipped: boolean,
    colony_id: number,
  ) {
    this.queen_id = queen_id;
    this.queen_name = queen_name;
    this.queenright = queenright;
    this.marked = marked;
    this.clipped = clipped;
    this.colony_id = colony_id;
  }

  toObject(index: number): QueenInterface {
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

class InspectionRecord implements NewInspection {
  inspection_id: number;
  timestamp: Date;
  apiary_id: number;
  colony_id: number;
  queen_cups: number;
  brood_frames: number;
  store_frames: number;
  room_frames: number;
  health: string;
  varroa: number;
  temper: number;
  feed: number;
  supers: number;
  weather: string;
  user_id: number;

  constructor(
    inspection_id: number,
    timestamp: Date,
    apiary_id: number,
    colony_id: number,
    queen_cups: number,
    brood_frames: number,
    store_frames: number,
    room_frames: number,
    health: string,
    varroa: number,
    temper: number,
    feed: number,
    supers: number,
    weather: string,
    user_id: number,
  ) {
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
  toObject(index: number): Inspection {
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

class Users implements UsersList {
  users: UserAccount[] = [];

  addUser(newUser: NewUser): UserAccount {
    const user_id: number = Math.floor(Math.random() * 100);
    const timestamp: Date = new Date();
    const user: UserAccount = new UserAccount(
      user_id,
      newUser.email,
      newUser.password,
      timestamp,
    );
    this.users.push(user);
    return user;
  }
}

class Apiaries implements ApiariesList {
  apiaries: Apiary[] = [];

  addApiary(newApiary: NewApiary): Apiary {
    const apiary_id: number = Math.floor(Math.random() * 100);
    const apiary_name: string = newApiary.apiary_name;
    const user_id: number = newApiary.user_id;
    const apiary: Apiary = new Apiary(apiary_id, apiary_name, user_id);
    this.apiaries.push(apiary);
    return apiary;
  }
}

class Hives implements HivesList {
  hives: Hive[] = [];

  addHive(newHive: NewHive): Hive {
    const hive_id = Math.floor(Math.random() * 100);
    const hive = new Hive(hive_id, newHive.hive_name, newHive.apiary_id);
    this.hives.push(hive);
    return hive;
  }
}

class Colonies implements ColoniesList {
  colonies: Colony[] = [];

  addColony(newColony: NewColony): Colony {
    const colony_id = Math.floor(Math.random() * 100);
    const colony = new Colony(
      colony_id,
      newColony.colony_name,
      newColony.hive_id,
    );
    this.colonies.push(colony);
    return colony;
  }
}

class Queens implements QueensList {
  queens: Queen[] = [];

  addQueen(newQueen: NewQueen): Queen {
    const queen_id = Math.floor(Math.random() * 100);
    const queen = new Queen(
      queen_id,
      newQueen.queen_name,
      newQueen.queenright,
      newQueen.marked,
      newQueen.clipped,
      newQueen.colony_id,
    );
    this.queens.push(queen);
    return queen;
  }
}

class Records implements RecordsList {
  records: InspectionRecord[] = [];

  addRecord(newInspection: NewInspection): InspectionRecord {
    const inspection_id: number = Math.floor(Math.random() * 100);
    const inspection: InspectionRecord = new InspectionRecord(
      inspection_id,
      newInspection.timestamp,
      newInspection.apiary_id,
      newInspection.colony_id,
      newInspection.queen_cups,
      newInspection.brood_frames,
      newInspection.store_frames,
      newInspection.room_frames,
      newInspection.health,
      newInspection.varroa,
      newInspection.temper,
      newInspection.feed,
      newInspection.supers,
      newInspection.weather,
      newInspection.user_id,
    );
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
    const emailInput = document.getElementById(
      'email_input',
    ) as HTMLInputElement;
    if (!emailInput) throw new Error('Email input not found');
    const email = emailInput.value;

    const passwordInput = document.getElementById(
      'password_input',
    ) as HTMLInputElement;
    if (!passwordInput) throw new Error('password input not found');
    const password = passwordInput.value;

    return userList.addUser({ email: email, password: password });
  },

  updateUserData() {
    const indexInput = document.getElementById(
      'index_update',
    ) as HTMLInputElement;
    if (!indexInput) throw new Error('Index input not found');
    const index = parseInt(indexInput.value);

    const emailInput = document.getElementById(
      'email_update',
    ) as HTMLInputElement;
    if (!emailInput) throw new Error('Email input not found');
    const email = emailInput.value;

    const passwordInput = document.getElementById(
      'password_update',
    ) as HTMLInputElement;
    if (!passwordInput) throw new Error('password input not found');
    const password = passwordInput.value;

    if (email) userList.users[index].email = email;
    if (password) userList.users[index].password = password;
  },

  delUserData() {
    const indexInput = document.getElementById(
      'index_input',
    ) as HTMLInputElement;
    if (!indexInput) throw new Error('Index input not found');
    const index = parseInt(indexInput.value);
    return userList.users.splice(index, 1);
  },

  addRecordData() {
    const timestampInput = document.getElementById(
      'timestamp_input',
    ) as HTMLInputElement;
    if (!timestampInput) throw new Error('timestamp input not found');
    const timestamp = new Date(timestampInput.value);

    const apiary_idInput = document.getElementById(
      'apiary_id_input',
    ) as HTMLInputElement;
    if (!apiary_idInput) throw new Error('apiary_id input not found');
    const apiary_id = parseInt(apiary_idInput.value);

    const colony_idInput = document.getElementById(
      'colony_id_input',
    ) as HTMLInputElement;
    if (!colony_idInput) throw new Error('colony_id input not found');
    const colony_id = parseInt(colony_idInput.value);

    const queen_cupsInput = document.getElementById(
      'queen_cups_input',
    ) as HTMLInputElement;
    if (!queen_cupsInput) throw new Error('queen_cups input not found');
    const queen_cups = parseInt(queen_cupsInput.value);

    const brood_framesInput = document.getElementById(
      'brood_frames_input',
    ) as HTMLInputElement;
    if (!brood_framesInput) throw new Error('brood_frames input not found');
    const brood_frames = parseInt(brood_framesInput.value);

    const store_framesInput = document.getElementById(
      'store_frames_input',
    ) as HTMLInputElement;
    if (!store_framesInput) throw new Error('store_frames input not found');
    const store_frames = parseInt(store_framesInput.value);

    const room_framesInput = document.getElementById(
      'room_frames_input',
    ) as HTMLInputElement;
    if (!room_framesInput) throw new Error('room_frames input not found');
    const room_frames = parseInt(room_framesInput.value);

    const healthInput = document.getElementById(
      'health_input',
    ) as HTMLInputElement;
    if (!healthInput) throw new Error('health input not found');
    const health = healthInput.value;

    const varroaInput = document.getElementById(
      'varroa_input',
    ) as HTMLInputElement;
    if (!varroaInput) throw new Error('varroa input not found');
    const varroa = parseInt(varroaInput.value);

    const temperInput = document.getElementById(
      'temper_input',
    ) as HTMLInputElement;
    if (!temperInput) throw new Error('temper input not found');
    const temper = parseInt(temperInput.value);

    const feedInput = document.getElementById('feed_input') as HTMLInputElement;
    if (!feedInput) throw new Error('feed input not found');
    const feed = parseInt(feedInput.value);

    const supersInput = document.getElementById(
      'supers_input',
    ) as HTMLInputElement;
    if (!supersInput) throw new Error('supers input not found');
    const supers = parseInt(supersInput.value);

    const weatherInput = document.getElementById(
      'weather_input',
    ) as HTMLInputElement;
    if (!weatherInput) throw new Error('weather input not found');
    const weather = weatherInput.value;

    const user_idInput = document.getElementById(
      'user_id_input',
    ) as HTMLInputElement;
    if (!user_idInput) throw new Error('user_id input not found');
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
    const apiaryNameInput = document.getElementById(
      'apiary_name_input',
    ) as HTMLInputElement;
    if (!apiaryNameInput) throw new Error('Apiary name input not found');
    const apiary_name = apiaryNameInput.value;

    const userIdInput = document.getElementById(
      'user_id_input',
    ) as HTMLInputElement;
    if (!userIdInput) throw new Error('User_id input not found');
    const user_id = parseInt(userIdInput.value);

    return apiaryList.addApiary({ apiary_name: apiary_name, user_id: user_id });
  },

  addHiveData() {
    const hiveNameInput = document.getElementById(
      'hive_name_input',
    ) as HTMLInputElement;
    if (!hiveNameInput) throw new Error('Hive name input not found');
    const hive_name = hiveNameInput.value;

    const apiaryIdInput = document.getElementById(
      'apiary_id_input',
    ) as HTMLInputElement;
    if (!apiaryIdInput) throw new Error('hive ID input not found');
    const apiary_id = parseInt(apiaryIdInput.value);

    return hivesList.addHive({ hive_name, apiary_id });
  },

  addColonyData() {
    const colonyNameInput = document.getElementById(
      'colony_name_input',
    ) as HTMLInputElement;
    if (!colonyNameInput) throw new Error('Colony name input not found');
    const colony_name = colonyNameInput.value;

    const hiveIdInput = document.getElementById(
      'hive_id_input',
    ) as HTMLInputElement;
    if (!hiveIdInput) throw new Error('hive ID input not found');
    const hive_id = parseInt(hiveIdInput.value);

    return coloniesList.addColony({ colony_name, hive_id });
  },

  addQueenData() {
    const queenNameInput = document.getElementById(
      'queen_name_input',
    ) as HTMLInputElement;
    if (!queenNameInput) throw new Error('Queen name input not found');
    const queen_name = queenNameInput.value;

    const queenrightInput = document.getElementById(
      'queenright_input',
    ) as HTMLInputElement;
    if (!queenrightInput) throw new Error('queenright input not found');
    const queenright = queenrightInput.checked;

    const queen_markedInput = document.getElementById(
      'queen_marked_input',
    ) as HTMLInputElement;
    if (!queen_markedInput) throw new Error('queen_marked input not found');
    const marked = queen_markedInput.value;

    const queen_clippedInput = document.getElementById(
      'queen_clipped_input',
    ) as HTMLInputElement;
    if (!queen_clippedInput) throw new Error('queen_clipped input not found');
    const clipped = queen_clippedInput.checked;

    const colonyIdInput = document.getElementById(
      'colony_id_input',
    ) as HTMLInputElement;
    if (!colonyIdInput) throw new Error('colony ID input not found');
    const colony_id = parseInt(colonyIdInput.value);

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

function add() {
  formController.getUserData();
  updateUserView();
}

function update() {
  formController.updateUserData();
  updateUserView();
}

function del() {
  formController.delUserData();
  updateUserView();
}

function updateUserView() {
  const table = document.getElementById('users-table') as HTMLTableElement;
  const headerRow = document.getElementById(
    'users-header-row',
  ) as HTMLTableRowElement;
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
  const table = document.getElementById('apiaries-table') as HTMLTableElement;
  const headerRow = document.getElementById(
    'apiaries-header-row',
  ) as HTMLTableRowElement;
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
  const table = document.getElementById('hives-table') as HTMLTableElement;
  const headerRow = document.getElementById(
    'hives-header-row',
  ) as HTMLTableRowElement;
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
  const table = document.getElementById('colonies-table') as HTMLTableElement;
  const headerRow = document.getElementById(
    'colonies-header-row',
  ) as HTMLTableRowElement;

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
  const table = document.getElementById('queens-table') as HTMLTableElement;
  const headerRow = document.getElementById(
    'queens-header-row',
  ) as HTMLTableRowElement;

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
  const userAddInput = document.getElementById(
    'user_add_form',
  ) as HTMLFormElement;
  if (userAddInput) {
    userAddInput.reset();
  }

  const table = document.getElementById('records-table') as HTMLTableElement;
  const headerRow = document.getElementById(
    'records-header-row',
  ) as HTMLTableRowElement;
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
  const userAddForm = document.getElementById(
    'user_add_form',
  ) as HTMLFormElement;
  if (userAddForm) {
    userAddForm.addEventListener('submit', (event) => {
      event.preventDefault();
      add();
      userAddForm.reset();
    });
  }

  const userUpdateForm = document.getElementById(
    'user_update_form',
  ) as HTMLFormElement;
  if (userUpdateForm) {
    userUpdateForm.addEventListener('submit', (event) => {
      event.preventDefault();
      update();
      userUpdateForm.reset();
    });
  }

  const userDelForm = document.getElementById(
    'user_del_form',
  ) as HTMLFormElement;
  if (userDelForm) {
    userDelForm.addEventListener('submit', (event) => {
      event.preventDefault();
      del();
      userDelForm.reset();
    });
  }

  // RECORDS
  const recordAddForm = document.getElementById(
    'record_add_form',
  ) as HTMLFormElement;
  if (recordAddForm) {
    recordAddForm.addEventListener('submit', (event) => {
      event.preventDefault();
      addRecord();
      recordAddForm.reset();
    });
  }

  // Apiaries
  const apiaryAddForm = document.getElementById(
    'apiary_add_form',
  ) as HTMLFormElement;
  if (apiaryAddForm) {
    apiaryAddForm.addEventListener('submit', (event) => {
      event.preventDefault();
      addApiary();
      apiaryAddForm.reset();
    });
  }

  // Hives
  const hiveAddForm = document.getElementById(
    'hive_add_form',
  ) as HTMLFormElement;
  if (hiveAddForm) {
    hiveAddForm.addEventListener('submit', (event) => {
      event.preventDefault();
      addHive();
      hiveAddForm.reset();
    });
  }

  // Colonies
  const colonyAddForm = document.getElementById(
    'colony_add_form',
  ) as HTMLFormElement;
  if (colonyAddForm) {
    colonyAddForm.addEventListener('submit', (event) => {
      event.preventDefault();
      addColony();
      colonyAddForm.reset();
    });
  }

  // Queens
  const queenAddForm = document.getElementById(
    'queen_add_form',
  ) as HTMLFormElement;
  if (queenAddForm) {
    queenAddForm.addEventListener('submit', (event) => {
      event.preventDefault();
      addQueen();
      queenAddForm.reset();
    });
  }
});
