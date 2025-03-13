/**
 * rutesYoutuber.js
 * Definició de les rutes relacionades amb els youtubers
 */

const express = require('express');
const router = express.Router();
const llistaController = require('../controllers/LlistaController');

/**
 * @swagger
 * /api/llistes:
 *   get:
 *     summary: Obté tots les llistes
 *     description: Retorna una llista amb totes les llistes
 *     tags: [Llistes]
 *     responses:
 *       200:
 *         description: Llista de llistes obtinguda amb èxit
 *       500:
 *         description: Error intern del servidor
 */
router.get('/', llistaController.obtenirTots);

module.exports = router;