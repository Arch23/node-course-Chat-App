const expect = require('expect');

const {Users} = require('./users');

describe('Users class', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'userOne',
            room: 'roomOne',
        }, {
            id: '2',
            name: 'userTwo',
            room: 'roomTwo',
        }, {
            id: '3',
            name: 'userThree',
            room: 'roomOne',
        }];
    });

    it('should add new user', () => {
        const users = new Users();
        const user = {
            id: '123',
            name: 'user',
            room: 'test room',
        };

        users.addUser(user.id, user.name, user.room);

        expect(users.users).toContainEqual(user);
    });

    it('should return names for roomOne', () => {
        const userList = users.getUserList('roomOne');

        expect(userList).toContain('userOne', 'userThree');
    });

    it('should return names for roomTwo', () => {
        const userList = users.getUserList('roomTwo');

        expect(userList).toContain('userTwo');
    });

    it('should remove a user', () => {
        const id = '1';
        const user = users.removeUser(id);

        expect(user.id).toBe(id);
        expect(users.users).not.toContain('userOne');
    });

    it('should not remove user', () => {
        const user = users.removeUser('4');

        expect(user).toBeFalsy;
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        const id = '1';
        const user = users.getUser(id);

        expect(user).toBeTruthy;
        expect(user.id).toBe(id);
    });

    it('should not find user', () => {
        const id = '4';
        const user = users.getUser(id);

        expect(user).toBeFalsy;
    });
});
