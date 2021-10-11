const express = require('express')
const MainController = require('../controllers/MainController')

const router = express.Router()

router.get('/:portal/search/:query', MainController.search)
router.get('/:portal/anime/:id', MainController.animeDetail)

module.exports = router
