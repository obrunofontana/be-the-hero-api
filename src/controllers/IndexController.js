module.exports = {
  index(req, res) {
    return res.status(200).json({status: `API Be The Hero rodando na porta: 3000 hi`});
  }
}