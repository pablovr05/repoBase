const { Usuari } = require('../models');
const { logger } = require('../config/logger');

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

    // Crear el nou usuari
    const newUsuari = await Usuari.create({
      username,
      email,
      password,  // Assegura't de xifrar la contrasenya abans de guardar-la
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

module.exports = {
  createUsuari,
};
