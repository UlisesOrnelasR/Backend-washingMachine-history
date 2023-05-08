/* 
    Rutas de Servicios 
    host + /api/services
*/

const express = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJWT");

const router = express.Router();

const {
  createService,
  deleteService,
  updateService,
} = require("../controllers/services");

// Todas tienen que pasar por la validacion del token
router.use(validateJWT);

// Crear Servicio
router.post(
  "/",
  [
    // middlewares
    check("customer", "Customer name is required").not().isEmpty(),
    check("date", "Date is required").not().isEmpty(),
    check("brand", "Brand is required").not().isEmpty(),
    check("fault", "Fault is required").not().isEmpty(),
    check("changed_parts", "Changed parts are required").not().isEmpty(),
    check("service_cost", "Service cost is required").isNumeric(),
    check("address", "Address is required").not().isEmpty(),
    validateFields,
  ],
  createService
);

// Actualizar evento
router.put(
  "/:id",
  [
    // middlewares
    check("customer", "Customer name is required").not().isEmpty(),
    check("date", "Date is required").not().isEmpty(),
    check("brand", "Brand is required").not().isEmpty(),
    check("fault", "Fault is required").not().isEmpty(),
    check("changed_parts", "Changed parts are required").not().isEmpty(),
    check("service_cost", "Service cost is required").isNumeric(),
    check("address", "Address is required").not().isEmpty(),
    validateFields,
  ],
  updateService
);

// Borrar servicio
router.delete("/:id", deleteService);

module.exports = router;
