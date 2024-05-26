import { Router } from 'express';
import { faker } from '@faker-js/faker';
import { IWinner, Users } from '../database/Users.js';

export const usersRouter = Router();

usersRouter.get('/me', async (req, res) => {
  const user = await Users.create(faker.person.fullName());
  res.status(201).json(user);
});

usersRouter.post('/winners', async (req, res) => {
  const user: IWinner = req.body;
  await Users.updateWinners(user);
  res.status(200).json(user);
});

usersRouter.get('/winners', async (req, res) => {
  try {
    const winners: IWinner[] = Users.getAll();
    res.status(200).json(winners);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
