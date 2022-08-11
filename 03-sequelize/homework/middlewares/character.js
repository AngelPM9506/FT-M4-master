const { Router } = require('express');
const CharacterController = require('../controllers/character');
const router = Router();

/**gets */
router.get('/', CharacterController.getCharacters);
router.get('/young', CharacterController.getYoungCharacters);
router.get('/:code', CharacterController.getCharacter);
router.get('/roles/:code', CharacterController.getWithRole);
/**posts */
router.post('/', CharacterController.newCharacter);
/**puts */
router.put('/addAbilities', CharacterController.addAbilities);
router.put('/:attribute', CharacterController.updateAttributes);

module.exports = router;