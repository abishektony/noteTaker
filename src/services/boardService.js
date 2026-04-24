import {
	getAll,
	getById,
	create,
	update,
	remove,
	getBoardMembers as getMembers,
	addBoardMember as addMember,
	deleteBoardMember as deleteMember,
} from '../repositories/boardRepo.js';

export async function getAllBoards(options) {
	return getAll(options);
}

export async function getBoardById(id) {
	const board = await getById(id);
	if (board) return board;

	const error = new Error(`Board ${id} not found`);
	error.status = 404;
	throw error;
}

export async function createBoard(boardData) {
	return create(boardData);
}

export async function updateBoard(id, updatedData) {
	const board = await update(id, updatedData);
	if (board) return board;

	const error = new Error(`Board ${id} not found`);
	error.status = 404;
	throw error;
}

export async function deleteBoard(id) {
	const board = await remove(id);
	if (board) return board;

	const error = new Error(`Board ${id} not found`);
	error.status = 404;
	throw error;
}

export async function getBoardMembers(id) {
	return getMembers(id);
}

export async function addBoardMember(id, userId, role) {
	return addMember(id, userId, role);
}

export async function deleteBoardMember(id, userId) {
	const deletedMember = await deleteMember(id, userId);
	if (deletedMember) return deletedMember;

	const error = new Error(`Board member ${userId} not found on board ${id}`);
	error.status = 404;
	throw error;
}
