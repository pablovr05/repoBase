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

/**
 * @swagger
 * /api/llistes/createLlista:
 *   post:
 *     summary: Crea una nova llista
 *     description: Endpoint per crear una nova llista
 *     tags: [Llistes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom de la llista
 *               descripcio:
 *                 type: string
 *                 description: Descripció de la llista
 *     responses:
 *       201:
 *         description: Llista creada amb èxit
 *       400:
 *         description: Error en la sol·licitud
 *       500:
 *         description: Error intern del servidor
 */
router.post('/createLlista', llistaController.createLlista);

/**
 * @swagger
 * /api/llistes/addVideo:
 *   post:
 *     summary: Afegeix un vídeo a una llista
 *     description: Endpoint per afegir un vídeo a una llista existent
 *     tags: [Llistes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               llistaId:
 *                 type: string
 *                 description: ID de la llista on s'afegirà el vídeo
 *               videoId:
 *                 type: string
 *                 description: ID del vídeo que s'afegirà a la llista
 *     responses:
 *       200:
 *         description: Vídeo afegit a la llista amb èxit
 *       400:
 *         description: Error en la sol·licitud
 *       500:
 *         description: Error intern del servidor
 */
router.post('/addVideo', llistaController.addVideo);

module.exports = router;