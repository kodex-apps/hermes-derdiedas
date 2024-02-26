module.exports = (app, router) => {
    const matchController = require('../controllers/match.controller');

    // Get a match by its id
    router.get('/:shortId', matchController.findOne);

    // Create a match providing the first player's name (aka owner)
    router.post('/create/:ownerName', matchController.create);

    app.use('/', router);
}