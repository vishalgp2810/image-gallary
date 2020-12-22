"use strict";

function includeAllRoutes(app, connection) {
	require('./image-galarry-api')(app, connection);
}
module.exports = (app, connection) => {
	includeAllRoutes(app, connection);
};
