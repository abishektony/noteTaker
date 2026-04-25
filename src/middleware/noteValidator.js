import { body, param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateNote = [
	body('boardId').isInt({ min: 1 }).withMessage('Board id must be a positive integer'),
	body('content')
		.trim()
		.exists({ values: 'falsy' })
		.withMessage('Content is required')
		.bail()
		.isLength({ min: 1, max: 5000 })
		.withMessage('Content must be between 1 and 5000 characters'),
	body('y_pos').optional().isInt().withMessage('y_pos must be an integer'),
	body('x_pos').optional().isInt().withMessage('x_pos must be an integer'),
	body('color').optional().isString().trim().notEmpty().withMessage('Color must be a non-empty string'),
	handleValidationErrors,
];

export const validateNoteTag = [
	param('id').isInt({ min: 1 }).withMessage('Note id must be a positive integer'),
	body('tagId').isInt({ min: 1 }).withMessage('Tag id must be a positive integer'),
	handleValidationErrors,
];

export const validateNoteParams = [
	param('id').isInt({ min: 1 }).withMessage('Note id must be a positive integer'),
	handleValidationErrors,
];

export const validateNoteTagParams = [
	param('id').isInt({ min: 1 }).withMessage('Note id must be a positive integer'),
	param('tid').isInt({ min: 1 }).withMessage('Tag id must be a positive integer'),
	handleValidationErrors,
];
