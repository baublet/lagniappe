var assert = require('chai').assert
var deepcopy = require('./deepcopy.js')

describe('Deep Copy', () => {
    it('Should copy arrays', () => {
        let a = [1, 2]
        let b = deepcopy(a)
        assert.deepEqual(a, b, 'same members')
        b.push(3)
        assert.notDeepEqual(a, b, 'not same members')
    })
    it('Should copy objects', () => {
        const a = {a: 2}
        let b = deepcopy(a)
        assert.deepEqual(a, b, 'same members')
        b.c = 3
        assert.notDeepEqual(a, b, 'not same members')
    })
    it('Should copy objects within objects', () => {
        const a = {a: 2, b: { a: 3 } }
        let b = deepcopy(a)
        assert.deepEqual(a, b, 'same members')
        b.c = 3
        assert.notDeepEqual(a, b, 'not same members')
    })
    it('Should copy arrays within objects', () => {
        const a = {a: 2, b: [1, 2] }
        let b = deepcopy(a)
        assert.deepEqual(a, b, 'same members')
        b.c = 3
        assert.notDeepEqual(a, b, 'not same members')
    })
    it('Should copy objects within arrays', () => {
        const a = [{a : 2}, {a : 1}]
        let b = deepcopy(a)
        assert.deepEqual(a, b, 'same members')
        b[0] = {a : 3}
        assert.notDeepEqual(a, b, 'not same members')
    })
    it('Should only clone', () => {
        const a = {a: 2, b: { a: 3 }, c: [1, 2] }
        let b = deepcopy(a)
        assert.deepEqual(a, b, 'same members')
        b.c = [2, 1]
        assert.notDeepEqual(a.c, b.c)
        b.b.a = 4
        assert.notEqual(a.b.a, b.b.a)
        b.c[0] = 5
        assert.notEqual(a.c[0], b.c[0])
    })
})
