const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));


app.get('/api/cards', function (req, res) {
 res.sendFile(path.join(__dirname, 'public', 'card-deck.json') )
});

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(process.env.PORT || 8080);