const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(bodyParser.json());

app.use('/api/items', require('./routes/items'));
app.use('/api/bills', require('./routes/bills'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
