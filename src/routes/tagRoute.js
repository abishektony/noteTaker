import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { validateTag, validateTagParams } from '../middleware/tagValidator.js';
import * as tagController from '../controllers/tagControllers.js';
const router = express.Router();

router.get('/', tagController.getAllTagsHandler);
router.get('/:id', validateTagParams, tagController.getTagByIdHandler);
router.post('/', authenticate, validateTag, tagController.createTagHandler);
router.put('/:id', authenticate, validateTagParams, validateTag, tagController.updateTagHandler);
router.delete('/:id', authenticate, validateTagParams, tagController.deleteTagHandler);
export default router;