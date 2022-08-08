const express = require('express');
const apiRouter = express.Router();
const mongoose = require('mongoose');

import { Request, Response } from 'express';
import Country from '../schemes/Country';
import { User, Map } from '../schemes/User';

// retrieves registered user to the application
//retrieves user's saved travel map preferences if there is any in order to populate fields on frontend after logging in the application
apiRouter.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ _id: -1 });
    res.status(200).send(users);
  } catch (error: any) {
    res.status(400).send({ error, msg: 'Error, when getting users' });
  }
});

// retrieves countries in order to populate country list on travel map creation page
apiRouter.get('/countries', async (req: Request, res: Response) => {
  try {
    const cntrs = await Country.find().sort({ _id: 1 });
    res.status(200).send(cntrs);
  } catch (error: any) {
    res.status(400).send({ error, msg: 'Error, when getting countries' });
  }
});

//sign up to the application
apiRouter.post('/add', async (req: Request, res: Response) => {
  const { login } = req.body;
  const { password } = req.body;
  const { lname } = req.body;
  const { name } = req.body;
  const _id = new mongoose.Types.ObjectId();

  try {
    const user = await User.findOne({ login: login });
    if (user) {
      res.status(401).send({ error: 'User already exist' });
    } else {
      const newUser = new User({ login, lname, name, password, _id });

      await newUser.save();
      res.status(200).send({ message: 'User created' });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

//login to the app
apiRouter.post('/lookup', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne(req.body);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).send({ error: 'ERROR WAS OCCURED' });
  }
});

//edits user confidentials
apiRouter.post('/edit/:id', async (req: Request, res: Response) => {
  const { name } = req.body;
  const { lname } = req.body;
  const { password } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findOneAndUpdate({ _id: id }, { $set: { name, lname, password } }, { new: true });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).send({ error: 'ERROR WAS OCCURED' });
  }
});

//saves travel map preferences associated with the user
apiRouter.post('/savemap/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  const { bgColor } = req.body;
  const { restColor } = req.body;
  const { categories } = req.body;
  let map = new Map({ title, bgColor, restColor, categories });
  try {
    const user = await User.findOneAndUpdate({ _id: id }, { $set: { map } }, { new: true });
    if (user) {
      res.status(200).send({ message: 'Map Updated SUccessfully', status: 200 });
    } else {
      res.status(404).send({ error: 'User not found', status: 404 });
    }
  } catch (error) {
    res.status(400).send({ error: 'ERROR WAS OCCURED', status: 400 });
  }
});

export default apiRouter;
