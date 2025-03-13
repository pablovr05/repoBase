const { Youtuber, PerfilYoutuber, Video, Llista } = require('../models');
const { logger } = require('../config/logger');

/**
 * Obté tots els youtubers de la base de dades
 * @param {Object} req - Objecte de petició
 * @param {Object} res - Objecte de resposta
 * @param {Function} next - Funció següent del middleware
 */
const obtenirTots = async (req, res, next) => {
  try {
    logger.info('Petició per obtenir tots les llistes');
    
    const llistes = await Llista.findAll({
      attributes: ['id', 'nom_llista', 'descripcio']
    });
    
    res.status(200).json({
      ok: true,
      missatge: 'Llistes obtingudes amb èxit',
      resultat: llistes
    });
  } catch (error) {
    logger.error('Error obtenint tots les llistes:', error);
    next(error);
  }
};

module.exports = {
  obtenirTots,
};