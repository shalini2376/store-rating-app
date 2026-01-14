const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const userController = require("../controllers/user.controller");

router.use(authMiddleware);
router.use(roleMiddleware("user"));

router.get("/stores", userController.getStores);
router.post("/ratings", userController.submitRating);

module.exports = router;
