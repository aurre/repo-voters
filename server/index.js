const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const db = require('./db.json')
const PORT = process.env.PORT || 8080
const app = express()
const fs = require('fs')
module.exports = app

const createApp = () => {
    // logging middleware
    app.use(morgan('dev'))

    // body parsing middleware
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    // compression middleware
    app.use(compression())

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });

    // auth and api routes
    app.post('/login', (req, res, next) => {
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

    app.get('/repos', (req, res, next) => {
        if (isAuthorized(req)) {
            res.send(readRepos());
        } else {
            res.sendStatus(401);
        }
    });

    app.post('/repos', (req, res, next) => {
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

    // static file-serving middleware
    app.use(express.static(path.join(__dirname, '..', 'public')))

    // any remaining requests with an extension (.js, .css, etc.) send 404
    app.use((req, res, next) => {
        if (path.extname(req.path).length) {
            const err = new Error("We couldn't find that for you, sorry")
            err.status = 404
            next(err)
        } else {
            next()
        }
    })

    // sends index.html
    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public/index.html'))
    })

    // error handling endware
    app.use((err, req, res, next) => {
        console.error(err)
        console.error(err.stack)
        res.status(err.status || 500).send(err.message || 'Internal server error.')
    })
}

const startListening = () => {
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
}

createApp()
startListening()