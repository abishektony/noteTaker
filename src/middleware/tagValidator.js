import { body, param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateTag = [
	body('name')
		.trim()
		.exists({ values: 'falsy' })
		.withMessage('Name is required')
		.bail()
		.isLength({ min: 1, max: 100 })
		.withMessage('Name must be between 1 and 100 characters'),

	handleValidationErrors,
];

export const validateTagParams = [
	param('id').isInt({ min: 1 }).withMessage('Tag id must be a positive integer'),
	handleValidationErrors,
];
