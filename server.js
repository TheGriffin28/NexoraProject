// ==============================================================================
// NexoraProject — Production Express REST API Server
// ==============================================================================
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

class DomainStore {
  constructor() {
    this.items = new Map();
    this.nextId = 1;
    this.create({ name: 'Alpha Record', category: 'Core', status: 'Active', description: 'Initial baseline record' });
  }

  create(data) {
    if (!data.name || !data.name.trim()) throw new Error('Name is required');
    const id = this.nextId++;
    const item = { id, name: data.name.trim(), category: data.category || 'General', status: data.status || 'Active', createdAt: new Date().toISOString() };
    this.items.set(id, item);
    return item;
  }

  list() { return { items: Array.from(this.items.values()) }; }
  get(id) { return this.items.get(Number(id)) || null; }
  remove(id) { return this.items.delete(Number(id)); }
  stats() { return { total: this.items.size }; }
}

const store = new DomainStore();

app.get('/health', (req, res) => res.json({ status: 'healthy', app: 'NexoraProject' }));
app.get('/api/stats', (req, res) => res.json(store.stats()));
app.get('/api/nexoraproject_records', (req, res) => res.json(store.list()));
app.post('/api/nexoraproject_records', (req, res) => {
  try { res.status(201).json(store.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`🚀 ${'NexoraProject'} on port ${PORT}`));
}
module.exports = { app, store, DomainStore };
