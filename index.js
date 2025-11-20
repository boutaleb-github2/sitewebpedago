if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
const express = require('express');
const session = require('express-session')
const app = express();

const PORT = process.env.PORT || 3000;

// Pour lire les données des formulaires (POST)
app.use(express.urlencoded({ extended: true }));

// Pour servir le CSS et autres fichiers statiques comme des pdf par exemple! 
app.use(express.static('public'));

// Configuration des sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: false,
  })
);
// le middleware requireAuth
function requireAuth(req, res, next) {
  if (req.session && req.session.isAuth) {
    return next(); // OK, il est connecté → on continue vers la route
  }
  // Pas connecté → on renvoie vers la page de login
  res.redirect('/login');
}

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
           <a href="/logout">Déconnexion</a>
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

////------------------

// Page de login (formulaire)
app.get('/login', (req, res) => {
  res.send(
    renderPage(
      'Connexion',
      `
      <h2>Connexion</h2>
      <form method="POST" action="/login">
        <div>
          <label>Utilisateur :</label>
          <input type="text" name="username" required>
        </div>
        <div>
          <label>Mot de passe :</label>
          <input type="password" name="password" required>
        </div>
        <button type="submit">Se connecter</button>
      </form>
      `
    )
  );
});

// Traitement du login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS;

  if (username === adminUser && password === adminPass) {
    // On marque la session comme "authentifiée"
    req.session.isAuth = true;
    return res.redirect('/cours/quantummecanics');
  }

  // Mauvais identifiants
  res.send(
    renderPage(
      'Connexion',
      `
      <h2>Connexion</h2>
      <p style="color:red;">Utilisateur ou mot de passe incorrect</p>
      <a href="/login">Réessayer</a>
      `
    )
  );
});

// Déconnexion
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});


////------------------

// Cours mecanique quantique
app.get('/cours/quantummecanics', requireAuth,(req, res) => {
  res.send(
    renderPage(
      'Cours JavaScript',
      `
      <h2>Cours Mécanique quantique</h2>
      <p>Mécanique quantique.</p>
      <a href="/logout">Déconnexion</a>
      <h3>Cours en pptx :</h3>
<iframe 
  src="https://view.officeapps.live.com/op/embed.aspx?src=https://sitewebpedago-habib-boutaleb-f23d2b5f9cdd.herokuapp.com/quantummecanics.pptx"
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
