const { Router } = require('express');
const AbilityController = require('../controllers/Ability');
const router = Router();

/**posts */
router.post('/', AbilityController.newAbility);
/**puts */
router.put('/setCharacter', AbilityController.updateAbility)

module.exports = router;