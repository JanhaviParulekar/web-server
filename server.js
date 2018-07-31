const express = require('express');
const hbs = require('hbs');

const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.use(express.static(__dirname+'/public'));

app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `Today is ${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next()
});

// app.use((req, res, next) =>{
//     res.render('maintenance.hbs')
// });

app.set('view engine', 'hbs');

hbs.registerHelper('getFullYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});

app.get('/', (req, res) =>{
    // res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name: 'Janhavi',
    //     likes: [
    //         'Swimming',
    //         'Cooking'
    //     ]
    // });

    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello World'
    });
});

app.get('/about', (req, res) =>{
    // res.send('About Page');
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req,res) =>{
    res.send({
        errorMessage : 'Error occured'
    });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});