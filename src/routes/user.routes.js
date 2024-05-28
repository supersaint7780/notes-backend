import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  checkAuthStatus
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/refresh-token").get(refreshAccessToken);
router.route("/login").post(loginUser);

// Secured Routes
router.route("/logout").get(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/change-password").patch(verifyJWT, changeCurrentPassword);
router.route("/auth-status").get(verifyJWT, checkAuthStatus);

export default router;