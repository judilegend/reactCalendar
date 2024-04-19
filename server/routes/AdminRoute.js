const {
  inscrire,
  login,
  mono,
  verifier,
  verifyJwt,
} = require('../controllers/AdminController')
const router = require('express').Router()

router.post('/inscrire', inscrire)
router.post('/login', login)
router.get('/:id', mono)
router.post('/verifyAuth', verifier, verifyJwt)

module.exports = router
