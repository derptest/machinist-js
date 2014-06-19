var Blueprint = function (type, name, defaults, store){

    var
        _ = require("underscore"),
        name,
        store,
        type,
        defaults;

    this.type = type;
    this.defaults = defaults;
    this.store = store;
    this.name = name;

    var self = {
        make: function(overrides) {
            var obj = _.defaults(overrides, this.defaults);
            return store.make(this.type, obj);
        },
        find: function(query) {
            return store.find(this.type, query);
        },
        findOne: function(query) {
            return store.findOne(this.type, query);
        },
        findOrMake: function(overrides) {
            var obj = _.defaults(overrides, this.defaults);
            return store.findOrMake(this.type, obj);
        },
        defaults : this.defaults,
        store: this.store,
        name: this.name,
        type: this.type
    }

    return self;
};

module.exports = Blueprint;
