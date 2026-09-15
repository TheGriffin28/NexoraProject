const assert = require('assert');
const { DomainStore } = require('./server.js');
console.log('⚡ Running NexoraProject Test Suite...');
const store = new DomainStore();
assert.throws(() => store.create({ name: '' }), /Name is required/);
const item = store.create({ name: 'Record Alpha' });
assert.strictEqual(item.id, 2);
console.log('✓ All NexoraProject automated test assertions passed cleanly with exit code 0.');
