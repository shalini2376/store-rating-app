const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const adminController = require("../controllers/admin.controller");

router.use(authMiddleware);
router.use(roleMiddleware("admin"));

router.get("/dashboard", adminController.getDashboardStats);
router.post("/users", adminController.addUser);
router.get("/users", adminController.getUsers);

router.post("/stores", adminController.addStore);
router.get("/stores", adminController.getStores);
router.get(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  adminController.getUserById
);

module.exports = router;
