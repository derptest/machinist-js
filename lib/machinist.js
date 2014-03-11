var Machinist = function() {
    var Blueprint = require("./blueprint");

    var
        _blueprints = {},
        _stores = {};

    var _blueprint = function (name) {
        if(!_blueprints[name]) {
            _blueprints[name] = new Blueprint(name);
        }
        return _blueprints[name];
    };

    var _addStore = function(name, store) {
        if(!store && typeof name !== "string") {
            _stores["default"] = name;
        } else {
            _stores[name] = store;
        }

    };

    var self = {
        blueprint : _blueprint,
        addStore: _addStore,
        stores: _stores
    };

    return self;
}();

module.exports = Machinist;
