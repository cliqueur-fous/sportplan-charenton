require('dotenv').config();
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3500;
const DATA_DIR = path.join(__dirname, 'data');
const SESSIONS_DIR = path.join(__dirname, 'sessions');

// Ensure directories exist
[DATA_DIR, SESSIONS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// --- Data helpers ---
function readJSON(file, fallback) {
  const p = path.join(DATA_DIR, file);
  if (!fs.existsSync(p)) return fallback;
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return fallback; }
}

function writeJSON(file, data) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), 'utf8');
}

// --- Init default admin if no users ---
function initUsers() {
  let users = readJSON('users.json', null);
  if (!users || !users.length) {
    const hash = bcrypt.hashSync('admin', 10);
    users = [{ id: 1, username: 'admin', password: hash, role: 'admin', name: 'Administrateur' }];
    writeJSON('users.json', users);
    console.log('Default admin created: admin / admin');
  }
}
initUsers();

// --- Middleware ---
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  store: new FileStore({
    path: SESSIONS_DIR,
    ttl: 86400,
    retries: 0,
    logFn: () => {},
  }),
  secret: process.env.SESSION_SECRET || 'sportplan-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
}));

// --- Auth middleware ---
function requireAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.status(401).json({ error: 'Non authentifie' });
  }
  res.redirect('/login.html');
}

function requireAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'admin') return next();
  res.status(403).json({ error: 'Acces refuse' });
}

function requireEditor(req, res, next) {
  if (req.session && req.session.user && req.session.user.role !== 'consultation') return next();
  res.status(403).json({ error: 'Acces refuse — compte en consultation seule' });
}

// --- Auth routes ---
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = readJSON('users.json', []);
  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect' });
  }
  req.session.user = { id: user.id, username: user.username, role: user.role, name: user.name };
  res.json({ ok: true, user: req.session.user });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ ok: true });
});

app.get('/api/me', (req, res) => {
  if (req.session && req.session.user) return res.json(req.session.user);
  res.status(401).json({ error: 'Non authentifie' });
});

// --- User management (admin only) ---
app.get('/api/users', requireAuth, requireAdmin, (req, res) => {
  const users = readJSON('users.json', []);
  res.json(users.map(u => ({ id: u.id, username: u.username, role: u.role, name: u.name })));
});

app.post('/api/users', requireAuth, requireAdmin, (req, res) => {
  const users = readJSON('users.json', []);
  const { username, password, role, name } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Champs requis manquants' });
  if (users.find(u => u.username === username)) return res.status(400).json({ error: 'Ce nom d\'utilisateur existe deja' });
  const id = Math.max(...users.map(u => u.id), 0) + 1;
  const hash = bcrypt.hashSync(password, 10);
  users.push({ id, username, password: hash, role: role || 'user', name: name || username });
  writeJSON('users.json', users);
  res.json({ ok: true, id });
});

app.put('/api/users/:id', requireAuth, requireAdmin, (req, res) => {
  const users = readJSON('users.json', []);
  const idx = users.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Utilisateur introuvable' });
  const { username, password, role, name } = req.body;
  if (username) {
    const dup = users.find(u => u.username === username && u.id !== users[idx].id);
    if (dup) return res.status(400).json({ error: 'Ce nom d\'utilisateur existe deja' });
    users[idx].username = username;
  }
  if (password) users[idx].password = bcrypt.hashSync(password, 10);
  if (role) users[idx].role = role;
  if (name) users[idx].name = name;
  writeJSON('users.json', users);
  res.json({ ok: true });
});

app.delete('/api/users/:id', requireAuth, requireAdmin, (req, res) => {
  let users = readJSON('users.json', []);
  const id = parseInt(req.params.id);
  if (req.session.user.id === id) return res.status(400).json({ error: 'Impossible de supprimer votre propre compte' });
  users = users.filter(u => u.id !== id);
  writeJSON('users.json', users);
  res.json({ ok: true });
});

// --- Data API (requires auth) ---
const DATA_FILES = {
  events: { file: 'events.json', fallback: [] },
  infras: { file: 'infras.json', fallback: null },
  assocs: { file: 'assocs.json', fallback: null },
  vacances: { file: 'vacances.json', fallback: null },
};

app.get('/api/data', requireAuth, (req, res) => {
  const result = {};
  for (const [key, cfg] of Object.entries(DATA_FILES)) {
    result[key] = readJSON(cfg.file, cfg.fallback);
  }
  res.json(result);
});

app.post('/api/data', requireAuth, requireEditor, (req, res) => {
  const { events, infras, assocs, vacances } = req.body;
  if (events !== undefined) writeJSON('events.json', events);
  if (infras !== undefined) writeJSON('infras.json', infras);
  if (assocs !== undefined) writeJSON('assocs.json', assocs);
  if (vacances !== undefined) writeJSON('vacances.json', vacances);
  res.json({ ok: true });
});

// --- Serve login page and public assets (no auth) ---
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

// --- Serve app (requires auth) ---
app.get('/', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Static files that need auth (CSS, JS)
app.use(requireAuth, express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`SportPlan running on http://localhost:${PORT}`);
});
