const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ChartApp', { useMongoClient: true });

module.exports = {mongoose};