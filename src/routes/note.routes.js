import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createNote,
  getAllNotes,
  getPinnedNotes,
  deleteNote,
  updateNote,
  pinNote,
} from "../controllers/note.controller.js";

const router = Router();

// Secured Routes
router.route("/create").post(verifyJWT, createNote);
router.route("/delete/:id").delete(verifyJWT, deleteNote);
router.route("/all").get(verifyJWT, getAllNotes);
router.route("/pinned").get(verifyJWT, getPinnedNotes);
router.route("/update/:id").patch(verifyJWT, updateNote);
router.route("/pin/:id").patch(verifyJWT, pinNote);

export default router;
