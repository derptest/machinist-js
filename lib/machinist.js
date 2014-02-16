var Machinist = function() {
    var Blueprint = require("./blueprint");

    var 
        blueprints = {},
        stores = {};

    var _blueprint = function (name) {

        if(!blueprints.name) {
            blueprints.name = new Blueprint(name);
        }
        return blueprints.name;
    };

    var _addStore = function(name, store) {
        stores.name = store;
    };

    return {
        blueprint : _blueprint,
        addStore: _addStore
    }
}();

module.exports = Machinist;