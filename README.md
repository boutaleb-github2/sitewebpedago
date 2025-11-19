site web de pédagogique 
installation heroku sous ubuntu ------------------
sudo apt-get update
sudo apt-get install curl
curl https://cli-assets.heroku.com/install.sh | sh
heroku --version
heroku login-------------------
creer une application heroku ------------------
heroku create mon-site-cours-habib 
Heroku va te donner une URL du genre :
https://mon-site-cours-habib.herokuapp.com  ---------------------
Déployer sur Heroku
git push heroku main      ou master selon le cas 
---------------------------------- adresse du site ----------------------
https://sitewebpedago-habib-boutaleb-f23d2b5f9cdd.herokuapp.com/ 
https://git.heroku.com/sitewebpedago-habib-boutaleb.git