// Define constants for your storage keys to avoid magic strings
const STORAGE_KEYS = {
  USERS: 'users',
  APIARIES: 'apiaries',
  HIVES: 'hives',
  COLONIES: 'colonies',
  QUEENS: 'queens',
  INSPECTIONS: 'inspections',
};

// A generic interface for any of your collection classes
interface Storable {
  records: any[];
  nextId: number;
}

class StorageService {
  // Save any of your data collections
  save(key: string, data: Storable): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving data for key "${key}":`, error);
    }
  }

  // Load any of your data collections
  load(key: string): Storable | null {
    try {
      const data = localStorage.getItem(key);
      if (data === null) {
        return null;
      }
      return JSON.parse(data) as Storable;
    } catch (error) {
      console.error(`Error loading data for key "${key}":`, error);
      return null;
    }
  }
}

// Create a single instance to be used throughout the app
const storageService = new StorageService();

// Interfaces

// Models
interface NewUserModel {
  email: string;
  password: string;
}

interface UserModel extends NewUserModel {
  user_id: number;
  timestamp: Date;
}

interface NewApiaryModel {
  apiary_name: string;
  user_id: number;
}

interface ApiaryModel extends NewApiaryModel {
  apiary_id: number;
}

interface NewHiveModel {
  hive_name: string;
  apiary_id: number;
}

interface HiveModel extends NewHiveModel {
  hive_id: number;
}

interface NewColonyModel {
  colony_name: string;
  hive_id: number;
}

interface ColonyModel extends NewColonyModel {
  colony_id: number;
}

interface NewQueenModel {
  queen_name: string;
  marked: string;
  clipped: boolean;
  colony_id: number;
}

interface QueenModel extends NewQueenModel {
  queen_id: number;
}

interface NewInspectionModel {
  timestamp: Date;
  apiary_id: number;
  colony_id: number;
  queenright: boolean;
  bias: boolean;
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

interface InspectionModel extends NewInspectionModel {
  inspection_id: number;
}

// Lists

interface UsersList {
  records: UserModel[];
  addUser(newUser: NewUserModel): UserModel;
}

interface ApiariesList {
  records: ApiaryModel[];
  addApiary(newApiary: NewApiaryModel): ApiaryModel;
}

interface HivesList {
  records: HiveModel[];
  addHive(newHive: NewHiveModel): HiveModel;
}

interface ColoniesList {
  records: ColonyModel[];
  addColony(newColony: NewColonyModel): ColonyModel;
}

interface QueensList {
  records: QueenModel[];
  addQueen(newQueen: NewQueenModel): QueenModel;
}

interface InspectionsList {
  records: InspectionModel[];
  addInspection(newInspection: NewInspectionModel): InspectionModel;
}

// Data Classes

class User implements UserModel {
  user_id = 0;
  email = '';
  password = '';
  timestamp: Date = new Date();

  constructor({ user_id, email, password, timestamp }: UserModel) {
    this.user_id = user_id;
    this.email = email;
    this.password = password;
    this.timestamp = new Date(timestamp); // Ensure timestamp is a Date object
  }
  toObject(): UserModel {
    return {
      user_id: this.user_id,
      email: this.email,
      password: this.password,
      timestamp: this.timestamp,
    };
  }
}

class Apiary implements ApiaryModel {
  apiary_id: number;
  apiary_name: string;
  user_id: number;
  constructor({ apiary_id, apiary_name, user_id }: ApiaryModel) {
    this.apiary_id = apiary_id;
    this.apiary_name = apiary_name;
    this.user_id = user_id;
  }
  toObject(): ApiaryModel {
    return {
      apiary_id: this.apiary_id,
      apiary_name: this.apiary_name,
      user_id: this.user_id,
    };
  }
}

class Hive implements HiveModel {
  hive_id: number;
  hive_name: string;
  apiary_id: number;

  constructor({ hive_id, hive_name, apiary_id }: HiveModel) {
    this.hive_id = hive_id;
    this.hive_name = hive_name;
    this.apiary_id = apiary_id;
  }

  toObject(): HiveModel {
    return {
      hive_id: this.hive_id,
      hive_name: this.hive_name,
      apiary_id: this.apiary_id,
    };
  }
}

class Colony implements ColonyModel {
  colony_id: number;
  colony_name: string;
  hive_id: number;

  constructor({ colony_id, colony_name, hive_id }: ColonyModel) {
    this.colony_id = colony_id;
    this.colony_name = colony_name;
    this.hive_id = hive_id;
  }

  toObject(): ColonyModel {
    return {
      colony_id: this.colony_id,
      colony_name: this.colony_name,
      hive_id: this.hive_id,
    };
  }
}

class Queen implements QueenModel {
  queen_id: number;
  queen_name: string;
  marked: string;
  clipped: boolean;
  colony_id: number;

  constructor({
    queen_id,
    queen_name,
    marked,
    clipped,
    colony_id,
  }: QueenModel) {
    this.queen_id = queen_id;
    this.queen_name = queen_name;
    this.marked = marked;
    this.clipped = clipped;
    this.colony_id = colony_id;
  }

  toObject(): QueenModel {
    return {
      queen_id: this.queen_id,
      queen_name: this.queen_name,
      marked: this.marked,
      clipped: this.clipped,
      colony_id: this.colony_id,
    };
  }
}

class Inspection implements InspectionModel {
  inspection_id: number;
  timestamp: Date;
  apiary_id: number;
  colony_id: number;
  queenright: boolean;
  bias: boolean;
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

  constructor({
    inspection_id,
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
  }: InspectionModel) {
    this.inspection_id = inspection_id;
    this.timestamp = new Date(timestamp); // Ensure timestamp is a Date object
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
  toObject(): InspectionModel {
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

// --- Data Management Classes (SRP: Manages in-memory state) ---

class Users implements UsersList {
  nextId = 1;
  records: User[] = [];

  addUser(newUser: NewUserModel): User {
    const user_id: number = this.nextId++;
    const timestamp: Date = new Date();
    const user: User = new User({
      user_id: user_id,
      email: newUser.email,
      password: newUser.password,
      timestamp: timestamp,
    });
    this.records.push(user);
    return user;
  }

  getById(user_id: number): User | undefined {
    return this.records.find((user) => user.user_id === user_id);
  }

  getByEmail(email: string): User | undefined {
    return this.records.find((user) => user.email === email);
  }

  deleteById(user_id: number): boolean {
    const index = this.records.findIndex((user) => user.user_id === user_id);
    if (index === -1) return false;
    this.records.splice(index, 1);
    return true;
  }
}

class Apiaries implements ApiariesList {
  nextId = 1;
  records: Apiary[] = [];

  addApiary(newApiary: NewApiaryModel): Apiary {
    const apiary_id: number = this.nextId++;
    const apiary: Apiary = new Apiary({
      apiary_id: apiary_id,
      apiary_name: newApiary.apiary_name,
      user_id: newApiary.user_id,
    });
    this.records.push(apiary);
    return apiary;
  }

  getById(apiary_id: number): Apiary | undefined {
    return this.records.find((apiary) => apiary.apiary_id === apiary_id);
  }

  getByUserId(user_id: number): Apiary[] | [] {
    return this.records.filter((user) => user.user_id === user_id);
  }

  removeById(apiary_id: number): boolean {
    const index = this.records.findIndex(
      (apiary) => apiary.apiary_id === apiary_id,
    );
    if (index === -1) return false;
    this.records.splice(index, 1);
    return true;
  }
}

class Hives implements HivesList {
  nextId = 1;
  records: Hive[] = [];

  addHive(newHive: NewHiveModel): Hive {
    const hive_id = this.nextId++;
    const hive: Hive = new Hive({
      hive_id: hive_id,
      hive_name: newHive.hive_name,
      apiary_id: newHive.apiary_id,
    });
    this.records.push(hive);
    return hive;
  }

  getById(hive_id: number): Hive | undefined {
    return this.records.find((hive) => hive.hive_id === hive_id);
  }

  getByApiaryId(apiary_id: number): Hive[] | [] {
    return this.records.filter((apiary) => apiary.apiary_id === apiary_id);
  }

  removeById(hive_id: number): boolean {
    const index = this.records.findIndex((hive) => hive.hive_id === hive_id);
    if (index === -1) return false;
    this.records.splice(index, 1);
    return true;
  }
}

class Colonies implements ColoniesList {
  nextId = 1;
  records: Colony[] = [];

  addColony(newColony: NewColonyModel): Colony {
    const colony_id = this.nextId++;
    const colony: Colony = new Colony({
      colony_id: colony_id,
      colony_name: newColony.colony_name,
      hive_id: newColony.hive_id,
    });
    this.records.push(colony);
    return colony;
  }

  getById(colony_id: number): Colony | undefined {
    return this.records.find((colony) => colony.colony_id === colony_id);
  }

  getByHiveId(hive_id: number): Colony[] | [] {
    return this.records.filter((hive) => hive.hive_id === hive_id);
  }

  removeById(colony_id: number): boolean {
    const index = this.records.findIndex(
      (colony) => colony.colony_id === colony_id,
    );
    if (index === -1) return false;
    this.records.splice(index, 1);
    return true;
  }
}

class Queens implements QueensList {
  nextId = 1;
  records: Queen[] = [];

  addQueen(newQueen: NewQueenModel): Queen {
    const queen_id = this.nextId++;
    const queen: Queen = new Queen({
      queen_id: queen_id,
      queen_name: newQueen.queen_name,
      marked: newQueen.marked,
      clipped: newQueen.clipped,
      colony_id: newQueen.colony_id,
    });
    this.records.push(queen);
    return queen;
  }

  getById(queen_id: number): Queen | undefined {
    return this.records.find((queen) => queen.queen_id === queen_id);
  }

  getByColonyId(colony_id: number): Queen[] | [] {
    return this.records.filter((colony) => colony.colony_id === colony_id);
  }

  removeById(queen_id: number): boolean {
    const index = this.records.findIndex(
      (queen) => queen.queen_id === queen_id,
    );
    if (index === -1) return false;
    this.records.splice(index, 1);
    return true;
  }
}

class Inspections implements InspectionsList {
  nextId = 1;
  records: Inspection[] = [];

  addInspection(newInspection: NewInspectionModel): Inspection {
    const inspection_id: number = this.nextId++;
    const inspection: Inspection = new Inspection({
      inspection_id: inspection_id,
      ...newInspection,
    });
    this.records.push(inspection);
    return inspection;
  }

  getById(inspection_id: number): Inspection | undefined {
    return this.records.find(
      (inspection) => inspection.inspection_id === inspection_id,
    );
  }

  getByColonyId(colony_id: number): Inspection[] | [] {
    return this.records.filter((colony) => colony.colony_id === colony_id);
  }

  removeById(inspection_id: number): boolean {
    const index = this.records.findIndex(
      (inspection) => inspection.inspection_id === inspection_id,
    );
    if (index === -1) return false;
    this.records.splice(index, 1);
    return true;
  }
}

// --- Repository Classes (SRP: Manages persistence) ---

class UsersRepository {
  readonly usersCollection = new Users();

  constructor() {
    this.load();
  }

  private save(): void {
    storageService.save(STORAGE_KEYS.USERS, {
      records: this.usersCollection.records.map((user) => user.toObject()),
      nextId: this.usersCollection.nextId,
    });
  }

  private load(): void {
    const savedData = storageService.load(STORAGE_KEYS.USERS) as {
      records: UserModel[];
      nextId: number;
    } | null;
    if (savedData) {
      this.usersCollection.records = savedData.records.map(
        (data) => new User(data),
      );
      this.usersCollection.nextId = savedData.nextId;
    }
  }

  addUser(newUser: NewUserModel): User {
    const user = this.usersCollection.addUser(newUser);
    this.save();
    return user;
  }

  deleteById(user_id: number): boolean {
    const result = this.usersCollection.deleteById(user_id);
    if (result) {
      this.save();
    }
    return result;
  }

  getById(user_id: number): User | undefined {
    return this.usersCollection.getById(user_id);
  }

  getByEmail(email: string): User | undefined {
    return this.usersCollection.getByEmail(email);
  }

  get allRecords(): User[] {
    return this.usersCollection.records;
  }
}

class ApiariesRepository {
  readonly apiariesCollection = new Apiaries();

  constructor() {
    this.load();
  }

  private save(): void {
    storageService.save(STORAGE_KEYS.APIARIES, {
      records: this.apiariesCollection.records.map((r) => r.toObject()),
      nextId: this.apiariesCollection.nextId,
    });
  }

  private load(): void {
    const savedData = storageService.load(STORAGE_KEYS.APIARIES) as {
      records: ApiaryModel[];
      nextId: number;
    } | null;
    if (savedData) {
      this.apiariesCollection.records = savedData.records.map(
        (data) => new Apiary(data),
      );
      this.apiariesCollection.nextId = savedData.nextId;
    }
  }

  addApiary(newApiary: NewApiaryModel): Apiary {
    const apiary = this.apiariesCollection.addApiary(newApiary);
    this.save();
    return apiary;
  }

  removeById(apiary_id: number): boolean {
    const result = this.apiariesCollection.removeById(apiary_id);
    if (result) {
      this.save();
    }
    return result;
  }

  getById(apiary_id: number): Apiary | undefined {
    return this.apiariesCollection.getById(apiary_id);
  }

  getByUserId(user_id: number): Apiary[] {
    return this.apiariesCollection.getByUserId(user_id);
  }

  get allRecords(): Apiary[] {
    return this.apiariesCollection.records;
  }
}

class HivesRepository {
  readonly hivesCollection = new Hives();

  constructor() {
    this.load();
  }

  private save(): void {
    storageService.save(STORAGE_KEYS.HIVES, {
      records: this.hivesCollection.records.map((r) => r.toObject()),
      nextId: this.hivesCollection.nextId,
    });
  }

  private load(): void {
    const savedData = storageService.load(STORAGE_KEYS.HIVES) as {
      records: HiveModel[];
      nextId: number;
    } | null;
    if (savedData) {
      this.hivesCollection.records = savedData.records.map(
        (data) => new Hive(data),
      );
      this.hivesCollection.nextId = savedData.nextId;
    }
  }

  addHive(newHive: NewHiveModel): Hive {
    const hive = this.hivesCollection.addHive(newHive);
    this.save();
    return hive;
  }

  removeById(hive_id: number): boolean {
    const result = this.hivesCollection.removeById(hive_id);
    if (result) {
      this.save();
    }
    return result;
  }

  getById(hive_id: number): Hive | undefined {
    return this.hivesCollection.getById(hive_id);
  }

  getByApiaryId(apiary_id: number): Hive[] {
    return this.hivesCollection.getByApiaryId(apiary_id);
  }

  get allRecords(): Hive[] {
    return this.hivesCollection.records;
  }
}

class ColoniesRepository {
  readonly coloniesCollection = new Colonies();

  constructor() {
    this.load();
  }

  private save(): void {
    storageService.save(STORAGE_KEYS.COLONIES, {
      records: this.coloniesCollection.records.map((r) => r.toObject()),
      nextId: this.coloniesCollection.nextId,
    });
  }

  private load(): void {
    const savedData = storageService.load(STORAGE_KEYS.COLONIES) as {
      records: ColonyModel[];
      nextId: number;
    } | null;
    if (savedData) {
      this.coloniesCollection.records = savedData.records.map(
        (data) => new Colony(data),
      );
      this.coloniesCollection.nextId = savedData.nextId;
    }
  }

  addColony(newColony: NewColonyModel): Colony {
    const colony = this.coloniesCollection.addColony(newColony);
    this.save();
    return colony;
  }

  removeById(colony_id: number): boolean {
    const result = this.coloniesCollection.removeById(colony_id);
    if (result) {
      this.save();
    }
    return result;
  }

  getById(colony_id: number): Colony | undefined {
    return this.coloniesCollection.getById(colony_id);
  }

  getByHiveId(hive_id: number): Colony[] {
    return this.coloniesCollection.getByHiveId(hive_id);
  }

  get allRecords(): Colony[] {
    return this.coloniesCollection.records;
  }
}

class QueensRepository {
  readonly queensCollection = new Queens();

  constructor() {
    this.load();
  }

  private save(): void {
    storageService.save(STORAGE_KEYS.QUEENS, {
      records: this.queensCollection.records.map((r) => r.toObject()),
      nextId: this.queensCollection.nextId,
    });
  }

  private load(): void {
    const savedData = storageService.load(STORAGE_KEYS.QUEENS) as {
      records: QueenModel[];
      nextId: number;
    } | null;
    if (savedData) {
      this.queensCollection.records = savedData.records.map(
        (data) => new Queen(data),
      );
      this.queensCollection.nextId = savedData.nextId;
    }
  }

  addQueen(newQueen: NewQueenModel): Queen {
    const queen = this.queensCollection.addQueen(newQueen);
    this.save();
    return queen;
  }

  removeById(queen_id: number): boolean {
    const result = this.queensCollection.removeById(queen_id);
    if (result) {
      this.save();
    }
    return result;
  }

  getById(queen_id: number): Queen | undefined {
    return this.queensCollection.getById(queen_id);
  }

  getByColonyId(colony_id: number): Queen[] {
    return this.queensCollection.getByColonyId(colony_id);
  }

  get allRecords(): Queen[] {
    return this.queensCollection.records;
  }
}

class InspectionsRepository {
  readonly inspectionsCollection = new Inspections();

  constructor() {
    this.load();
  }

  private save(): void {
    storageService.save(STORAGE_KEYS.INSPECTIONS, {
      records: this.inspectionsCollection.records.map((r) => r.toObject()),
      nextId: this.inspectionsCollection.nextId,
    });
  }

  private load(): void {
    const savedData = storageService.load(STORAGE_KEYS.INSPECTIONS) as {
      records: InspectionModel[];
      nextId: number;
    } | null;
    if (savedData) {
      this.inspectionsCollection.records = savedData.records.map(
        (data) => new Inspection(data),
      );
      this.inspectionsCollection.nextId = savedData.nextId;
    }
  }

  addInspection(newInspection: NewInspectionModel): Inspection {
    const inspection = this.inspectionsCollection.addInspection(newInspection);
    this.save();
    return inspection;
  }

  removeById(inspection_id: number): boolean {
    const result = this.inspectionsCollection.removeById(inspection_id);
    if (result) {
      this.save();
    }
    return result;
  }

  getById(inspection_id: number): Inspection | undefined {
    return this.inspectionsCollection.getById(inspection_id);
  }

  getByColonyId(colony_id: number): Inspection[] {
    return this.inspectionsCollection.getByColonyId(colony_id);
  }

  get allRecords(): Inspection[] {
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

// Form controller

// Utility functions

function validateNumber(value: string, fieldName: string): number {
  const num = parseInt(value);
  if (isNaN(num)) throw new Error(`${fieldName} must be a valid number`);
  return num;
}

function validateDate(value: string): Date {
  const date = new Date(value);
  if (isNaN(date.getTime())) throw new Error('Invalid date format');
  return date;
}

// Business logic

const formController = {
  addUserData() {
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

    const userAddForm = document.getElementById(
      'user_add_form',
    ) as HTMLFormElement;
    if (userAddForm) {
      userAddForm.reset();
    }

    return usersRepository.addUser({ email: email, password: password });
  },

  delUserData() {},

  addApiaryData() {
    const apiaryNameInput = document.getElementById(
      'apiary_name_input',
    ) as HTMLInputElement;
    if (!apiaryNameInput) throw new Error('Apiary name input not found');
    const apiary_name = apiaryNameInput.value;

    const userIdInput = document.getElementById(
      'apiary_user_id_input',
    ) as HTMLInputElement;
    if (!userIdInput) throw new Error('User_id input not found');
    const user_id = parseInt(userIdInput.value);

    if (!userExists(user_id)) {
      alert(`User ID ${user_id} does not exist.`);
      return;
    }

    const apiaryAddForm = document.getElementById(
      'apiary_add_form',
    ) as HTMLFormElement;
    if (apiaryAddForm) {
      apiaryAddForm.reset();
    }

    return apiariesRepository.addApiary({
      apiary_name: apiary_name,
      user_id: user_id,
    });
  },

  addHiveData() {
    const hiveNameInput = document.getElementById(
      'hive_name_input',
    ) as HTMLInputElement;
    if (!hiveNameInput) throw new Error('Hive name input not found');
    const hive_name = hiveNameInput.value;

    const apiaryIdInput = document.getElementById(
      'hive_apiary_id_input',
    ) as HTMLInputElement;
    if (!apiaryIdInput) throw new Error('hive ID input not found');
    const apiary_id = parseInt(apiaryIdInput.value);

    if (!apiaryExists(apiary_id)) {
      alert(`Apiary ID ${apiary_id} does not exist.`);
      return;
    }

    const hiveAddForm = document.getElementById(
      'hive_add_form',
    ) as HTMLFormElement;
    if (hiveAddForm) {
      hiveAddForm.reset();
    }

    return hivesRepository.addHive({ hive_name, apiary_id });
  },

  addColonyData() {
    const colonyNameInput = document.getElementById(
      'colony_name_input',
    ) as HTMLInputElement;
    if (!colonyNameInput) throw new Error('Colony name input not found');
    const colony_name = colonyNameInput.value;

    const hiveIdInput = document.getElementById(
      'colony_hive_id_input',
    ) as HTMLInputElement;
    if (!hiveIdInput) throw new Error('hive ID input not found');
    const hive_id = parseInt(hiveIdInput.value);

    if (!hiveExists(hive_id)) {
      alert(`hive ID ${hive_id} does not exist.`);
      return;
    }

    const colonyAddForm = document.getElementById(
      'colony_add_form',
    ) as HTMLFormElement;
    if (colonyAddForm) {
      colonyAddForm.reset();
    }

    return coloniesRepository.addColony({ colony_name, hive_id });
  },

  addQueenData() {
    const queenNameInput = document.getElementById(
      'queen_name_input',
    ) as HTMLInputElement;
    if (!queenNameInput) throw new Error('Queen name input not found');
    const queen_name = queenNameInput.value;

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
      'queen_colony_id_input',
    ) as HTMLInputElement;
    if (!colonyIdInput) throw new Error('colony ID input not found');
    const colony_id = parseInt(colonyIdInput.value);

    if (!colonyExists(colony_id)) {
      alert(`colony ID ${colony_id} does not exist.`);
      return;
    }

    const queenAddForm = document.getElementById(
      'queen_add_form',
    ) as HTMLFormElement;
    if (queenAddForm) {
      queenAddForm.reset();
    }

    return queensRepository.addQueen({
      queen_name,
      marked,
      clipped,
      colony_id,
    });
  },

  addInspectionData() {
    const timestampInput = document.getElementById(
      'timestamp_input',
    ) as HTMLInputElement;
    if (!timestampInput) throw new Error('timestamp input not found');
    const timestamp = new Date(timestampInput.value);

    const apiary_idInput = document.getElementById(
      'inspection_apiary_id_input',
    ) as HTMLInputElement;
    if (!apiary_idInput) throw new Error('apiary_id input not found');
    const apiary_id = parseInt(apiary_idInput.value);

    const colony_idInput = document.getElementById(
      'inspection_colony_id_input',
    ) as HTMLInputElement;
    if (!colony_idInput) throw new Error('colony_id input not found');
    const colony_id = parseInt(colony_idInput.value);

    const queenrightInput = document.getElementById(
      'queenright_input',
    ) as HTMLInputElement;
    if (!queenrightInput) throw new Error('queenright input not found');
    const queenright = queenrightInput.checked;

    const biasInput = document.getElementById('bias_input') as HTMLInputElement;
    if (!biasInput) throw new Error('bias input not found');
    const bias = biasInput.checked;

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
      'inspection_user_id_input',
    ) as HTMLInputElement;
    if (!user_idInput) throw new Error('user_id input not found');
    const user_id = parseInt(user_idInput.value);

    const inspectionAddForm = document.getElementById(
      'inspection_add_form',
    ) as HTMLFormElement;
    if (inspectionAddForm) {
      inspectionAddForm.reset();
    }

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

function userExists(user_id: number): boolean {
  return usersRepository.allRecords.some((user) => user.user_id === user_id);
}

function apiaryExists(apiary_id: number): boolean {
  return apiariesRepository.allRecords.some(
    (apiary) => apiary.apiary_id === apiary_id,
  );
}

function hiveExists(hive_id: number): boolean {
  return hivesRepository.allRecords.some((hive) => hive.hive_id === hive_id);
}

function colonyExists(colony_id: number): boolean {
  return coloniesRepository.allRecords.some(
    (colony) => colony.colony_id === colony_id,
  );
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

  usersRepository.allRecords.forEach((entry) => {
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
  const table = document.getElementById('apiaries-table') as HTMLTableElement;
  const headerRow = document.getElementById(
    'apiaries-header-row',
  ) as HTMLTableRowElement;
  if (table && headerRow) {
    table.innerHTML = '';
    table.appendChild(headerRow);
  }

  apiariesRepository.allRecords.forEach((entry) => {
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
  const table = document.getElementById('hives-table') as HTMLTableElement;
  const headerRow = document.getElementById(
    'hives-header-row',
  ) as HTMLTableRowElement;
  if (table && headerRow) {
    table.innerHTML = '';
    table.appendChild(headerRow);
  }

  hivesRepository.allRecords.forEach((entry) => {
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
  const table = document.getElementById('colonies-table') as HTMLTableElement;
  const headerRow = document.getElementById(
    'colonies-header-row',
  ) as HTMLTableRowElement;

  if (table && headerRow) {
    table.innerHTML = '';
    table.appendChild(headerRow);
  }

  coloniesRepository.allRecords.forEach((entry) => {
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
  const table = document.getElementById('queens-table') as HTMLTableElement;
  const headerRow = document.getElementById(
    'queens-header-row',
  ) as HTMLTableRowElement;

  if (table && headerRow) {
    table.innerHTML = '';
    table.appendChild(headerRow);
  }

  queensRepository.allRecords.forEach((entry) => {
    const row = document.createElement('tr');
    const obj = entry.toObject();
    row.innerHTML = `
      <td>${obj.queen_id}</td>
      <td>${obj.queen_name}</td>
      <td>${obj.marked}</td>
      <td>${obj.clipped}</td>
      <td>${obj.colony_id}</td>
    `;
    table.appendChild(row);
  });
}

function updateInspectionView() {
  const table = document.getElementById(
    'inspections-table',
  ) as HTMLTableElement;
  const headerRow = document.getElementById(
    'inspections-header-row',
  ) as HTMLTableRowElement;
  if (table && headerRow) {
    table.innerHTML = '';
    table.appendChild(headerRow);
  }

  inspectionsRepository.allRecords.forEach((entry) => {
    const row = document.createElement('tr');
    const obj = entry.toObject();
    row.innerHTML = `
        <td>${obj.timestamp.toLocaleString()}</td>
        <td>${obj.apiary_id}</td>
        <td>${obj.colony_id}</td>
        <td>${obj.queenright}</td>
        <td>${obj.bias}</td>
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
  // All data loading is now handled by the constructors of the repository classes.
  // We just need to update the views when the app starts.
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

  const userAddForm = document.getElementById(
    'user_add_form',
  ) as HTMLFormElement;
  if (userAddForm) {
    userAddForm.addEventListener('submit', (event) => {
      event.preventDefault();
      addUser();
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
    });
  }

  // Inspections
  const inspectionAddForm = document.getElementById(
    'inspection_add_form',
  ) as HTMLFormElement;
  if (inspectionAddForm) {
    inspectionAddForm.addEventListener('submit', (event) => {
      event.preventDefault();
      addInspection();
    });
  }
});