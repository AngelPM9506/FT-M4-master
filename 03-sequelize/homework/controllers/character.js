'use strict'
const { Op, Character, Role } = require('../db');

const CharacterController = {
    newCharacter: async (req, res) => {
        let { code, name, age, race, hp, mana, date_added } = req.body;
        let args = { code, name, age, race, hp, mana, date_added };
        if (!code || !name || !hp || !mana) return res.status(404).send('Falta enviar datos obligatorios');
        try {
            res.status(201).json(await Character.create(args));
        } catch (error) {
            res.status(404).send('Error en alguno de los datos provistos');
        }
    },
    getCharacters: async (req, res) => {
        let querys = req.query;
        let condition = {}, attrib = [], where = {};
        for (const key in querys) {
            if (querys[key] === 'true') {
                attrib.push(key);
            } else if (querys[key] !== 'false') {
                where[key] = querys[key];
            }
        }
        if (attrib.length > 0) condition.attributes = attrib;
        if (where !== {}) condition.where = where;
        try {
            res.status(200).json(await Character.findAll(condition));
        } catch (error) {
            res.send(error);
        }
    },
    getCharacter: async (req, res) => {
        let { code } = req.params;
        try {
            let resp = await Character.findByPk(code);
            if (resp) {
                res.status(200).json(resp);
            } else {
                res.status(404).send(`El código ${code} no corresponde a un personaje existente`);
            }
        } catch (error) {
            return res.send(error);
        }
    },
    getYoungCharacters: async (req, res) => {
        try {
            res.status(200).json(await Character.findAll({ where: { age: { [Op.lt]: 25 } } }));
        } catch (error) {
            res.send(error);
        }
    },
    updateAttributes: async (req, res) => {
        let { attribute } = req.params;
        let { value } = req.query;
        try {
            let resp = await Character.update({ [attribute]: value }, { where: { [attribute]: null } });
            res.send('Personajes actualizados');
        } catch (error) {
            res.send(error);
        }
    },
    addAbilities: async (req, res) => {
        let { codeCharacter, abilities } = req.body;
        if (!codeCharacter || !abilities || abilities.length === 0) return res.status(404).send('Falta enviar datos obligatorios');
        try {
            let personaje = await Character.findByPk(codeCharacter);
            if (!personaje) return res.status(404).send(`El código ${codeCharacter} no corresponde a un personaje existente`);
            abilities.forEach(async ability => {
                /**Crear directamente una instancia del modelo creado previamente mediante la depependencia que se genera de 1:N */
                await personaje.createAbility(ability);
            });
            res.status(200).send('Abilities added successfully');
        } catch (error) {
            res.send(error);
        }
    },
    getWithRole: async (req, res) => {
        let { code } = req.params;
        try {
            /**en el la busqueda se puede incluir { include: [Role] } hacer un join con los roles */
            let personaje = await Character.findByPk(code, { include: [Role] });
            if (!personaje) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`);
            res.status(200).json(personaje)
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = CharacterController;
/**
 * 
 // Change everyone without a last name to "Doe"
await User.update({ lastName: "Doe" }, {
  where: {
    lastName: null
  }
});
 */

/**const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
    [Op.or]: [{ a: 5 }, { b: 6 }],             // (a = 5) OR (b = 6)
    someAttribute: {
      // Basics
      [Op.eq]: 3,                              // = 3
      [Op.ne]: 20,                             // != 20
      [Op.is]: null,                           // IS NULL
      [Op.not]: true,                          // IS NOT TRUE
      [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)

      // Using dialect specific column identifiers (PG in the following example):
      [Op.col]: 'user.organization_id',        // = "user"."organization_id"

      // Number comparisons
      [Op.gt]: 6,                              // > 6
      [Op.gte]: 6,                             // >= 6
      [Op.lt]: 10,                             // < 10
      [Op.lte]: 10,                            // <= 10
      [Op.between]: [6, 10],                   // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15

      // Other operators

      [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)

      [Op.in]: [1, 2],                         // IN [1, 2]
      [Op.notIn]: [1, 2],                      // NOT IN [1, 2]

      [Op.like]: '%hat',                       // LIKE '%hat'
      [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
      [Op.startsWith]: 'hat',                  // LIKE 'hat%'
      [Op.endsWith]: 'hat',                    // LIKE '%hat'
      [Op.substring]: 'hat',                   // LIKE '%hat%'
      [Op.iLike]: '%hat',                      // ILIKE '%hat' (case insensitive) (PG only)
      [Op.notILike]: '%hat',                   // NOT ILIKE '%hat'  (PG only)
      [Op.regexp]: '^[h|a|t]',                 // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
      [Op.notRegexp]: '^[h|a|t]',              // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
      [Op.iRegexp]: '^[h|a|t]',                // ~* '^[h|a|t]' (PG only)
      [Op.notIRegexp]: '^[h|a|t]',             // !~* '^[h|a|t]' (PG only)

      [Op.any]: [2, 3],                        // ANY (ARRAY[2, 3]::INTEGER[]) (PG only)
      [Op.match]: Sequelize.fn('to_tsquery', 'fat & rat') // match text search for strings 'fat' and 'rat' (PG only)

      // In Postgres, Op.like/Op.iLike/Op.notLike can be combined to Op.any:
      [Op.like]: { [Op.any]: ['cat', 'hat'] }  // LIKE ANY (ARRAY['cat', 'hat'])

      // There are more postgres-only range operators, see below
    }
  }
}); */