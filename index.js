var UserAccount = /** @class */ (function () {
    function UserAccount(user_id, email, password, timestamp) {
        this.user_id = user_id;
        this.email = email;
        this.password = password;
        this.timestamp = timestamp.toISOString();
    }
    return UserAccount;
}());
var InspectionRecord = /** @class */ (function () {
    function InspectionRecord(inspection_id, timestamp, apiary_id, colony_id, queenright, queen_marked, queen_clipped, queen_cups, brood_frames, store_frames, room_frames, health, varroa, temper, feed, supers, weather, user_id) {
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
    return InspectionRecord;
}());
var now = new Date();
function addUser(newUser) {
    var user_id = Math.floor(Math.random() * 100);
    var timestamp = now;
    console.log(timestamp);
    var user = new UserAccount(user_id, newUser.email, newUser.password, timestamp);
    console.log(user);
    return user;
}
function addInspectionRecord(newInspection) {
    var inspection_id = Math.floor(Math.random() * 100);
    var inspection = new InspectionRecord(inspection_id, newInspection.timestamp, newInspection.apiary_id, newInspection.colony_id, newInspection.queenright, newInspection.queen_marked, newInspection.queen_clipped, newInspection.queen_cups, newInspection.brood_frames, newInspection.store_frames, newInspection.room_frames, newInspection.health, newInspection.varroa, newInspection.temper, newInspection.feed, newInspection.supers, newInspection.weather, newInspection.user_id);
    return inspection;
}
var user1 = addUser({ email: 'jake@example.com', password: 'testpassword' });
addUser({ email: 'alice@example.com', password: 'testpassword' });
addUser({ email: 'bob@example.com', password: 'testpassword' });
var inspection1 = addInspectionRecord({
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
console.log(user1);
console.table(user1);
console.table(inspection1);
