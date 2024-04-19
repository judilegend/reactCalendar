const moment = require("moment");
const Calendar = require("../models/CalendarModel");
const createEvent = async (req, res) => {
  const event = Calendar(req.body);
  await event.save();
  res.sendStatus(201);
};

const getAllEvents = async (req, res) => {
  try {
    // Récupérer tous les calendriers depuis la base de données
    const calendars = await Calendar.find();

    // Envoyer les calendriers en tant que réponse
    res.status(200).json(calendars);
  } catch (error) {
    // En cas d'erreur, envoyer un message d'erreur
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des calendriers.",
    });
  }
};
const DeleteEvent = async (req, res) => {
  try {
    await Calendar.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la suppression des calendriers.",
    });
  }
};
const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Calendar.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getAll = async (req, res) => {
  try {
    // Vérifier la présence des paramètres start et end dans la requête
    if (!req.query.start || !req.query.end) {
      return res
        .status(400)
        .json({ message: "Les paramètres start et end sont requis." });
    }

    // Convertir les dates de la requête en objets Date
    const start = moment(req.query.start);
    const end = moment(req.query.end);

    // Valider les dates
    if (!start.isValid() || !end.isValid() || start.isAfter(end)) {
      return res
        .status(400)
        .json({ message: "Les dates start et end sont invalides." });
    }

    // Récupérer les événements dans l'intervalle de dates spécifié
    const events = await Calendar.find({
      start: { $gte: start.toDate() },
      end: { $lte: end.toDate() },
    });

    // Envoyer les événements en tant que réponse
    res.status(200).json(events);
  } catch (error) {
    // En cas d'erreur, envoyer un message d'erreur
    console.error(
      "Une erreur est survenue lors de la récupération des événements :",
      error
    );
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des événements.",
    });
  }
};
module.exports = { getAll, createEvent, getAll, DeleteEvent, getAllEvents ,updateEvent};
