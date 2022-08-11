const { Ability } = require('../db');

const AbilityController = {
    newAbility: async (req, res) => {
        let { name, description, mana_cost } = req.body;
        let args = { name, description, mana_cost };
        if (!name || !mana_cost) {
            return res.status(404).send('Falta enviar datos obligatorios');
        }
        try {
            res.status(201).json(await Ability.create(args));
        } catch (error) {
            res.send(error);
        }
    },
    updateAbility: async (req, res) => {
        let { idAbility, codeCharacter } = req.body;
        try {
            let ability = await Ability.findByPk(idAbility);
            await ability.setCharacter(codeCharacter);
            res.status(200).json(ability);
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = AbilityController;