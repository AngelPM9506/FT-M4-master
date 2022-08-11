const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
    name: {
      type: DataTypes.STRING,
      unique: 'compoundIndex',
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    mana_cost: {
      type: DataTypes.FLOAT,
      unique: 'compoundIndex',
      allowNull: false,
      validate: {
        min: 10.0,
        max: 250.0
      }
    },
    summary:{
      type: DataTypes.VIRTUAL,
      get () {
        return `${this.name} (${this.mana_cost} points of mana) - Description: ${this.description}`;
      }
    }
  })
}

/**
 * Directo desde la pagina de sequalize 
 * Creating two objects with the same value will throw an error. The unique property can be either a
 * boolean, or a string. If you provide the same string for multiple columns, they will form a
 * composite unique key.
  uniqueOne: { type: DataTypes.STRING,  unique: 'compositeIndex' },
  uniqueTwo: { type: DataTypes.INTEGER, unique: 'compositeIndex' },
 */