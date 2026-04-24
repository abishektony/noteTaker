import {
	getAll,
	getById,
	create,
	update,
	remove,
	getNoteTags as getTags,
	addNoteTag as addTag,
	deleteNoteTag as deleteTag,
} from '../repositories/noteRepo.js';

export async function getAllNotes(options) {
	return getAll(options);
}

export async function getNoteById(id) {
	const note = await getById(id);
	if (note) return note;

	const error = new Error(`Note ${id} not found`);
	error.status = 404;
	throw error;
}

export async function createNote(noteData) {
	return create(noteData);
}

export async function updateNote(id, updatedData) {
	const note = await update(id, updatedData);
	if (note) return note;

	const error = new Error(`Note ${id} not found`);
	error.status = 404;
	throw error;
}

export async function deleteNote(id) {
	const note = await remove(id);
	if (note) return note;

	const error = new Error(`Note ${id} not found`);
	error.status = 404;
	throw error;
}

export async function getNoteTags(id) {
	return getTags(id);
}

export async function addNoteTag(id, tagId) {
	return addTag(id, tagId);
}

export async function deleteNoteTag(id, tagId) {
	const deletedTag = await deleteTag(id, tagId);
	if (deletedTag) return deletedTag;

	const error = new Error(`Tag ${tagId} not found on note ${id}`);
	error.status = 404;
	throw error;
}
