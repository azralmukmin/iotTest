const path = require('path'); // for path folder
const http = require('http');
const express = require('express'); // for setup server
const bodyParser = require('body-parser'); // for passing middleware
const socketIO = require('socket.io');
const { MongoClient, ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Temperature } = require('./models/temperature');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
app.use(bodyParser.json());

io.on('connection', (socket) => {
    console.log('Socket id:', socket.id);

    socket.emit('newMessage', {
        test: 'Test from server'
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });

    // queries all data from dB then send to highchart
    Temperature.find({}, { _id: 0, __v: 0 }).then((listData) => {
        console.log('listData1', listData);
        socket.emit('initData', listData);
    }, (err) => {
        console.log('Unable to fetch DBTemperature', err);
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

});

app.post('/temps', (req, res) => {
    console.log(req.body);
    var temperature = new Temperature({
        x: Date.now() + 28800000, // + gmt 8
        y: req.body.y
    });

    var newTemp = temperature;
    console.log('addData', newTemp);
    io.emit('addData', newTemp);

    temperature.save().then((doc) => {
        console.log('Save temperature', doc);
        res.send(doc);
    }, (e) => {
        console.log('Unable to save dbtemperature');
        res.status(400).send(e);
    });
});

app.get('/temps', (req, res) => {
    console.log('Get request!');
    Temperature.find({}, { _id: 0, __v: 0 }).then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/tempsLast', (req, res) => {
    console.log('Get request!');
    Temperature.find({}, { _id: 0, __v: 0 }).sort({x:-1}).limit(1).then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

