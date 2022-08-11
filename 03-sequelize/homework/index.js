const app = require('./server');
const { db, Ability } = require('./db');
const { PORT_SERVER } = require('dotenv').config().parsed;

app.listen(PORT_SERVER, async () => {
  console.log(`Server listening on port ${PORT_SERVER}`);
  db.sync({ force: true });
});