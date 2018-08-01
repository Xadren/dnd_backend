const Store = require('openrecord/store/mysql');
const express = require('express');
const bodyParser = require('body-parser');
const secrets = require('./secrets.json');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
const store = new Store({
    host: 'localhost',
    user: secrets.username,
    password: secrets.password,
    database: 'dnd',
    models: [
        require('./models/Spell')
    ]
})

app.get('/spells', (req, res) => {
    console.log(`[ API ] GET /spells`);
    store.ready(async() => {
        const spells = await store.Model('Spell');
        res.send({
            status: 200,
            message: "OK",
            spells: spells,
        });

    })
})

app.get('/spell/:id', (req, res) => {
    let spell_id = req.params.id;
    console.log(`[ API ] GET /spell/${spell_id}`);
    store.ready(async() => {
        const spell = await store.Model('Spell').find(spell_id);
        res.send({
            status: 200,
            message: "OK",
            spell: spell
        })
    })
})

app.post('/spell', (req, res) => {
    let spell_name = req.body.name;
    let casting_time = req.body.casting_time;
    let components = req.body.components;
    let description = req.body.description;
    let level = req.body.level;
    let duration = req.body.duration;
    // console.log(spell_name);
    store.ready(async () => {
        const spell = await spell.create({
            name: spell_name,
            casting_time: casting_time,
            components: components,
            description: description,
            level: level,
            duration: duration
        })
        res.send({
            status: 200,
            message: "OK. Spell received",
            spell_name: spell_name
        })
    })
})

app.listen(3000, () => {
    console.log("Spells app listening on port 3000");
})