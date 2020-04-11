const connection = require('../database/connection');

module.exports = {
  async find(req, res) {
    try {
      const { page = 1 } = req.query;
      
      const [count] = await connection('incidents').count();
      const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page -1) * 5)
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
      
      res.header('X-Total-Count', count['count(*)']);

      return res.status(200).json(incidents);
    } catch (e) {
      return res.status(400).json(e);
    }
  },

  async create(req, res) {
    try {
      const { title, description, value } = req.body;
      const ong_id = req.headers.authorization;

      const [id] = await connection('incidents').insert({
        title, description, value, ong_id
      });

      return res.status(200).json({ id });
    } catch (e) {
      return res.status(400).json(e);
    }
  },
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const ong_id = req.headers.authorization;

      const incident = await connection('incidents')
        .where({ id })
        .select('ong_id')
        .first();

      if(!incident) { return res.status(404).json('Incidente não encontrado')}

      if (ong_id !== incident.ong_id) { 
        return res.status(401).json({ error: 'Ops! Parece que voce nao tem permissao para realizar esta acao.'})
      }

      await connection('incidents').where({ id }).delete();
      
      return res.status(204).send();
    } catch (e) {
      return res.status(400).json(e);
    }
  },
}