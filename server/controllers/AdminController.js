const User = require('../models/AdminModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const inscrire = async (req, res) => {
  const { im ,nom, email, password } = req.body
  if (!im || !nom || !email || !password ) {
    return res
      .status(400)
      .json('La nom, le email, le tel et le password sont requis')
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 12)
    await User.create({ im , nom, email, password: hashedPassword})
    res.send('Insertion réussie')
  } catch (error) {
    console.error(error)
    res.status(500).json("Erreur serveur lors de l'insertion")
    res.json("Erreur serveur lors de l'insertion")
  }
}

const liste = async (req, res) => {
  const data = await User.find()
  res.json(data)
}

const mono = async (req, res) => {
  const id = req.params.id
  const data = await User.find({ _id: id })
  res.json(data)
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const utilisateur = await User.findOne({ email })
    const id = utilisateur._id
    if (!utilisateur) {
      return res.status(401).json('Email invalide')
    }

    const passwordMatch = await bcrypt.compare(password, utilisateur.password)
    if (!passwordMatch) {
      return res.status(401).json('Email ou mot de passe invalide')
    }
    const token = jwt.sign({ id: utilisateur._id }, 'jwtSecretKey', {
      expiresIn: 300,
    })
    res.json({
      result: 'Connexion réussie',
      login: true,
      token,
      utilisateur,
      id,
    })
  } catch (error) {
    res.status(500).json('Erreur lors de la connexion : ' + error.message)
  }
}

const verifyJwt = (req, res, next) => {
  const token = req.headers['access-token']
  if (!token) {
    return res.json('Nous avons besoin de token')
  } else {
    jwt.verify(token, 'jwtSecretKey', (err, decoded) => {
      if (err) {
        res.json('Non authentifiee')
      } else {
        req.userId = decoded.id
        console.log(req.userId)
        next()
      }
    })
  }
}
const verifier = (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  return res.json('Authentified')
}

module.exports = { inscrire, login, liste, mono, verifyJwt, verifier }
