import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
	validateNote,
	validateNoteTag,
	validateNoteParams,
	validateNoteTagParams,
} from '../middleware/noteValidator.js';
import * as noteController from '../controllers/noteControllers.js';
const router = express.Router();

router.get('/', noteController.getAllNotesHandler);
router.get('/:id', validateNoteParams, noteController.getNoteByIdHandler);
router.post('/', authenticate, validateNote, noteController.createNoteHandler);
router.put('/:id', authenticate, validateNoteParams, validateNote, noteController.updateNoteHandler);
router.delete('/:id', authenticate, validateNoteParams, noteController.deleteNoteHandler);

router.post('/:id/tags/:tid', authenticate, validateNoteTag, noteController.addNoteTagHandler);
router.get('/:id/tags', validateNoteParams, noteController.getNoteTagsHandler);
router.delete('/:id/tags/:tid', authenticate, validateNoteTagParams, noteController.deleteNoteTagHandler);
export default router;