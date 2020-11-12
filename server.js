/*
	/ --> res = this is working
	/signin --> POST = success/fail
	/register --> POST = user
	/profile/:userId --> GET = user
	/image --> PUT --> user
*/

const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
const knex = require("knex")({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_URL,
        ssl:true
    }
});


const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
    res.send('it is working');
});

app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, knex) });

app.put('/image', (req, res) => { image.handleImage(req, res, knex) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT||3001, () => {
    console.log("app is running");
})