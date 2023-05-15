/* 
    Rutas de Usuarios 
    host + /api/auth
*/

const express = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJWT");

const router = express.Router();

const {
  createUser,
  userLogin,
  revalidateToken,
} = require("../controllers/auth");

router.post(
  "/register",
  [
    // middlewares
    check("name", "Name is required").not().isEmpty(),
    check("lastName", "lastName is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password must be at leats be 6 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    // middlewares
    check("email", "Email is required").isEmail(),
    check("password", "Password must be at leats be 6 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  userLogin
);

router.get("/renew", validateJWT, revalidateToken);

module.exports = router;
