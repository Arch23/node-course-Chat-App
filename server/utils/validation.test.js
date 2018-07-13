const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        const val = 2;
        expect(isRealString(val)).toBeFalsy;
    });

    it('should reject string with only spaces', () => {
        const val = '     ';
        expect(isRealString(val)).toBeFalsy;
    });

    it('should allow string with non-space characters', () => {
        const val = 'user name';
        expect(isRealString(val)).toBeTruthy;
    });
});
