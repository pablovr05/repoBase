const { Usuari, VideosComentaris, Video } = require('../models');
const { logger } = require('../config/logger');
const { Op } = require("sequelize");

/**
 * Afegeix un usuari a la base de dades
 * @param {Object} req - Objecte de petició
 * @param {Object} res - Objecte de resposta
 * @param {Function} next - Funció següent del middleware
 */
const createUsuari = async (req, res, next) => {
  try {
    const { username, email, password, nom, idioma } = req.body;
    logger.info('Petició per crear un usuari', { username, email });

    if (!username || !email || !password || !nom || !idioma) {
      return res.status(400).json({
        ok: false,
        missatge: 'Falten dades obligatòries: username, email, password, nom, idioma',
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        ok: false,
        missatge: 'El nom d\'usuari ha de tenir almenys 3 caràcters',
      });
    }

    const usuariExist = await Usuari.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (usuariExist) {
      return res.status(409).json({
        ok: false,
        missatge: 'Ja existeix un usuari amb aquest nom d\'usuari o email',
        detalls: [
          ...(usuariExist.username === username ? [{ camp: "username", error: "Aquest nom d'usuari ja està registrat" }] : []),
          ...(usuariExist.email === email ? [{ camp: "email", error: "Aquest email ja està registrat" }] : [])
        ]
      });
    }

    const newUsuari = await Usuari.create({
      username,
      email,
      password,
      nom,
      idioma
    });

    res.status(201).json({
      ok: true,
      missatge: 'Usuari creat amb èxit',
      resultat: {
        id: newUsuari.id,
        username: newUsuari.username,
        email: newUsuari.email,
        nom: newUsuari.nom,
        idioma: newUsuari.idioma,
        data_registre: newUsuari.data_registre
      },
    });
  } catch (error) {
    logger.error('Error creant usuari:', error);
    next(error);
  }
};

const getComentaris = async (req, res, next) => {
  try {
    const { id_usuari } = req.params;
    logger.info(`Obteniendo comentarios del usuario con ID: ${id_usuari}`);

    const usuari = await Usuari.findByPk(id_usuari);
    if (!usuari) {
      return res.status(404).json({
        ok: false,
        missatge: "Usuari no trobat",
      });
    }

    const comentaris = await VideosComentaris.findAll({
      where: { userId: id_usuari },
      include: [
        {
          model: Video,
          attributes: ['id', 'titol', 'url_video'],
        }
      ],
    });

    if (comentaris.length === 0) {
      return res.status(404).json({
        ok: false,
        missatge: "No s'han trobat comentaris per aquest usuari",
      });
    }

    const result = comentaris.map(comentari => ({
      id: comentari.id,
      text: comentari.comentari,
      data_creacio: comentari.data_creacio,
      video: {
        id: comentari.Video.id,
        titol: comentari.Video.titol,
        url_video: comentari.Video.url_video,
      }
    }));

    res.status(200).json({
      ok: true,
      missatge: "Comentaris de l'usuari obtinguts amb èxit",
      resultat: result,
    });

  } catch (error) {
    logger.error('Error obtenint comentaris de l\'usuari', error);
    next(error);
  }
};

module.exports = {
  createUsuari,
  getComentaris,
};
