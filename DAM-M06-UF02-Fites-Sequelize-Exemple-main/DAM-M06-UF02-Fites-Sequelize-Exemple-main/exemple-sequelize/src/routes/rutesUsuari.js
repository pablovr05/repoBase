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
 *           schema:
 *             type: object
 *             properties:
 *               ok:
 *                 type: boolean
 *                 example: true
 *               missatge:
 *                 type: string
 *                 example: "Usuari creat amb èxit"
 *               resultat:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: "nomUsuari"
 *                   email:
 *                     type: string
 *                     example: "usuari@exemple.com"
 *                   nom:
 *                     type: string
 *                     example: "Nom Complet"
 *                   data_registre:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-03-13T12:00:00.000Z"
 *                   idioma:
 *                     type: string
 *                     example: "ca"
 *       400:
 *         description: Error de validació de les dades proporcionades
 *         content:
 *           application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ok:
 *                 type: boolean
 *                 example: false
 *               codi:
 *                 type: string
 *                 example: "ERROR_VALIDACIO"
 *               missatge:
 *                 type: string
 *                 example: "Les dades proporcionades no compleixen els requisits"
 *               detalls:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     camp:
 *                       type: string
 *                       example: "username"
 *                     error:
 *                       type: string
 *                       example: "El nom d'usuari ha de tenir com a mínim 3 caràcters"
 *       409:
 *         description: Error en cas que l'usuari o email ja existeixi
 *         content:
 *           application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ok:
 *                 type: boolean
 *                 example: false
 *               codi:
 *                 type: string
 *                 example: "ERROR_DUPLICAT"
 *               missatge:
 *                 type: string
 *                 example: "Ja existeix un usuari amb aquest nom d'usuari o email"
 *               detalls:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     camp:
 *                       type: string
 *                       example: "email"
 *                     error:
 *                       type: string
 *                       example: "Aquest email ja està registrat"
 */
router.post('/usuaris', usuariController.createUsuari);

module.exports = router;