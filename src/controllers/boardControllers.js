import {
	getAllBoards,
	getBoardById,
	createBoard,
	updateBoard,
	deleteBoard,
	getBoardMembers,
	addBoardMember,
	deleteBoardMember,
} from '../services/boardService.js';

export async function getAllBoardsHandler(req, res, next) {
	try {
		const { search, sortBy = 'id', order = 'asc', offset = 0, limit = 10 } = req.query;
		const boards = await getAllBoards({ search, sortBy, order, offset: Number(offset), limit: Number(limit) });
		res.json(boards);
	} catch (err) {
		next(err);
	}
}

export async function getBoardByIdHandler(req, res, next) {
	try {
		const id = Number(req.params.id);
		const board = await getBoardById(id);
		res.json(board);
	} catch (err) {
		next(err);
	}
}

export async function createBoardHandler(req, res, next) {
	try {
		const boardData = { ...req.body, ownerId: req.user.id };
		const board = await createBoard(boardData);
		res.status(201).json(board);
	} catch (err) {
		next(err);
	}
}

export async function updateBoardHandler(req, res, next) {
	try {
		const id = Number(req.params.id);
		const board = await updateBoard(id, req.body);
		res.json(board);
	} catch (err) {
		next(err);
	}
}

export async function deleteBoardHandler(req, res, next) {
	try {
		const id = Number(req.params.id);
		await deleteBoard(id);
		res.status(204).send();
	} catch (err) {
		next(err);
	}
}

export async function getBoardMembersHandler(req, res, next) {
	try {
		const id = Number(req.params.id);
		const members = await getBoardMembers(id);
		res.json(members);
	} catch (err) {
		next(err);
	}
}

export async function addBoardMemberHandler(req, res, next) {
	try {
		const boardId = Number(req.params.id);
		const { userId, role } = req.body;
		const member = await addBoardMember(boardId, Number(userId), role);
		res.status(201).json(member);
	} catch (err) {
		next(err);
	}
}

export async function deleteBoardMemberHandler(req, res, next) {
	try {
		const id = Number(req.params.id);
		const userId = Number(req.params.uid);
		await deleteBoardMember(id, userId);
		res.status(204).send();
	} catch (err) {
		next(err);
	}
}
