// [{
//     id,
//     name,
//     room,
// }];

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

/**
 * Class to hold users array and methods
 */
class Users {
    /**
     * Constructor, initialize the users array
     */
    constructor() {
        this.users = [];
    }

    /**
     * add user to array and return
     * @param {string} id - user id
     * @param {string} name - user name
     * @param {string} room - name of the room
     * @return {user} returns user object
     */
    addUser(id, name, room) {
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }

    /**
     * remove user from array and return
     * @param {string} id - user id
     * @return {user} returns user object that was removed
     */
    removeUser(id) {
        const user = this.getUser(id);
        const index = this.users.indexOf(user);
        if (index != -1) {
            this.users.splice(index, 1);
        }
        return user;
    }

    /**
     * get user matched by id
     * @param {string} id - user id
     * @return {user} returns user object
     */
    getUser(id) {
        return this.users.find((user) => user.id === id);
    }

    /**
     * get list of names of users in room
     * @param {string} room - name of the room
     * @return {user} returns list of names
     */
    getUserList(room) {
        return this.users.filter((user) => user.room === room)
                    .map((user) => user.name);
    }
}

module.exports = {
    Users,
};
