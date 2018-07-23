'use strict'

const db = require('./db.json');
const fs = require('fs');
const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')



router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/login', (req, res, next) => {
    const users = readUsers();
    const user = users.find(u => u.username === req.body.username && u.password === req.body.password);

    if (user) {
        res.send({
            'user': {
                id: user.id,
                name: user.name,
                token: 'Super secret token'
            }
        });
    } else {
        res.status(401).send('Invalid username and/or password')
    }
});

router.get('/repos', (req, res, next) => {
    if (isAuthorized(req)) {
        res.send(readRepos());
    } else {
        res.sendStatus(401);
    }
});

router.post('/repos', (req, res, next) => {
    if (isAuthorized(req)) {
        const dbRaw = JSON.parse(fs.readFileSync('./server/db.json'));
        const repo = dbRaw.repos.find(r => r.id === req.body.repoId);

        if (repo && !repo.votes.find(id => id === req.body.userId)) {
            repo.votes.push(req.body.userId);
            fs.writeFileSync('./server/db.json', JSON.stringify(dbRaw));
            res.sendStatus(204)
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(401);
    }
});

function isAuthorized(req) {
    return req.headers.authorization === 'Super secret token';
}

function readRepos() {
    const dbRaw = fs.readFileSync('./server/db.json');
    return JSON.parse(dbRaw).repos;
}

function readUsers() {
    const dbRaw = fs.readFileSync('./server/db.json');
    return JSON.parse(dbRaw).users
}

module.exports = router