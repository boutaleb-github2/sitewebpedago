const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Pour servir le CSS et autres fichiers statiques
app.use(express.static('public'));

// Petite fonction pour générer une page HTML avec un layout commun
function renderPage(title, content) {
  return `
    <!doctype html>
    <html lang="fr">
    <head>
      <meta charset="utf-8" />
      <title>${title}</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header>
        <h1>Mon site de cours</h1>
        <nav>
          <a href="/">Accueil</a>
          <a href="/cours/javascript">Cours JavaScript</a>
          <a href="/cours/react">Cours React</a>
          <a href="/cours/physique">Cours Physique</a>
          <a href="/exercices">Exercices</a>
        </nav>
      </header>

      <main>
        ${content}
      </main>

      <footer>
        <p>Site pédagogique perso - Déployé sur Heroku</p>
      </footer>
    </body>
    </html>
  `;
}

// Accueil
app.get('/', (req, res) => {
  res.send(
    renderPage(
      'Accueil',
      `
      <h2>Bienvenue</h2>
      <p>Ce site contient des cours et des exercices que je suis en train de construire.</p>
      <p>Choisis une section dans le menu ci-dessus.</p>
      `
    )
  );
});

// Cours JavaScript
app.get('/cours/javascript', (req, res) => {
  res.send(
    renderPage(
      'Cours JavaScript',
      `
      <h2>Cours JavaScript</h2>
      <p>JavaScript est un langage de programmation utilisé pour rendre les pages web interactives.</p>
      <h3>Exemple simple</h3>
      <pre><code>// Exemple
function direBonjour() {
  console.log("Bonjour !");
}</code></pre>
      `
    )
  );
});

// Cours React
app.get('/cours/react', (req, res) => {
  res.send(
    renderPage(
      'Cours React',
      `
      <h2>Cours React (introduction)</h2>
      <p>React est une bibliothèque JavaScript pour construire des interfaces utilisateur.</p>
      <p>On travaille avec des composants et un état (state).</p>
      `
    )
  );
});

// Cours Physique
app.get('/cours/physique', (req, res) => {
  res.send(
    renderPage(
      'Cours de Physique</h2>',
      `
      <h2>Cours de Physique</h2>
      <p>Ici tu pourras mettre des rappels, des formules, des schémas (images plus tard).</p>
      `
    )
  );
});

// Page des exercices
app.get('/exercices', (req, res) => {
  res.send(
    renderPage(
      'Exercices',
      `
      <h2>Exercices</h2>
      <ul>
        <li>Exercice JS : écrire une fonction qui affiche "Bonjour" dans la console.</li>
        <li>Exercice JS : créer une variable <code>age</code> et l'afficher.</li>
        <li>Exercice React : créer un composant qui affiche un compteur.</li>
      </ul>
      `
    )
  );
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
