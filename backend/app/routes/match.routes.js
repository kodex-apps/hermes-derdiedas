module.export = (app, router) => {
    const matchController = require('../controllers/match.controller');

    // Get a match by its id
    router.get('/:shortId', matchController.findOne);
}