const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenence.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the website..!',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        pageTitle: 'Help Page',
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to load the content'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});