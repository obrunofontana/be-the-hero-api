const connection = require('../database/connection');

module.exports = {
  async find(req, res) {
    try {
      const ong_id = req.headers.authorization;

      const incidents = await connection('incidents').where({ ong_id });

      return res.status(200).json({ incidents });
    } catch (e) {
      return res.status(400).json(e);
    }
  }
}