const { Model, DataTypes } = require('sequelize');

class Todo extends Model { }

module.exports = sequelize => {
    return Todo.init(
        {
            title: {
                type: DataTypes.STRING(60),
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT
            },
            complet: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            sequelize: sequelize,
            tableName: 'todo'
        }
    );
};