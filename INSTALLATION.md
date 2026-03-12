# SportPlan — Guide d'installation pour le service informatique

## Presentation

SportPlan est une application web de gestion du planning des equipements sportifs de la ville de Charenton-le-Pont.
Elle permet de planifier les creneaux d'occupation des 21 sites sportifs par les associations et services municipaux.

**Caracteristiques techniques :**
- Application web Node.js (serveur Express)
- Aucune base de donnees : stockage en fichiers JSON (~1 Mo max)
- Authentification par session avec 2 roles (admin / consultation)
- Interface responsive accessible depuis navigateur web

---

## Pre-requis serveur

| Composant | Version minimum | Commande de verification |
|-----------|----------------|--------------------------|
| **Node.js** | >= 18.0 | `node --version` |
| **npm** | >= 9.0 (inclus avec Node.js) | `npm --version` |
| **PM2** | >= 5.0 | `pm2 --version` |
| **Git** | >= 2.0 (optionnel) | `git --version` |

**Ressources necessaires :**
- RAM : ~30 Mo
- Disque : ~50 Mo (application + dependances)
- CPU : negligeable
- Port reseau : 1 port TCP (3500 par defaut, configurable)

---

## Installation pas a pas

### Etape 1 — Installer Node.js (si pas deja installe)

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verification
node --version   # doit afficher v20.x ou superieur
npm --version    # doit afficher 10.x ou superieur
```

### Etape 2 — Installer PM2 (gestionnaire de processus)

```bash
sudo npm install -g pm2

# Verification
pm2 --version
```

### Etape 3 — Recuperer l'application

**Option A — Depuis Git (recommande pour les mises a jour) :**
```bash
cd /var/www
git clone https://github.com/cliqueur-fous/sportplan-charenton.git
cd sportplan-charenton
```

**Option B — Depuis le ZIP :**
```bash
cd /var/www
mkdir sportplan-charenton
cd sportplan-charenton
unzip /chemin/vers/sportplan-charenton.zip
```

### Etape 4 — Installer les dependances

```bash
cd /var/www/sportplan-charenton
npm install
```

Cela installe 5 dependances :
- `express` — serveur web
- `express-session` — gestion des sessions
- `session-file-store` — stockage des sessions en fichiers
- `bcryptjs` — hashage des mots de passe
- `dotenv` — configuration par fichier .env

### Etape 5 — Configurer l'environnement

```bash
cp .env.example .env
nano .env
```

Contenu du fichier `.env` :
```
PORT=3500
SESSION_SECRET=une-phrase-secrete-longue-et-unique-pour-charenton
```

- **PORT** : port d'ecoute de l'application (defaut 3500)
- **SESSION_SECRET** : cle secrete pour signer les cookies de session. **Choisir une phrase longue et aleatoire.**

### Etape 6 — Ouvrir le port dans le firewall

```bash
# Si UFW est utilise :
sudo ufw allow 3500/tcp
sudo ufw reload

# Verification :
sudo ufw status | grep 3500
```

### Etape 7 — Demarrer l'application

```bash
cd /var/www/sportplan-charenton
pm2 start ecosystem.config.cjs
```

Verifier que l'application tourne :
```bash
pm2 status
# La colonne "status" doit afficher "online" pour "sportplan"
```

### Etape 8 — Demarrage automatique au boot

```bash
pm2 save
pm2 startup
# PM2 affiche une commande sudo a executer — la copier/coller et l'executer
```

### Etape 9 — Tester

Ouvrir un navigateur et acceder a :
```
http://adresse-du-serveur:3500
```

Identifiants par defaut :
- **Identifiant** : `admin`
- **Mot de passe** : `admin`

**IMPORTANT : Changer le mot de passe admin immediatement** depuis la page Utilisateurs de l'application.

---

## Mise a jour de l'application

Si installe via Git :
```bash
cd /var/www/sportplan-charenton
git pull origin master
npm install
pm2 restart sportplan
```

Si installe via ZIP : remplacer les fichiers puis `pm2 restart sportplan`.

---

## Commandes utiles

| Action | Commande |
|--------|----------|
| Voir le statut | `pm2 status` |
| Redemarrer | `pm2 restart sportplan` |
| Arreter | `pm2 stop sportplan` |
| Voir les logs | `pm2 logs sportplan` |
| Voir les logs d'erreur | `pm2 logs sportplan --err` |

---

## Stockage des donnees

Les donnees sont stockees dans le dossier `data/` sous forme de fichiers JSON :

| Fichier | Contenu | Taille typique |
|---------|---------|----------------|
| `users.json` | Comptes utilisateurs (mots de passe haches) | < 5 Ko |
| `events.json` | Creneaux du planning | < 500 Ko |
| `infras.json` | Sites sportifs | < 10 Ko |
| `assocs.json` | Associations | < 10 Ko |
| `vacances.json` | Vacances scolaires | < 5 Ko |

**Sauvegarde recommandee :**
```bash
# Sauvegarde manuelle
cp -r /var/www/sportplan-charenton/data/ /chemin/backup/sportplan-data-$(date +%Y%m%d)/

# Ou en cron quotidien (ajouter dans crontab -e) :
0 2 * * * cp -r /var/www/sportplan-charenton/data/ /chemin/backup/sportplan-data-$(date +\%Y\%m\%d)/
```

---

## Securite

- Les mots de passe sont haches avec bcrypt (jamais stockes en clair)
- Les sessions expirent apres 24h
- Le fichier `.env` contient le secret de session — ne pas le rendre accessible publiquement
- 2 roles : **Admin** (lecture/ecriture/gestion) et **Utilisateur** (consultation seule)

---

## Reverse proxy (optionnel)

Pour acceder a l'application via un nom de domaine (ex: sportplan.charenton.fr) sans le port, configurer un reverse proxy Nginx :

```nginx
server {
    listen 80;
    server_name sportplan.charenton.fr;

    location / {
        proxy_pass http://127.0.0.1:3500;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Puis :
```bash
sudo ln -s /etc/nginx/sites-available/sportplan /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Pour HTTPS, ajouter un certificat Let's Encrypt :
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d sportplan.charenton.fr
```

---

## Contact

Pour toute question technique concernant l'application :
- **Repository** : https://github.com/cliqueur-fous/sportplan-charenton
- **Responsable fonctionnel** : Florent Gayant — Direction des Sports

---

*SportPlan v1.0 — Charenton-le-Pont*
