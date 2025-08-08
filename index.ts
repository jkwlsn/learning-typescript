// Interfaces
interface NewUser {
  email: string;
  password: string;
}

interface User extends NewUser {
  user_id: number;
  timestamp: Date;
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

interface Inspection extends NewInspection {
  inspection_id: number;
}

class UserAccount {
  user_id: number;
  email: string;
  password: string;
  timestamp: Date;

  constructor(user_id: number, email: string, password: string, date: Date) {
    this.user_id = user_id;
    this.email = email;
    this.password = password;
    this.timestamp = date;
  }
}

class InspectionRecord {
  inspection_id: number;
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
    this.timestamp = timestamp;
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

function addUser(newUser: NewUser): User {
  const user_id: number = Math.floor(Math.random() * 100);
  const date: Date = new Date();
  const timestamp = date;
  const user: User = new UserAccount(
    user_id,
    newUser.email,
    newUser.password,
    timestamp,
  );
  console.log(user);
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
  console.log(inspection);
  return inspection;
}

const user1 = addUser({ email: 'jake@example.com', password: 'testpassword' });
addUser({ email: 'alice@example.com', password: 'testpassword' });
addUser({ email: 'bob@example.com', password: 'testpassword' });

const inspection1 = addInspectionRecord({
  timestamp: new Date(),
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
