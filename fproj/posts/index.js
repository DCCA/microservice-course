const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())

const posts = {}

app.get('/post', (req, res, next) => {
    res.send(posts);
})

app.post('/post', (req, res, next) => {
    const id = randomBytes(4).toString('hex');

    const { title } = req.body

    posts[id] = {
        id, title
    };

    res.status(201).send(posts[id]);
})

app.listen(4000, () => {
    console.log('Listenning on 4000')
})