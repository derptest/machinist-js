var
    should = require("should"),
    machinist = require("../lib"),
    opts = {host: 'localhost:5984'},
    store = require("./utils/mock_store")(opts);

describe("Blueprints API", function(){
    before(function(done){
        machinist.addStore(store);
        derpBP = machinist.blueprint("derp");
        return done();
    });

    it("should return a new serial number", function(done){
        var sn = derpBP._newSerialNumber();
        should.exist(sn);
        sn.should.equal(1);

        var sn2 = derpBP._newSerialNumber();
        should.exist(sn2);
        sn2.should.equal(2);
        return done();
    });

    it("should return a new serial number for a different blueprint", function(done){
        var sn = derpBP._newSerialNumber();
        should.exist(sn);
        //this is three because it's the same object as above and has kept the serial number count
        sn.should.equal(3);

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
        var sn2 = blueprint._newSerialNumber();
        should.exist(sn2);
        sn2.should.equal(1);
        return done();
    });

    it("should replace the {{sn}} token with a serial number", function(done){
        var blueprint = machinist.blueprint("derp3");

        var newString = blueprint._replaceSNField("derp{{sn}}@derp.com", blueprint._newSerialNumber());
        should.exist(newString);
        newString.should.equal("derp1@derp.com");
        return done();
    });

    it("should not replace the {{token}} token with a serial number", function(done){
        var blueprint = machinist.blueprint("derp3");

        var newString = blueprint._replaceSNField("derp{{token}}@derp.com", blueprint._newSerialNumber());
        should.exist(newString);
        newString.should.equal("derp{{token}}@derp.com");
        return done();
    });

    it("should replace all {{sn}} tokens with a serial number", function(done){
        var blueprint = machinist.blueprint("derp4");

        var obj = {
            name:"Derp {{sn}}",
            phone: "520-555-5555",
            emails: [
                "derp{{sn}}@derp.com",
                "derpyderp{{sn}}@gmail.com"
            ]
        };

        var newObj = blueprint._detectSNFieldInObjectAndReplace(obj, blueprint._newSerialNumber());
        should.exist(newObj);
        newObj.name.should.equal("Derp 1");
        newObj.emails[0].should.equal("derp1@derp.com");
        newObj.emails[1].should.equal("derpyderp1@gmail.com");
        newObj.phone.should.equal(obj.phone);
        return done();
    });
});
