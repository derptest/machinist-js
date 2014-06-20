var
    should = require("should"),
    machinist = require("../lib"),
    opts = {host: 'localhost:5984'},
    store = require("./utils/mock_store")(opts);

describe("Machinist API", function(){
    var derpBP;

    before(function(done){
        machinist.addStore(store);
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

    it("should be able to create a blueprint with defaults", function(done){
        var blueprint = machinist.blueprint(
            "derp2",
            "derps",
            {
                name:"Derp", 
                emails: [
                    "derp@derp.com",
                    "derpyderp@gmail.com"
                ]
            });
        blueprint.name.should.equal("derp2");
        should.exist(blueprint.defaults);
        blueprint.defaults.name.should.equal("Derp");
        blueprint.defaults.emails.length.should.equal(2);
        return done();
    });

    it("should be able to register data stores", function(done){
        machinist.addStore("mongo", store);
        machinist.stores.mongo.should.be.exactly(store);

        return done();
    });

    it("if you register a data store without a name, name should revert to 'default'", function(done){
        machinist.addStore(store);
        machinist.stores.default.should.be.exactly(store);
        return done();
    });

    it("should be able to create a blueprint with a different store", function(done){
        var blueprint = machinist.blueprint(
            "derpMongo",
            "derps", 
            {
                name:"Derp", 
                emails: [
                    "derp@derp.com",
                    "derpyderp@gmail.com"
                ]
            }, "mongo");
        blueprint.name.should.equal("derpMongo");
        blueprint.type.should.equal("derps");
        should.exist(blueprint.defaults);
        blueprint.defaults.name.should.equal("Derp");
        blueprint.defaults.emails.length.should.equal(2);
        should.exist(blueprint.store);
        blueprint.store.should.be.exactly(store);
        return done();
    });

    it.skip("if a blueprint is created without a datastore name, it will use default", function(done){

    });
});
