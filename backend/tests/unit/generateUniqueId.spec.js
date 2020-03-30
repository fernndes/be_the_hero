const generateUniqueId = require('../../src/utils/generateUniqueId')

describe('Generate Unique ID', () => {
    it('should generate an unique ID', () => {
        const id = generateUniqueId()

        expect(id).toHaveLength(8) // Espera que alguma coisa aconteça. Ex: 'Espero que 2 + 2 = 4' = expect(2 + 2).toBe(4) -> Run(npm test)
    })
})