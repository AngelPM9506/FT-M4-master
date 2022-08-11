const { Model, DataTypes } = require("sequelize");

class User extends Model { };

/**se pueden usar hooks como en reactas
 * como antes de cargar
 * antes de validar  etc etc 
 */

User.beforeValidate(user => {
    if (user.password === null) {
        user.password = 123456;
    }
});

module.exports = sequelize => {
    return User.init(
        {
            firstName: {
                type: DataTypes.STRING(100)
            },
            lastName: {
                type: DataTypes.STRING(100)
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false
            }
        },
        {
            sequelize: sequelize,
            tableName: 'user'
        }
    );
}