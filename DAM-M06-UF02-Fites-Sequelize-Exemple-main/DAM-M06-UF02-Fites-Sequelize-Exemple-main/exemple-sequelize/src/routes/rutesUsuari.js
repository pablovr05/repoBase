const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/UsuariController');

/**
 * @swagger
 * /api/usuaris:
 *   post:
 *     summary: Crea un nou usuari
 *     description: Endpoint per crear un nou usuari al sistema amb validació de dades
 *     tags: [Usuaris]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'usuari que ha de tenir almenys 3 caràcters
 *                 minLength: 3
 *               email:
 *                 type: string
 *                 description: Correu electrònic de l'usuari
 *                 format: email
 *               password:
 *                 type: string
 *                 description: Contrasenya de l'usuari
 *                 minLength: 6
 *               nom:
 *                 type: string
 *                 description: Nom complet de l'usuari
 *               idioma:
 *                 type: string
 *                 description: Idioma preferit de l'usuari (ex. 'ca', 'es', etc.)
 *     responses:
 *       201:
 *         description: Usuari creat amb èxit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 missatge:
 *                   type: string
 *                   example: "Usuari creat amb èxit"
 *                 resultat:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "nomUsuari"
 *                     email:
 *                       type: string
 *                       example: "usuari@exemple.com"
 *                     nom:
 *                       type: string
 *                       example: "Nom Complet"
 *                     data_registre:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-13T12:00:00.000Z"
 *                     idioma:
 *                       type: string
 *                       example: "ca"
 *       400:
 *         description: Error de validació de les dades proporcionades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 codi:
 *                   type: string
 *                   example: "ERROR_VALIDACIO"
 *                 missatge:
 *                   type: string
 *                   example: "Les dades proporcionades no compleixen els requisits"
 *                 detalls:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       camp:
 *                         type: string
 *                         example: "username"
 *                       error:
 *                         type: string
 *                         example: "El nom d'usuari ha de tenir com a mínim 3 caràcters"
 *       409:
 *         description: Error en cas que l'usuari o email ja existeixi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 codi:
 *                   type: string
 *                   example: "ERROR_DUPLICAT"
 *                 missatge:
 *                   type: string
 *                   example: "Ja existeix un usuari amb aquest nom d'usuari o email"
 *                 detalls:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       camp:
 *                         type: string
 *                         example: "email"
 *                       error:
 *                         type: string
 *                         example: "Aquest email ja està registrat"
 */
router.post('/usuaris', usuariController.createUsuari);

/**
 * @swagger
 * /api/usuaris/comentaris/{id_usuari}:
 *   get:
 *     summary: Obté la llista de comentaris d'un usuari
 *     description: Endpoint per obtenir els comentaris realitzats per un usuari específic, incloent informació del video.
 *     tags: [Usuaris]
 *     parameters:
 *       - in: path
 *         name: id_usuari
 *         required: true
 *         description: ID de l'usuari per obtenir els seus comentaris
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comentaris obtinguts amb èxit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 missatge:
 *                   type: string
 *                   example: "Comentaris de l'usuari obtinguts amb èxit"
 *                 resultat:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       text:
 *                         type: string
 *                         example: "Gran tutorial, m'ha ajudat molt amb el meu projecte!"
 *                       data_creacio:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-15T18:30:45.000Z"
 *                       video:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 3
 *                           titol:
 *                             type: string
 *                             example: "Curso GRATIS de JAVASCRIPT desde cero (con ejercicios)"
 *                           url_video:
 *                             type: string
 *                             example: "https://www.youtube.com/watch?v=e3x1W9r9-rk"
 *                           youtuber:
 *                             type: object
 *                             properties:
 *                               nom_canal:
 *                                 type: string
 *                                 example: "Hola Mundo"
 *       400:
 *         description: Petició incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 missatge:
 *                   type: string
 *                   example: "ID d'usuari invàlid"
 *       404:
 *         description: No s'han trobat comentaris per aquest usuari
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 missatge:
 *                   type: string
 *                   example: "No s'han trobat comentaris per aquest usuari"
 *       500:
 *         description: Error intern del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 missatge:
 *                   type: string
 *                   example: "Error intern. Intenta-ho més tard"
*/
router.get('/usuaris/comentaris/:id_usuari', usuariController.getComentaris);

module.exports = router;
