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

/**
 * Crea una nova llista
 * @param {Object} req - Objecte de petició
 * @param {Object} res - Objecte de resposta
 * @param {Function} next - Funció següent del middleware
 */
const createLlista = async (req, res, next) => {
  try {
    const { nom, descripcio } = req.body;
    logger.info('Petició per crear una nova llista', { nom, descripcio });

    // Validació dels camps obligatoris
    if (!nom || !descripcio) {
      return res.status(400).json({
        ok: false,
        missatge: 'Falten dades obligatòries: nom i descripció',
      });
    }

    const llista = await Llista.create({
      nom_llista: nom,
      descripcio,
    });

    res.status(201).json({
      ok: true,
      missatge: 'Llista creada amb èxit',
      resultat: llista,
    });
  } catch (error) {
    logger.error('Error creant nova llista:', error);
    next(error);
  }
};

/**
 * Afegeix un vídeo a una llista existent
 * @param {Object} req - Objecte de petició
 * @param {Object} res - Objecte de resposta
 * @param {Function} next - Funció següent del middleware
 */
const addVideo = async (req, res, next) => {
  try {
    const { llistaId, videoId } = req.body;
    logger.info('Petició per afegir un vídeo a una llista', { llistaId, videoId });

    // Validació dels camps obligatoris
    if (!llistaId || !videoId) {
      return res.status(400).json({
        ok: false,
        missatge: 'Falten dades obligatòries: llistaId i videoId',
      });
    }

    // Buscar la llista
    const llista = await Llista.findByPk(llistaId);
    if (!llista) {
      return res.status(404).json({
        ok: false,
        missatge: 'No s’ha trobat la llista especificada',
      });
    }

    // Buscar el vídeo
    const video = await Video.findByPk(videoId);
    if (!video) {
      return res.status(404).json({
        ok: false,
        missatge: 'No s’ha trobat el vídeo especificat',
      });
    }

    await llista.addVideo(video);

    res.status(200).json({
      ok: true,
      missatge: 'Vídeo afegit a la llista amb èxit',
      resultat: llista,
    });
  } catch (error) {
    logger.error('Error afegint vídeo a la llista:', error);
    next(error);
  }
};

module.exports = {
  obtenirTots,
  createLlista,
  addVideo,
};