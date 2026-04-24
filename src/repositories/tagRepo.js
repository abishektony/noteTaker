import prisma from '../config/db.js';

export async function getAll({ search, sortBy, order, offset, limit }) {
  const conditions = {};
  if (search) {
    conditions.OR = [
      { name: { contains: search, mode: 'insensitive' } },
    ];
  }
  const tag = await prisma.tags.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
  });
  return tag;
}

export async function getById(id) {
  const tag = await prisma.tags.findUnique({ where: { id } });
  return tag;
}

export async function create(tagsData) {
  try {
    const newTag = await prisma.tags.create({ data: tagsData });
    return newTag;
  } catch (error) {
    if (error.code === 'P2002') {
      const err = new Error('Tag already exists');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function update(id, updatedData) {
  try {
    const updatedTag = await prisma.tags.update({
      where: { id },
      data: updatedData,
    });
    return updatedTag;
  } catch (error) {
    if (error.code === 'P2025') return null;
    if (error.code === 'P2002') {
      const err = new Error('Tag already exists');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedTag = await prisma.tags.delete({
      where: { id },
    });
    return deletedTag;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
