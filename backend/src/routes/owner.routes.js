const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const ownerController = require("../controllers/owner.controller");

router.use(authMiddleware);
router.use(roleMiddleware("owner"));

router.get("/dashboard", ownerController.getOwnerDashboard);

module.exports = router;
