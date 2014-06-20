var Blueprint = function (type, name, defaults, store){

    var
        _ = require("underscore"),
        name,
        store,
        type,
        defaults,
        serialNumber = 0;

    this.type = type;
    this.defaults = defaults;
    this.store = store;
    this.name = name;

    var _detectSNFieldInObjectAndReplace = function(object, sn) {
        //This will detect the sn token on any field in an object and replace it
        var keys = _.keys(object);
        if(keys.length > 0) {
            for(var i in keys) {
                var val = object[keys[i]];
                if(_.isObject(val)) {
                    object[keys[i]] = _detectSNFieldInObjectAndReplace(val, sn);
                } else if(_.isString(val)) {
                    object[keys[i]] = _replaceSNField(val, sn);
                }
            }
        }
        return object;
    };

    var _replaceSNField = function(replace, serialNumber) {
        var result = replace.replace(/\{\{(.*?)\}\}/g, function(match, token) {
            if(token == "sn") {
                return serialNumber;
            } else {
                return "{{" + token + "}}";
            }
        });
        return result;
    };

    var _newSerialNumber = function() {
        serialNumber += 1;
        return serialNumber;
    };

    var self = {
        make: function(overrides) {
            var obj = _.defaults(overrides, this.defaults);
            obj = _detectSNFieldInObjectAndReplace(obj, _newSerialNumber());
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
        _newSerialNumber: _newSerialNumber,
        _replaceSNField: _replaceSNField,
        _detectSNFieldInObjectAndReplace: _detectSNFieldInObjectAndReplace,
        defaults : this.defaults,
        store: this.store,
        name: this.name,
        type: this.type
    }

    return self;
};

module.exports = Blueprint;
