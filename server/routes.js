const express = require('express');
const router = express.Router();

const perfumeController = require('./controllers/perfumeController')

router.get('/ping', (req, res) => {return res.send('pong')}) //test
router.get('/perfume/list', perfumeController.perfumeList); //lista de perfumes
router.post('/perfume/add', perfumeController.perfumeAdd);
router.post('/perfume/edit', perfumeController.perfumeEdit);
router.post('/perfume/delete', perfumeController.perfumeDelete);
router.post('/select/dictionary', perfumeController.selectDictionary);



module.exports = router;