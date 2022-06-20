const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/tea');
require('dotenv').config();
const app = express();

app.use('/uploads', express.static('./uploads'));
app.use(express.json());

app.use('/', routes);


//establish connection to database
mongoose.connect(
    process.env.MONGODB_URI,
    { useUnifiedTopology: true, useNewUrlParser: true},
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App listining at port ' + listener.address().port);
})