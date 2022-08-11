const { db, User, Todo } = require('./db');
const { Op } = require('sequelize');
(async () => {
    /**Sincronizar todas las tablas o se puede ir de auna con  User.sync({ alter: true })*/
    await db.sync({ alter: true });
    
})();

/**
 * Equivalente al include 
 * const todo = await Todo.findByPk(3, { include: [User] });
    console.log(todo.toJSON());
 */

/**
 * Para guardar o darle el secundary key es 
 * 1 crear la instancia 
 * const todo = await Todo.create({title: "pruena", description: "Prueba"});
 * 2 se setea el usrio o con el id del usuario
 * await todo.setUser(2);
 */

/**
 * EXTRAER TODOS LOS USUARIOS registrados en la tabla users 
    const users = await User.findAll();
    console.table(users.map(user => user.toJSON()));
 * traer solo ciertos atributos
    const users = await User.findAll({ attributes: ['firstName', 'email'] });
    console.table(users.map(user => user.toJSON()));
*
    const users = await User.findAll({ where: {
        email: 'ejemplo@ejemplo.com'
    } });
    console.table(users.map(user => user.toJSON()));
 */

/**
 * Guardar un registro
    const [user, userCreated] = await User.findOrCreate({
        where: { email: 'ejemplo@henry.com' },
        defaults: {
            firstName: 'Angel',
            lastName: 'Dragon',
            email: 'ejemplo@ejemplo.com',
            password: '123456',
        }
    });
    console.table([user.toJSON(), userCreated]);
 */