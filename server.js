const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  try {
    const accounts = await db('accounts');

    res.status(200).json(accounts);
  } catch(err) {
    res.status(500).json(err);
  }
});

server.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const account = await db('accounts')
      .where({ id })
      .first();
    res.status(200).json(account);
  } catch(err) {
    res.status(500).json(err);
  }
});

server.post('/', async (req, res) => {
  try {
    const [ id ] = await db('accounts')
      .insert(req.body);
    console.log(id);
    const account = await db('accounts')
      .where({ id })
      .first();
    console.log(account);
    res.status(201).json(account);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = server;