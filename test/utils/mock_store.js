var MockDataStore = function(opts) {
    var DataStore = require("../../lib/store");
    var _opts = opts;
    var self = DataStore(opts);

    self.find = function() {

    };

    self.findOne = function() {

    };

    self.findOrMake = function() {

    };

    self.make = function() {

    };

    return self;
};

module.exports = MockDataStore;
