const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async find(req, res) {
    try {
      const ongs = await connection('ongs').select('*');

      return res.status(200).json(ongs);
    } catch (e) {
      return res.status(400).json(e);
    }
  },

  async create(req, res) {
    try {
      const { name, email, whatsapp, city, uf } = req.body;
      const id = crypto.randomBytes(4).toString('HEX');

      await connection('ongs').insert({
        id, name, email, whatsapp, city, uf
      });

      return res.status(200).json({ id });
    } catch (e) {
      return res.status(400).json(e);
    }
  },
}