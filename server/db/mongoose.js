const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_GREEN_URI || 'mongodb://localhost:27017/ChartApp', { useMongoClient: true });

module.exports = {mongoose};