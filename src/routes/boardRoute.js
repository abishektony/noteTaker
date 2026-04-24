import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
	validateBoard,
	validateBoardParams,
	validateBoardMember,
	validateBoardMemberParams,
} from '../middleware/boardValidator.js';
import * as boardController from '../controllers/boardControllers.js';
const router = express.Router();

router.get('/', boardController.getAllBoardsHandler);
router.get('/:id', validateBoardParams, boardController.getBoardByIdHandler);
router.post('/', authenticate, validateBoard, boardController.createBoardHandler);
router.put('/:id', authenticate, validateBoardParams, validateBoard, boardController.updateBoardHandler);
router.delete('/:id', authenticate, validateBoardParams, boardController.deleteBoardHandler);

router.post('/:id/members', authenticate, validateBoardMember, boardController.addBoardMemberHandler);
router.get('/:id/members', validateBoardParams, boardController.getBoardMembersHandler);
router.delete('/:id/members/:uid', authenticate, validateBoardMemberParams, boardController.deleteBoardMemberHandler);
export default router;
