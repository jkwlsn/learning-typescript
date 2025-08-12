// Interfaces

interface UsersList {
  users: User[];
  addUser(newUser: NewUser): UserAccount;
}

interface RecordsList {
  records: InspectionRecord[];
  addRecord(newInspection: NewInspection): InspectionRecord;
}

interface NewUser {
  email: string;
  password: string;
}

interface NewInspection {
  timestamp: Date;
  apiary_id: number;
  colony_id: number;
  queenright: boolean;
  queen_marked: 'white' | 'yellow' | 'red' | 'green' | 'blue';
  queen_clipped: boolean;
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

interface User extends NewUser {
  user_id: number;
  timestamp: string;
}

interface Inspection extends Omit<NewInspection, 'timestamp'> {
  inspection_id: number;
  timestamp: string;
}

class UserAccount implements NewUser {
  #user_id: number = 0;
  #email: string = '';
  #password: string = '';
  #timestamp: string = '';

  constructor(
    user_id: number,
    email: string,
    password: string,
    timestamp: Date,
  ) {
    this.user_id = user_id;
    this.email = email;
    this.password = password;
    this.timestamp = timestamp.toISOString();
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
  set timestamp(timestamp: string) {
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
  toObject(index: number) {
    return {
      index,
      user_id: this.user_id,
      email: this.email,
      password: this.password,
      timestamp: this.timestamp,
    };
  }
}

class InspectionRecord implements Inspection {
  inspection_id: number;
  timestamp: string;
  apiary_id: number;
  colony_id: number;
  queenright: boolean;
  queen_marked: 'white' | 'yellow' | 'red' | 'green' | 'blue';
  queen_clipped: boolean;
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
    queenright: boolean,
    queen_marked: 'white' | 'yellow' | 'red' | 'green' | 'blue',
    queen_clipped: boolean,
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

class Records implements RecordsList {
  records: InspectionRecord[] = [];

  addRecord(newInspection: NewInspection): InspectionRecord {
    const inspection_id: number = Math.floor(Math.random() * 100);
    const inspection: InspectionRecord = new InspectionRecord(
      inspection_id,
      newInspection.timestamp,
      newInspection.apiary_id,
      newInspection.colony_id,
      newInspection.queenright,
      newInspection.queen_marked,
      newInspection.queen_clipped,
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

const userList = new Users();
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
};

// Controller
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
  const userAddInput = document.getElementById(
    'user_add_form',
  ) as HTMLFormElement;
  if (userAddInput) {
    userAddInput.reset();
  }

  const userUpdateInput = document.getElementById(
    'user_update_form',
  ) as HTMLFormElement;
  if (userUpdateInput) {
    userUpdateInput.reset();
  }

  const userDelInput = document.getElementById(
    'user_del_form',
  ) as HTMLFormElement;
  if (userDelInput) {
    userDelInput.reset();
  }

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
        <td>${obj.email}</td>
        <td>${obj.password}</td>
        <td>${obj.timestamp}</td>
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
    });
  }

  const userUpdateForm = document.getElementById(
    'user_update_form',
  ) as HTMLFormElement;
  if (userUpdateForm) {
    userUpdateForm.addEventListener('submit', (event) => {
      event.preventDefault();
      update();
    });
  }

  const userDelForm = document.getElementById(
    'user_del_form',
  ) as HTMLFormElement;
  if (userDelForm) {
    userDelForm.addEventListener('submit', (event) => {
      event.preventDefault();
      del();
    });
  }
});
