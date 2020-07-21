const express = require('express');
const router = express.Router();


router.get('/ping', (req, res) => {return res.send('pong')}) //test




module.exports = router;