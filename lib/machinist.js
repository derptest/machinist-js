var Machinist = function() {
    var Blueprint = require("./blueprint");

    var
        _blueprints = {},
        _stores = {};

    var _blueprint = function (name, type, defaults, storeName) {
        if(!_blueprints[name]) {
            var store;
            if(!storeName || storeName === '') {
                store = _stores["default"];
                if(!store) throw Error("define a default data store to use for blueprints");
            } else {
                store = _stores[storeName];
                if(!store) throw Error("data store %s not found", storeName);
            }
            _blueprints[name] = new Blueprint(type, name, defaults, store);
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
