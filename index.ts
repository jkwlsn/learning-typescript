'use strict';
const now = new Date();

// Interfaces

interface UsersList {
  users: User[];
  addUser(user: User): void;
}

interface RecordsList {
  records: InspectionRecord[];
  addRecord(record: InspectionRecord): void;
}

interface NewUser {
  email: string;
  password: string;
}

interface User extends NewUser {
  user_id: number;
  timestamp: string;
}

interface NewInspection {
  timestamp: Date;
  apiary_id: number;
  colony_id: number;
  queenright: boolean;
  queen_marked: string;
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

interface Inspection extends Omit<NewInspection, 'timestamp'> {
  inspection_id: number;
  timestamp: string;
}

class UserAccount implements NewUser {
  user_id: number;
  email: string;
  password: string;
  timestamp: string;

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
}

class InspectionRecord implements Inspection {
  inspection_id: number;
  timestamp: string;
  apiary_id: number;
  colony_id: number;
  queenright: boolean;
  queen_marked: string;
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
    queen_marked: string,
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

class Records implements RecordsList {
  records: InspectionRecord[] = [];

  addRecord(record: InspectionRecord): void {
    this.records.push(record);
  }
}

class Users implements UsersList {
  users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }
}

function addUser(newUser: NewUser): User {
  const user_id: number = Math.floor(Math.random() * 100);
  const timestamp: Date = now;
  const user: User = new UserAccount(
    user_id,
    newUser.email,
    newUser.password,
    timestamp,
  );
  return user;
}

function addInspectionRecord(newInspection: NewInspection): Inspection {
  const inspection_id: number = Math.floor(Math.random() * 100);
  const inspection: Inspection = new InspectionRecord(
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
  return inspection;
}

const user1 = addUser({ email: 'jake@example.com', password: 'testpassword' });
const user2 = addUser({ email: 'alice@example.com', password: 'testpassword' });
const user3 = addUser({ email: 'bob@example.com', password: 'testpassword' });

const inspection1 = addInspectionRecord({
  timestamp: now,
  apiary_id: 1,
  colony_id: 1,
  queenright: true,
  queen_marked: 'Yellow',
  queen_clipped: true,
  queen_cups: 2,
  brood_frames: 5,
  store_frames: 6,
  room_frames: 1,
  health: 'good',
  varroa: 10,
  temper: 5,
  feed: 1,
  supers: 3,
  weather: 'fine',
  user_id: user1.user_id,
});

const inspection2 = addInspectionRecord({
  timestamp: now,
  apiary_id: 1,
  colony_id: 1,
  queenright: true,
  queen_marked: 'Yellow',
  queen_clipped: true,
  queen_cups: 2,
  brood_frames: 5,
  store_frames: 6,
  room_frames: 1,
  health: 'good',
  varroa: 10,
  temper: 5,
  feed: 1,
  supers: 3,
  weather: 'fine',
  user_id: user2.user_id,
});

const inspection3 = addInspectionRecord({
  timestamp: now,
  apiary_id: 1,
  colony_id: 1,
  queenright: true,
  queen_marked: 'Yellow',
  queen_clipped: true,
  queen_cups: 2,
  brood_frames: 5,
  store_frames: 6,
  room_frames: 1,
  health: 'good',
  varroa: 10,
  temper: 5,
  feed: 1,
  supers: 3,
  weather: 'fine',
  user_id: user3.user_id,
});

const userList = new Users();
const recordsList = new Records();

userList.addUser(user1);
userList.addUser(user2);
userList.addUser(user3);

recordsList.addRecord(inspection1);
recordsList.addRecord(inspection2);
recordsList.addRecord(inspection3);

console.table(userList.users);
console.table(recordsList.records);
