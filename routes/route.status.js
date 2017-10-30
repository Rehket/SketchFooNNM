

module.exports = function(app) {

    const status = require('../controllers/controller.status');

app.route('/status/models')
    .get(status.getModels);
};
