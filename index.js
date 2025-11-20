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
          <a href="/cours/quantummecanics">Cours de Mécanique Quantique</a>
          <a href="/cours/dielectricandmagneticmaterials">Cours matériaux diélectriques et magnétiques</a>
          <a href="/cours/opensourcesphysique">opensourcesphysique</a>
          <a href="/exercices">Exercices</a>
        </nav>
      </header>

      <main>
        ${content}
      </main>

      <footer>
        <p>Site pédagogique perso - en cours de construction </p>
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
app.get('/cours/quantummecanics', (req, res) => {
  res.send(
    renderPage(
      'Cours JavaScript',
      `
      <h2>Cours Mécanique quantique</h2>
      <p>Mécanique quantique.</p>
      <h3>Cours en pptx :</h3>
<iframe 
  src="https://view.officeapps.live.com/op/embed.aspx?src=https://sitewebpedago-habib-boutaleb-f23d2b5f9cdd.herokuapp.com/quantummecanics"
  width="100%" height="600px">
</iframe>
      `
    )
  );
});

// Cours React
app.get('/cours/dielectricandmagneticmaterials', (req, res) => {
  res.send(
    renderPage(
      'Cours React',
      `
      <h2>Cours dielectricand magneticmaterials</h2>
      <p>React est une bibliothèque JavaScript pour construire des interfaces utilisateur.</p>
      <p>On travaille avec des composants et un état (state).</p>
      `
    )
  );
});

// Cours Physique
app.get('/cours/opensourcesphysique', (req, res) => {
  res.send(
    renderPage(
      'Cours de Physique</h2>',
      `
      <h2>Cours de Physique</h2>
      <p>opensourcesphysique.</p>
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
