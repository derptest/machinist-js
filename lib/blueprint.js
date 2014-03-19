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
            // var obj = ObjectUtils.copyAllProperties(overrides, this.defaults);
            var obj = _.defaults(overrides, this.defaults);
            // console.log("final object: %j", obj);
            return store.make(this.type, obj);
        },
        defaults : this.defaults,
        store: this.store,
        name: this.name,
        type: this.type
    }

    return self;
};

module.exports = Blueprint;
