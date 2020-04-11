const connection = require('../database/connection');

module.exports = {
  async create(req, res) {
    try {
      const { id } = req.body;

      const ong = await connection('ongs').where({ id }).select('name').first();

      if(!ong) { return res.status(400).json('Ops! Ong não encontrada'); }

      return res.status(200).json(ong);
    } catch (e) {
      return res.status(400).json(e);
    }
  }
}