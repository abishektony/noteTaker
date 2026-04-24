import prisma from '../config/db.js';

export async function getAll({ search, sortBy, order, offset, limit }) {
  const conditions = {};
  if (search) {
    conditions.OR = [
      { title: { contains: search, mode: 'insensitive' } },
    ];
  }
  const board = await prisma.board.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
  });
  return board;
}

export async function getById(id) {
  const board = await prisma.board.findUnique({ where: { id } });
  return board;
}

export function create(boardsData) {
  const newBoard = prisma.board.create({ data: boardsData });
  return newBoard;
}

export async function update(id, updatedData) {
  try {
    const updatedBoard = await prisma.board.update({
      where: { id },
      data: updatedData,
    });
    return updatedBoard;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedBoard = await prisma.board.delete({
      where: { id },
    });
    return deletedBoard;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function getBoardMembers(id) {
  const members = await prisma.boardMember.findMany({
    where: { boardId: id },
    include: {
      user: true,
    },
  });

  return members;
}

export async function addBoardMember(id, userId, role = 'MEMBER') {
  try {
    const member = await prisma.boardMember.create({
      data: {
        boardId: id,
        userId,
        role,
      },
    });

    return member;
  } catch (error) {
    if (error.code === 'P2002') {
      const duplicateError = new Error('User is already a member of this board');
      duplicateError.status = 409;
      throw duplicateError;
    }

    throw error;
  }
}

export async function deleteBoardMember(id, userId) {
  try {
    const deletedMember = await prisma.boardMember.delete({
      where: {
        boardId_userId: {
          boardId: id,
          userId,
        },
      },
    });

    return deletedMember;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}