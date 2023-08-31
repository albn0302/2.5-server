const express = require('express');
const server = express();
const path = require('path');
const fs = require('fs');

server.use(express.urlencoded({ extended: true }));
server.use(express.static('client'));

server.post('/formData', function (req, res) {
    fs.writeFileSync('./server/info.json', JSON.stringify(req.body));
    res.redirect('/login');

})

server.get('/read', function (req, res) {
    const file = JSON.parse(fs.readFileSync('info.json', 'utf8'));
    res.send(`Hi, your username is: ${file.user}, your password is: ${file.password}`);
    console.log(file);
})

server.post('/login', function (req, res) {
    const file = JSON.parse(fs.readFileSync('./server/info.json', 'utf8'));
    if (file.email == req.body.email && (file.password == req.body.password)) {
        res.redirect('/home.html');
    } else {
        res.send(`Invalid username or password!`);
    }
    console.log(file.email);
    console.log(req.body.email);
    console.log(file.password);
    console.log(req.body.password);
})

server.get('/login', function (req, res) {
    res.sendFile(path.resolve('./client/login.html'));
})

server.listen(3000, function () {
    console.log('Server is running...');
})