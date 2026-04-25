import {
	getAllNotes,
	getNoteById,
	createNote,
	updateNote,
	deleteNote,
	getNoteTags,
	addNoteTag,
	deleteNoteTag,
} from '../services/noteService.js';

export async function getAllNotesHandler(req, res, next) {
	try {
		const { search, sortBy = 'id', order = 'asc', offset = 0, limit = 10 } = req.query;
		const notes = await getAllNotes({ search, sortBy, order, offset: Number(offset), limit: Number(limit) });
		res.json(notes);
	} catch (err) {
		next(err);
	}
}

export async function getNoteByIdHandler(req, res, next) {
	try {
		const id = Number(req.params.id);
		const note = await getNoteById(id);
		res.json(note);
	} catch (err) {
		next(err);
	}
}

export async function createNoteHandler(req, res, next) {
	try {
		const note = await createNote(req.body);
		res.status(201).json(note);
	} catch (err) {
		next(err);
	}
}

export async function updateNoteHandler(req, res, next) {
	try {
		const id = Number(req.params.id);
		const note = await updateNote(id, req.body);
		res.json(note);
	} catch (err) {
		next(err);
	}
}

export async function deleteNoteHandler(req, res, next) {
	try {
		const id = Number(req.params.id);
		await deleteNote(id);
		res.status(204).send();
	} catch (err) {
		next(err);
	}
}

export async function getNoteTagsHandler(req, res, next) {
	try {
		const id = Number(req.params.id);
		const tags = await getNoteTags(id);
		res.json(tags);
	} catch (err) {
		next(err);
	}
}

export async function addNoteTagHandler(req, res, next) {
	try {
		const id = Number(req.params.id);
		const { tagId } = req.body;
		const tag = await addNoteTag(id, Number(tagId));
		res.status(201).json(tag);
	} catch (err) {
		next(err);
	}
}

export async function deleteNoteTagHandler(req, res, next) {
	try {
		const id = Number(req.params.id);
		const tagId = Number(req.params.tid);
		await deleteNoteTag(id, tagId);
		res.status(204).send();
	} catch (err) {
		next(err);
	}
}
