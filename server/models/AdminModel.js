const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/fullcalendar'
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Base de données connectée!')
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base de données:', err)
  })

const schema = new mongoose.Schema({
  im: {
    type: String,
    unique: true,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // condition :{
  //   type:Boolean,
  //   required: true,
  // }
})

const model = mongoose.model('users', schema)

module.exports = model
