const express = require('express');

let app = express();

app.get('/user', function(req, res) {
    res.json({name: 'fjk'})
})

app.listen(3030)