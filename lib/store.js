DataStore = function() {
    var _notImplemented =  function() {
        throw new Error("Not Implemented");
    };
    return {
        find : _notImplemented,
        findOne: _notImplemented,
        findOrMake: _notImplemented,
        make: _notImplemented
    };
    

}();

module.exports = DataStore;