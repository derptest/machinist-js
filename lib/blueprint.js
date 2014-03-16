var Blueprint = function (type, name, defaults, store){

    var
        ObjectUtils = require("./utils/objects"),
        name,
        store,
        type,
        defaults;

    this.type = type;
    this.defaults = defaults;
    this.store = store;
    this.name = name;

    var self = {
        make: function(overrides, callback) {
            var obj = ObjectUtils.copyAllProperties(overrides, this.defaults);
            store.make(this.type, obj, callback);
        },
        defaults : this.defaults,
        store: this.store,
        name: this.name,
        type: this.type
    }

    return self;
};

module.exports = Blueprint;
