const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback() // Desfazer todas as migrations para evitar possiveis interferencias e super lotação do BD
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            // .set('Authorization', 'id_válido') para aqueles que precisem passar um header
            .send({
                name: "APAD2",
                email: "contato@contato.com",
                whatsapp: '0123456789',
                city: "São Paulo",
                uf: "SP"
            })

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})