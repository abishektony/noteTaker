import {
	getAllTags,
	getTagById,
	createTag,
	updateTag,
	deleteTag,
} from '../services/tagService.js';

export async function getAllTagsHandler(req, res, next) {
	try {
		const { search, sortBy = 'id', order = 'asc', offset = 0, limit = 10 } = req.query;
		const tags = await getAllTags({ search, sortBy, order, offset: Number(offset), limit: Number(limit) });
		res.json(tags);
	} catch (err) {
		next(err);
	}
}

export async function getTagByIdHandler(req, res, next) {
	try {
		const id = Number(req.params.id);
		const tag = await getTagById(id);
		res.json(tag);
	} catch (err) {
		next(err);
	}
}

export async function createTagHandler(req, res, next) {
	try {
		const tag = await createTag(req.body);
		res.status(201).json(tag);
	} catch (err) {
		next(err);
	}
}

export async function updateTagHandler(req, res, next) {
	try {
		const id = Number(req.params.id);
		const tag = await updateTag(id, req.body);
		res.json(tag);
	} catch (err) {
		next(err);
	}
}

export async function deleteTagHandler(req, res, next) {
	try {
		const id = Number(req.params.id);
		await deleteTag(id);
		res.status(204).send();
	} catch (err) {
		next(err);
	}
}
