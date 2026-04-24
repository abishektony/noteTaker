import bcrypt from 'bcrypt';
import prisma from '../src/config/db.js';

const passwords = {
	admin: 'AdminPass123!',
	user: 'UserPass123!',
};

async function main() {
	await prisma.$transaction([
		prisma.noteTag.deleteMany(),
		prisma.boardMember.deleteMany(),
		prisma.notes.deleteMany(),
		prisma.board.deleteMany(),
		prisma.tags.deleteMany(),
		prisma.user.deleteMany(),
	]);

	const adminPassword = await bcrypt.hash(passwords.admin, 10);
	const userPassword = await bcrypt.hash(passwords.user, 10);

	const admin = await prisma.user.create({
		data: {
			email: 'admin@notetaker.local',
			password: adminPassword,
			role: 'ADMIN',
		},
	});

	const user = await prisma.user.create({
		data: {
			email: 'user@notetaker.local',
			password: userPassword,
			role: 'USER',
		},
	});

	const adminBoard = await prisma.board.create({
		data: {
			title: 'Admin Planning Board',
		},
	});

	const userBoard = await prisma.board.create({
		data: {
			title: 'Personal Study Board',
		},
	});

	await prisma.boardMember.createMany({
		data: [
			{
				boardId: adminBoard.id,
				userId: admin.id,
				role: 'OWNER',
			},
			{
				boardId: userBoard.id,
				userId: user.id,
				role: 'OWNER',
			},
			{
				boardId: userBoard.id,
				userId: admin.id,
				role: 'MEMBER',
			},
		],
	});

	const urgentTag = await prisma.tags.create({
		data: { name: 'Urgent' },
	});

	const schoolTag = await prisma.tags.create({
		data: { name: 'School' },
	});

	const personalTag = await prisma.tags.create({
		data: { name: 'Personal' },
	});

	const adminNote = await prisma.notes.create({
		data: {
			boardId: adminBoard.id,
			content: 'Review final project rubric and submit board demo notes.',
			x_pos: 80,
			y_pos: 120,
			color: 'Yellow',
		},
	});

	const userNote = await prisma.notes.create({
		data: {
			boardId: userBoard.id,
			content: 'Finish assignment 9 reference comparison and write up findings.',
			x_pos: 240,
			y_pos: 150,
			color: 'Blue',
		},
	});

	const sharedNote = await prisma.notes.create({
		data: {
			boardId: userBoard.id,
			content: 'Prepare a short checklist for auth, boards, notes, and tags.',
			x_pos: 410,
			y_pos: 210,
			color: 'Green',
		},
	});

	await prisma.noteTag.createMany({
		data: [
			{
				noteId: adminNote.id,
				tagId: urgentTag.id,
			},
			{
				noteId: adminNote.id,
				tagId: schoolTag.id,
			},
			{
				noteId: userNote.id,
				tagId: schoolTag.id,
			},
			{
				noteId: userNote.id,
				tagId: personalTag.id,
			},
			{
				noteId: sharedNote.id,
				tagId: personalTag.id,
			},
		],
	});

	console.log('Seed completed successfully.');
	console.log('Known credentials:');
	console.log(`- admin@notetaker.local / ${passwords.admin}`);
	console.log(`- user@notetaker.local / ${passwords.user}`);
}

main()
	.catch((error) => {
		console.error('Seed failed:', error);
		process.exitCode = 1;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
