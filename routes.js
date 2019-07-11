module.exports = (app) => {

    const user = require('./Controllers/UserController.js');
    const middleware = require('./middleware.js');

    app.post('/user', [ middleware.userValidationToken, user.create ] );

    app.get('/user/:userId', [ middleware.userValidationToken, user.show ] );

    app.put('/user/:userId', [ middleware.userValidationToken, user.update ] );

}