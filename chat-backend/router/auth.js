/* path: api/login */

const { Router } = require("express");
const { check } = require("express-validator");

// controladores
const { createUser, login, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { checkJWT } = require("../middlewares/validar-jwt");

const router = Router();

// Create new users
router.post(
    "/new",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El password es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("typeUser", "El tipo de usuario es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    createUser
);

// Login
router.post(
    "/",
    [
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    login
);

// Revalidar Token
router.get("/renew", checkJWT, renewToken);

module.exports = router;
