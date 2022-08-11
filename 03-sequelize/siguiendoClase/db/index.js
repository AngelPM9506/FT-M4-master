const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASS, DB_HOST, DB_BD } = require('dotenv').config().parsed;

//onst sequelize = new sequelize('postgres://postgres:postgres@127.0.0.1:5432/demo');

const sequelize = new Sequelize(DB_BD, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

const User = require('./models/User')(sequelize);
const Todo = require('./models/Todo')(sequelize);
/**uno a muchos */
User.hasMany(Todo);
Todo.belongsTo(User);

/**muchos a muchos */
// User.belongsToMany(Todo, {through: 'User_Todo'});
// Todo.belongsToMany(User, {through: 'User_Todo'});

module.exports = {
    db: sequelize,
    User,
    Todo
}