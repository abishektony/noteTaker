import prisma from '../config/db.js';

export async function getAll({ search, sortBy, order, offset, limit }) {
  const conditions = {};
  if (search) {
    conditions.OR = [
      { content: { contains: search, mode: 'insensitive' } },
    ];
  }
  const note = await prisma.notes.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
  });
  return note;
}

export async function getById(id) {
  const note = await prisma.notes.findUnique({ where: { id } });
  return note;
}

export function create(notesData) {
  const newNote = prisma.notes.create({ data: notesData });
  return newNote;
}

export async function update(id, updatedData) {
  try {
    const updatedNote = await prisma.notes.update({
      where: { id },
      data: updatedData,
    });
    return updatedNote;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedNote = await prisma.notes.delete({
      where: { id },
    });
    return deletedNote;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function getNoteTags(id) {
  return prisma.noteTag.findMany({
    where: { noteId: id },
    include: { tag: true },
  });
}

export async function addNoteTag(id, tagId) {
  try {
    return await prisma.noteTag.create({
      data: {
        noteId: id,
        tagId,
      },
    });
  } catch (error) {
    if (error.code === 'P2002') {
      const duplicateError = new Error('Tag is already attached to this note');
      duplicateError.status = 409;
      throw duplicateError;
    }

    throw error;
  }
}

export async function deleteNoteTag(id, tagId) {
  try {
    return await prisma.noteTag.delete({
      where: {
        noteId_tagId: {
          noteId: id,
          tagId,
        },
      },
    });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}