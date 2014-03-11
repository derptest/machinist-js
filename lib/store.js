var DataStore = function(opts) {
    var _opts = opts;

    var _getOpts = function() {
        return _opts;
    };
    var _notImplemented =  function() {
        throw new Error("Not Implemented");
    };

    var self = {
        find : _notImplemented,
        findOne: _notImplemented,
        findOrMake: _notImplemented,
        make: _notImplemented,
        opts: _opts
    };
    return self;
};

module.exports = DataStore;
