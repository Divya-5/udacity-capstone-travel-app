const async = require('express-async-errors')
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const fetch = require('node-fetch')

/* Server Setup */
const app = express();
app.use(cors());

// urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static('./dist'));

const PORT = 8020;
app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});

/* travel Array */

const travel = [];

/* Setting Routes */

app.get('/', (req, res) => {
  res.status(200).send('./dist/index.html');
});



app.post('/forecast', async (req, res, next) => {
  if (req.body.terminationpt !== " ") {
    const terminationpt = req.body.terminationpt;
    try {
      const response = await fetch(terminationpt);
      if (response.ok) {
        const jsonStructure = await response.json();
        res.status(201).send(jsonStructure);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).json('Bad Request');
  }
});
