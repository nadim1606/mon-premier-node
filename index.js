/*const express = require("express");
const path = require("path");
//const fs = require("fs");
const app = express();

const lang ="fr"; //process.env.Lang.slice(0 , 2);
app.use("/CSS", express.static(path.join(__dirname, "/CSS")));

app.get("/", (req, res) => {

    const folder = (lang === fr) ? "fr" : "en";
    res.sendFile(path.join(__dirname, "html", folder, "index.html"));
   /* let indexHTML;

    switch(lang){
        case"fr" : 
        indexHTML = fs.readFileSync(path.join(__dirname, "html", "fr", "index.html" , "utf-8"));
        break;
        case"en" :
        indexHTML = fs.readFileSync(path.join(__dirname, "html", "en", "index.html" , "utf-8"));
        break;
        default:
        indexHTML = fs.readFileSync(path.join(__dirname, "html", "fr", "index.html" , "utf-8"));
        break;
    }
    res.send(indexHTML);
})

app.get("*", (req, res) =>{

    res.status(404).sendFile(path.join(__dirname, "html", "fr", "404.html"));

    /*const HTML = fs.readFileSync(path.join(__dirname, "html", "fr", "404.html", "utf-8"));
    res.send(HTML);
});


app.listen(8080 , () => {
    
    console.log("le serveur est lancé : 8080");
})*/

const express = require("express");
const path = require("path");
const app = express();

const lang = "fr"; 

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
