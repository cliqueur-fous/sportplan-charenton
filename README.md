# SportPlan — Charenton-le-Pont

Planning des equipements sportifs — Direction des Sports.

## Pre-requis

- **Node.js** >= 18 (https://nodejs.org)
- **PM2** (gestionnaire de processus) : `npm install -g pm2`
- Un port reseau disponible (par defaut : 3500)

## Installation

```bash
# 1. Cloner ou dezipper le projet
git clone https://github.com/cliqueur-fous/sportplan-charenton.git
cd sportplan-charenton

# 2. Installer les dependances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# Editer .env pour changer le port et le secret de session

# 4. Lancer en production avec PM2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup  # pour demarrage automatique au boot du serveur
```

L'application est accessible sur `http://votre-serveur:3500`

## Configuration (.env)

```
PORT=3500
SESSION_SECRET=une-phrase-secrete-unique-et-longue
```

- `PORT` : port d'ecoute (defaut 3500)
- `SESSION_SECRET` : cle secrete pour les sessions (changer en production !)

## Compte par defaut

Au premier lancement, un compte admin est cree automatiquement :
- **Identifiant** : `admin`
- **Mot de passe** : `admin`

**Changer le mot de passe immediatement** apres la premiere connexion via la page Utilisateurs.

## Roles

| Role | Droits |
|------|--------|
| **Admin** | Lecture + ecriture + gestion des utilisateurs |
| **Utilisateur** | Consultation seule (lecture uniquement) |

## Stockage des donnees

Aucune base de donnees requise. Les donnees sont stockees en **fichiers JSON** dans le dossier `data/` :

| Fichier | Contenu |
|---------|---------|
| `users.json` | Comptes utilisateurs (mots de passe haches bcrypt) |
| `events.json` | Creneaux du planning |
| `infras.json` | Sites sportifs |
| `assocs.json` | Associations |
| `vacances.json` | Vacances scolaires |

Les sessions sont stockees dans le dossier `sessions/`.

**Taille estimee** : < 1 Mo pour l'ensemble des donnees.

## Sauvegarde

Pour sauvegarder les donnees, copier le dossier `data/` :

```bash
cp -r data/ backup-data-$(date +%Y%m%d)/
```

## Architecture

```
sportplan-charenton/
├── server.js              # Serveur Express (API + auth + fichiers statiques)
├── ecosystem.config.cjs   # Configuration PM2
├── package.json
├── .env                   # Configuration (port, secret)
├── data/                  # Donnees JSON (auto-cree)
├── sessions/              # Sessions utilisateurs (auto-cree)
└── public/
    ├── index.html         # Application principale
    ├── login.html         # Page de connexion
    ├── css/styles.css     # Feuille de styles
    ├── js/app.js          # Logique applicative
    └── img/               # Logo et images
```

## Commandes utiles

```bash
pm2 status                 # Voir l'etat de l'application
pm2 restart sportplan      # Redemarrer l'application
pm2 logs sportplan         # Voir les logs
pm2 stop sportplan         # Arreter l'application
```

## Mise a jour

```bash
cd /chemin/vers/sportplan-charenton
git pull origin master
npm install
pm2 restart sportplan
```

## Firewall

Si le serveur utilise UFW, ouvrir le port :

```bash
sudo ufw allow 3500/tcp
```

---

*Concu par Florent Gayant — Direction des Sports, Charenton-le-Pont*
