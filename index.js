const express = require('express');
const app = express();

// Heroku fournit le PORT dans process.env.PORT
// en local on utilise 3000 par défaut
const PORT = process.env.PORT || 3000;

// Page d'accueil : présentation du site pédagogique
app.get('/', (req, res) => {
  res.send(`
    <h1>Bienvenue sur mon site de cours</h1>
    <p>Ce site contient des cours et des exercices.</p>
    <ul>
      <li><a href="/cours">Voir les cours</a></li>
      <li><a href="/exercices">Voir les exercices</a></li>
    </ul>
  `);
});

// Page des cours
app.get('/cours', (req, res) => {
  res.send(`
    <h1>Cours</h1>
    <p>Voici un exemple de cours.</p>
    <h2>Introduction à JavaScript</h2>
    <p>JavaScript est un langage utilisé pour rendre les pages web interactives.</p>
    <a href="/">Retour à l'accueil</a>
  `);
});

// Page des exercices
app.get('/exercices', (req, res) => {
  res.send(`
    <h1>Exercices</h1>
    <p>Exercice 1 : écrire une fonction JavaScript qui affiche "Bonjour".</p>
    <p>Exercice 2 : créer une variable "age" et l'afficher dans la console.</p>
    <a href="/">Retour à l'accueil</a>
  `);
});

app.listen(PORT,()=>{console.log(`Serveur en ecoute sur le port ${PORT} `)});
