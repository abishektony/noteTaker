import { body, param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateBoard = [
	body('title')
		.trim()
		.exists({ values: 'falsy' })
		.withMessage('Title is required')
		.bail()
		.isLength({ min: 1, max: 255 })
		.withMessage('Title must be between 1 and 255 characters'),

	handleValidationErrors,
];

export const validateBoardParams = [
	param('id').isInt({ min: 1 }).withMessage('Board id must be a positive integer'),
	handleValidationErrors,
];

export const validateBoardMember = [
	param('id').isInt({ min: 1 }).withMessage('Board id must be a positive integer'),
	body('userId').isInt({ min: 1 }).withMessage('User id must be a positive integer'),
	body('role').optional().isString().trim().notEmpty().withMessage('Role must be a non-empty string'),
	handleValidationErrors,
];

export const validateBoardMemberParams = [
	param('id').isInt({ min: 1 }).withMessage('Board id must be a positive integer'),
	param('uid').isInt({ min: 1 }).withMessage('User id must be a positive integer'),
	handleValidationErrors,
];
