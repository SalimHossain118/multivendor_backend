/** @format */

const router = require("express").Router();

const authControllers = require("../controllers/authControllers.js");

router.post("/admin-login", authControllers.admin_login);

module.exports = router;
