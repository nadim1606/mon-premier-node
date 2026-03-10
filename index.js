const express = require("express");
const path = require("path");
const app = express();

require('dotenv').config(); // Charge le fichier .env
const mongoose = require('mongoose');

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connecté à la base de données !"))
  .catch(err => console.error("Erreur de connexion :", err));

const lang = "fr"; 

//const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    nom: String,
    email: String,
    texte: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
const Message = require("./models/Message"); // On importe le modèle créé précédemment

app.post("/ajouter-donnee", async (req, res) => {
    try {
        // 1. On récupère les données du formulaire
        const nouvelleDonnee = new Message({
            nom: req.body.nom,
            email: req.body.email
        });

        // 2. On enregistre dans MongoDB
        await nouvelleDonnee.save();

        // 3. On répond à l'utilisateur
        res.send("Données bien reçues et enregistrées ! <a href='/'>Retour</a>");
    } catch (error) {
        res.status(500).send("Erreur lors de l'enregistrement.");
    }
});


// 1. Fichiers statiques
app.use("/CSS", express.static(path.join(__dirname, "CSS")));

// 2. Route Accueil
app.get("/", (req, res) => {
    // Si lang est "en", on va dans le dossier "en", sinon "fr"
    const folder = (lang === "en") ? "en" : "fr";
    res.sendFile(path.join(__dirname, "html", folder, "index.html"));
});

// 3. Route 404 (doit rester en dernier)
app.get("/*any", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "html", "fr", "404.html"));
});

/*app.listen(8080, () => {
    console.log("Le serveur est lancé sur : http://localhost:8080");
});*/

const PORT = process.env.PORT || 8080; // Utilise le port du serveur OU 8080 par défaut

app.listen(PORT, () => {
    console.log(`Serveur en ligne sur le port ${PORT}`);
});

// Permet de lire les données envoyées via un formulaire HTML (POST)
app.use(express.urlencoded({ extended: true }));

