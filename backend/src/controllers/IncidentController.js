
const connection = require('../database/connection')

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query // Paginação de 5 em 5

        const [count] = await connection('incidents') // Retorna o total de incidents cadastrados
            .count()

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])
        
        response.header('X-Total-Count', count['count(*)'])

        return response.json(incidents)
    },

    async create(request, response) {
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization // Guarda informações do contexto da requisição, dados da autenticação, localização...

    const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id,        
    })

    // const id = result[0] ou na função await como realizado

    return response.json({ id }) // Retorna um objeto no navegador
    },

    async delete(request, response) {
        const { id } = request.params
        const ong_id = request.headers.authorization
    
        // Verifica se a ong que quer deletar é dona do post
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

        if(incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.'})
        }

        await connection('incidents').where('id', id).delete()

        return response.status(204).send()
    }
} 