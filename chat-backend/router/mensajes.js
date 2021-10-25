/*
  path: api/mensajes
*/

const { Router } = require("express");
const { getChat } = require("../controllers/mensaje");
const { checkJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/:de", checkJWT, getChat);

module.exports = router;
