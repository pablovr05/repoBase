/**
 * index.js
 * Punt d'entrada principal per a totes les rutes de l'API
 */

const express = require('express');
const router = express.Router();
const rutesYoutuber = require('./rutesYoutuber');
const rutesVideo = require('./rutesVideo');
const rutesCategoria = require('./rutesCategoria');
const rutesLlista = require('./rutesLlista')

// Configuració de rutes
router.use('/youtubers', rutesYoutuber);
router.use('/videos', rutesVideo);
router.use('/categories', rutesCategoria);
router.use('/llista', rutesLlista);

module.exports = router;