var
    should = require("should"),
    machinist = require("../lib"),
    store = require("../lib/store");

describe("Machinist API", function(){
    var derpBP;

    before(function(done){
        derpBP = machinist.blueprint("derp");
        return done();
    });

    it("should share blueprints across multiple machine instances", function(done){
        var b = require("../lib");
        b.should.be.exactly(machinist);

        return done();

    });

    it("should be able to create a blueprint", function(done){
        should.exist(derpBP);
        derpBP.name.should.equal("derp");
        return done();
    });

    it("should be able to return a created blueprint", function(done){
        var blueprint = machinist.blueprint("derp");
        blueprint.should.be.exactly(derpBP);
        return done();
    });

    it("should be able to register data stores", function(done){
        machinist.addStore("mongo", store);
        // machinist.stores.mongo.should.be.exactly(store);

        return done();
    });

    it.skip("if you register a data store without a name, name should revert to 'default'", function(done){
        machinist.addStore(store);
        // machinist.stores.default.should.be.exactly(store);
        return done();
    });

    it.skip("if a blueprint is created without a datastore name, it will use default", function(done){

    });
});