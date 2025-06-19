import express from 'express';
import {
  createNote,
  deleteNote,
  getNotes,
  updateNotes,
  getNoteSpe,
} from "../controller/noteController.js";

const router = express.Router();

router.get('/', getNotes);
router.get('/:id', getNoteSpe); // Assuming you want to get a specific note by ID
router.post('/', createNote);
router.put('/:id', updateNotes);
router.delete('/:id', deleteNote);

export default router;